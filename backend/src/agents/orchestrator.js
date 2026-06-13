const { GoogleGenerativeAI } = require('@google/generative-ai');

class AgentOrchestrator {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-3.5-flash"});
    this.conversationHistory = [];
    this.selectedProducts = new Map();
    this.maxReasoningSteps = 5;
  }

  /**
   * Main agent orchestration logic
   * Handles multi-step reasoning and tool selection
   */
  async processUserQuery(userMessage, context = {}) {
    try {
      // Add to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      });

      // Step 1: Validate query is shopping-related
      const isShoppingRelated = await this.validateShoppingQuery(userMessage);
      if (!isShoppingRelated) {
        return {
          message: 'I am a shopping assistant and can only help with products, reviews, comparisons, and orders.',
          isValid: false,
          type: 'out-of-scope'
        };
      }

      // Step 2: Intent Detection
      const intent = await this.detectIntent(userMessage);
      console.log(`Detected Intent: ${intent.type}`);

      // Step 3: Execute reasoning loop
      let response;
      let step = 0;

      while (step < this.maxReasoningSteps) {
        step++;
        console.log(`\n=== Reasoning Step ${step} ===`);

        // Analyze current state and decide next action
        const decision = await this.reasonAboutNextAction(
          userMessage,
          intent,
          context,
          step
        );

        console.log(`Decision: ${decision.action}`);

        if (decision.action === 'TOOL_CALL') {
          // Execute tool
          const toolResult = await this.executeTool(decision.tool, decision.params);
          context.lastToolResult = toolResult;

          // Update context for next iteration
          context.lastToolUsed = decision.tool;

          // Check if we need more information
          if (!this.hasEnoughInformation(toolResult, decision.tool)) {
            // Ask follow-up question
            const followUpQuestion = await this.generateFollowUpQuestion(
              toolResult,
              intent,
              userMessage
            );
            return {
              message: followUpQuestion,
              type: 'follow-up-question',
              requiresUserInput: true,
              context: context
            };
          }
        } else if (decision.action === 'FINAL_RESPONSE') {
          // Generate final response
          response = await this.generateFinalResponse(
            userMessage,
            intent,
            context
          );
          break;
        } else if (decision.action === 'CLARIFICATION_NEEDED') {
          // Ask for clarification
          const clarificationQuestion = decision.question || 
            'Could you please provide more details to help me better assist you?';
          return {
            message: clarificationQuestion,
            type: 'clarification-needed',
            requiresUserInput: true,
            context: context
          };
        }
      }

      // Add response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      });

      return response;
    } catch (error) {
      console.error('Agent Error:', error);
      return {
        message: 'An error occurred while processing your request. Please try again.',
        type: 'error',
        error: error.message
      };
    }
  }

  /**
   * Validate that query is shopping-related
   */
  async validateShoppingQuery(userMessage) {
    const prompt = `You are a shopping domain validator. Determine if this message is related to shopping/e-commerce.
    
User message: "${userMessage}"

Respond with only "true" or "false". Do not include any explanation.`;

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text().toLowerCase().trim();
      return text.includes('true');
    } catch (error) {
      console.error('Validation error:', error);
      return true; // Default to true for safer operation
    }
  }

  /**
   * Detect user intent
   */
  async detectIntent(userMessage) {
    const prompt = `You are an intent detector for a shopping assistant. Analyze the user message and determine the intent.

User message: "${userMessage}"

Classify the intent as one of these types:
- SEARCH (searching for products with filters)
- GET_DETAILS (requesting specific product details)
- COMPARE (comparing products)
- REVIEW_CHECK (asking about reviews)
- ORDER (making a purchase)
- IMAGE_SEARCH (uploading image to find similar products)
- REFINE_SEARCH (refining previous search results)
- QUANTITY_CONFIRMATION (confirming quantity for order)
- OTHER

Respond in JSON format:
{
  "type": "INTENT_TYPE",
  "confidence": 0.0-1.0,
  "keywords": ["keyword1", "keyword2"],
  "filters": {}
}`;

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { type: 'OTHER', confidence: 0.5, keywords: [], filters: {} };
    } catch (error) {
      console.error('Intent detection error:', error);
      return { type: 'OTHER', confidence: 0.5, keywords: [], filters: {} };
    }
  }

  /**
   * Multi-step reasoning engine
   * Decides what action to take based on current state
   */
  async reasonAboutNextAction(userMessage, intent, context, step) {
    const tools = this.getAvailableTools();
    const systemPrompt = this._buildReasoningPrompt(
      userMessage,
      intent,
      context,
      tools,
      step
    );

    try {
      const result = await this.model.generateContent(systemPrompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const decision = JSON.parse(jsonMatch[0]);
        return decision;
      }

      return {
        action: 'FINAL_RESPONSE',
        reasoning: 'Prepared response'
      };
    } catch (error) {
      console.error('Reasoning error:', error);
      return {
        action: 'FINAL_RESPONSE',
        reasoning: 'Using fallback response'
      };
    }
  }

  /**
   * Build reasoning prompt for the LLM
   */
  _buildReasoningPrompt(userMessage, intent, context, tools, step) {
    let prompt = `You are a shopping assistant with reasoning capabilities. You have access to tools and must decide the best next action.

Current Step: ${step}
User Message: "${userMessage}"
Detected Intent: ${intent.type}
Confidence: ${intent.confidence}

Available Tools:
${tools.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Conversation Context:
- Total messages exchanged: ${this.conversationHistory.length}
- Last tool used: ${context.lastToolUsed || 'None'}
- Previous results: ${context.lastToolResult ? JSON.stringify(context.lastToolResult).substring(0, 200) : 'No previous results'}

Decision Rules:
1. If you need to search for products → Use SEARCH_PRODUCTS tool
2. If user selected a product number → Use GET_PRODUCT_DETAILS tool
3. If checking inventory → Use CHECK_INVENTORY tool
4. If asking for reviews → Use ANALYZE_REVIEWS tool
5. If ready to create order → Use CREATE_ORDER tool
6. If you need more information from user → Action: CLARIFICATION_NEEDED
7. If you have enough info to answer → Action: FINAL_RESPONSE

Respond in JSON format:
{
  "action": "TOOL_CALL" | "FINAL_RESPONSE" | "CLARIFICATION_NEEDED",
  "tool": "TOOL_NAME" (if TOOL_CALL),
  "params": {} (if TOOL_CALL),
  "question": "question text" (if CLARIFICATION_NEEDED),
  "reasoning": "explain your reasoning"
}`;

    // Add context about selected products if available
    if (this.selectedProducts.size > 0) {
      prompt += `\n\nPreviously shown products:\n`;
      this.selectedProducts.forEach((product, index) => {
        prompt += `${index + 1}. ${product.name} - ₹${product.price}\n`;
      });
    }

    return prompt;
  }

  /**
   * Get available tools
   */
  getAvailableTools() {
    return [
      {
        name: 'SEARCH_PRODUCTS',
        description: 'Search products with filters (brand, price range, category, rating)'
      },
      {
        name: 'GET_PRODUCT_DETAILS',
        description: 'Get complete details of a specific product (specs, warranty, features)'
      },
      {
        name: 'ANALYZE_REVIEWS',
        description: 'Analyze and summarize product reviews with sentiment analysis'
      },
      {
        name: 'CHECK_INVENTORY',
        description: 'Check product availability and stock status'
      },
      {
        name: 'CREATE_ORDER',
        description: 'Create an order with product, quantity, and delivery details'
      },
      {
        name: 'ANALYZE_IMAGE',
        description: 'Analyze uploaded image to find similar products or identify category'
      }
    ];
  }

  /**
   * Execute tool calls
   */
  async executeTool(toolName, params = {}) {
    console.log(`Executing tool: ${toolName}`, params);

    // Import and execute the appropriate tool
    const toolsModule = require('../tools');
    
    switch (toolName) {
      case 'SEARCH_PRODUCTS':
        return await toolsModule.searchProducts(params);
      case 'GET_PRODUCT_DETAILS':
        return await toolsModule.getProductDetails(params);
      case 'ANALYZE_REVIEWS':
        return await toolsModule.analyzeReviews(params);
      case 'CHECK_INVENTORY':
        return await toolsModule.checkInventory(params);
      case 'CREATE_ORDER':
        return await toolsModule.createOrder(params);
      case 'ANALYZE_IMAGE':
        return await toolsModule.analyzeImage(params);
      default:
        return { error: 'Unknown tool' };
    }
  }

  /**
   * Check if we have enough information from tool results
   */
  hasEnoughInformation(toolResult, toolName) {
    if (!toolResult) return false;

    // For search results, we need at least one result
    if (toolName === 'SEARCH_PRODUCTS') {
      return toolResult.products && toolResult.products.length > 0;
    }

    // For other tools, as long as we have a result, it's enough
    return !toolResult.error;
  }

  /**
   * Generate follow-up question based on tool results
   */
  async generateFollowUpQuestion(toolResult, intent, userMessage) {
    const prompt = `Based on the tool result, generate a natural follow-up question:

Tool Result: ${JSON.stringify(toolResult).substring(0, 500)}
User's original request: "${userMessage}"

Generate a clarifying follow-up question to help narrow down the search or get more details.`;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      return 'Could you provide more details to help me better assist you?';
    }
  }

  /**
   * Generate final response
   */
  async generateFinalResponse(userMessage, intent, context) {
    const prompt = `You are a shopping assistant. Generate a helpful response based on the context:

User Message: "${userMessage}"
Intent: ${intent.type}
Last Tool Result: ${context.lastToolResult ? JSON.stringify(context.lastToolResult).substring(0, 500) : 'No tool result'}
Selected Products: ${Array.from(this.selectedProducts.values()).map(p => `${p.name} (₹${p.price})`).join(', ') || 'None'}
Generate a natural, helpful response. Format product recommendations as a numbered list.`;

    try {
      const result = await this.model.generateContent(prompt);
      const message = result.response.text();
      
      return {
        message: message,
        type: 'response',
        productRecommendations: context.lastToolResult?.products || null,
        context: context
      };
    } catch (error) {
      return {
        message: 'I found some information for you. Please provide more details if needed.',
        type: 'response',
        error: error.message
      };
    }
  }
}

module.exports = new AgentOrchestrator();

# Architecture Deep Dive

## System Overview

This is a production-ready **Agentic AI system** focused on teaching proper AI agent patterns.

## 1. Core Components

### Agent Orchestrator (`backend/src/agents/orchestrator.js`)

The heart of the system. It implements:

```javascript
Main Flow:
  1. Input Validation
     ↓ (Check if shopping-related)
  2. Intent Detection
     ↓ (What does user want?)
  3. Reasoning Loop
     ↓ (Multi-step decision making)
  4. Tool Execution
     ↓ (Call appropriate tool)
  5. Result Analysis
     ↓ (Is more info needed?)
  6. Response Generation
     ↓ (Answer user)
```

### Key Methods in Orchestrator

**`processUserQuery(userMessage, context)`**
- Main entry point
- Validates domain
- Orchestrates reasoning
- Returns response

**`detectIntent(userMessage)`**
- Uses Gemini to classify user intent
- Extracts keywords and filters
- Returns intent type with confidence

**`reasonAboutNextAction(userMessage, intent, context, step)`**
- Implements the reasoning loop
- Decides: Tool call? Clarification? Final response?
- Uses Gemini's reasoning capabilities

**`executeTool(toolName, params)`**
- Dispatches to tool implementations
- Handles tool-specific logic
- Returns structured results

### Tools (`backend/src/tools/index.js`)

Six tools implement shopping functionality:

| Tool | Purpose | Parameters |
|------|---------|-----------|
| SEARCH_PRODUCTS | Find products with filters | brand, category, minPrice, maxPrice, minRating |
| GET_PRODUCT_DETAILS | Get full product info | productId |
| ANALYZE_REVIEWS | Sentiment analysis of reviews | productId |
| CHECK_INVENTORY | Check stock status | productId |
| CREATE_ORDER | Place an order | productId, quantity |
| ANALYZE_IMAGE | Find similar products from image | imageData |

## 2. Multi-Step Reasoning in Detail

### Example: Purchase Request

**User:** "I want to buy the second product"

**Agent Processing:**

```
Step 1: Validate
├─ Is this shopping-related? YES ✓
└─ Proceed

Step 2: Intent Detection
├─ Intent Type: ORDER
├─ Confidence: 0.95
└─ Keywords: [buy, second, product]

Step 3: Reasoning Loop - Iteration 1
├─ Analyze: User mentioned "second" but no products selected yet
├─ Decision: Need to ask for clarification
├─ Action: CLARIFICATION_NEEDED
└─ Question: "Which product would you like? (1-5)"
└─ Return and wait for user

Step 3: Reasoning Loop - Iteration 2 (After user selects)
├─ Analyze: User selected product #2
├─ Check: Is it in stock?
├─ Action: TOOL_CALL → CHECK_INVENTORY
├─ Execute: Check inventory for product #2
├─ Result: In stock, quantity available
├─ Decision: Ask for quantity
├─ Action: CLARIFICATION_NEEDED
└─ Question: "How many units would you like?"

Step 3: Reasoning Loop - Iteration 3
├─ Analyze: User wants 1 unit
├─ Decision: Ready to order
├─ Action: TOOL_CALL → CREATE_ORDER
├─ Execute: Create order with product #2, qty 1
├─ Result: Order ID ORD-123456
├─ Decision: Have all info, can respond
└─ Action: FINAL_RESPONSE

Step 4: Response Generation
├─ Generate confirmation message
├─ Return order details
└─ Show to user
```

## 3. Intent Detection Strategy

The system recognizes 8 intent types:

```javascript
{
  SEARCH: "User wants to search for products",
  GET_DETAILS: "User wants details about a product",
  COMPARE: "User wants to compare products",
  REVIEW_CHECK: "User wants to read reviews",
  ORDER: "User wants to purchase",
  IMAGE_SEARCH: "User uploads image",
  REFINE_SEARCH: "User refines previous search",
  QUANTITY_CONFIRMATION: "User specifies quantity"
}
```

Each intent has a different reasoning path:

```javascript
if (intent.type === 'SEARCH') {
  → Extract filters
  → Call SEARCH_PRODUCTS
  → Return results
}

if (intent.type === 'ORDER') {
  → Verify product
  → Check inventory
  → Ask quantity if needed
  → Create order
}

// ... etc
```

## 4. Context Retention Mechanism

The agent maintains a context object:

```javascript
context = {
  lastToolUsed: 'SEARCH_PRODUCTS',
  lastToolResult: { products: [...], count: 5 },
  selectedProducts: Map<id, product>,
  previousIntents: ['SEARCH', 'GET_DETAILS'],
  conversationHistory: [...],
  orderInProgress: { productId: 2, quantity: 1 }
}
```

This allows:
- References: "the second one" → Looks up in context
- Refinements: "only Samsung" → Uses previous results
- Follow-ups: Product selection after showing results
- State tracking: Order creation with multiple steps

## 5. Tool Calling Pattern

```javascript
Decision Point in Reasoning:
├─ If need to search → SEARCH_PRODUCTS
├─ If need details → GET_PRODUCT_DETAILS
├─ If need reviews → ANALYZE_REVIEWS
├─ If need inventory → CHECK_INVENTORY
├─ If need to order → CREATE_ORDER
└─ If have enough info → FINAL_RESPONSE

Tool Execution Flow:
├─ Extract parameters
├─ Validate parameters
├─ Execute tool logic
├─ Analyze results
├─ Decide next step
└─ Return to reasoning loop
```

## 6. Follow-Up Question Generation

When the agent needs more information:

```javascript
Scenarios:
├─ Search returned no results
│  └─ Ask to broaden filters
│
├─ Product found but user didn't select
│  └─ Ask which one interested in
│
├─ Ready to order but quantity unclear
│  └─ Ask how many units
│
└─ User query ambiguous
   └─ Ask for clarification
```

## 7. Domain Validation Layer

First thing the agent checks:

```javascript
validateShoppingQuery(userMessage)
├─ Uses Gemini to determine if shopping-related
├─ If YES → Proceed with agent logic
└─ If NO → Return out-of-scope message

Examples:
├─ ✅ "Show me phones" → Shopping-related
├─ ✅ "How much is this TV?" → Shopping-related
├─ ❌ "Write Java code" → Not shopping-related
└─ ❌ "What's the weather?" → Not shopping-related
```

## 8. Frontend-Backend Communication

### Request Flow

```
User Types: "Show me TVs"
    ↓
Angular Component
    ↓ (sendMessage)
HTTP POST /api/chat/message
    {"message": "Show me TVs", "context": {}}
    ↓
Express Server
    ↓ (Route to orchestrator)
Agent Orchestrator
    ├─ Validate query
    ├─ Detect intent
    ├─ Reasoning loop
    └─ Generate response
    ↓
HTTP Response
    {
      "message": "Here are TVs...",
      "productRecommendations": [...],
      "type": "response",
      "context": {...}
    }
    ↓
Angular Component
    ├─ Display message
    ├─ Show products
    └─ Update context
```

### Image Upload Flow

```
User Clicks: Upload Image
    ↓
File Selected
    ↓
Angular Component
    ↓ (uploadImage)
HTTP POST /api/chat/image
    FormData: { image: file, message: "..." }
    ↓
Express Server
    ├─ Parse multipart
    └─ Extract image buffer
    ↓
Agent Orchestrator
    ├─ Call ANALYZE_IMAGE tool
    ├─ Find similar products
    └─ Generate response
    ↓
HTTP Response with similar products
    ↓
Display to user
```

## 9. Error Handling Strategy

```javascript
Try Blocks:
├─ Intent detection fails
│  └─ Default to OTHER intent
│
├─ Tool execution fails
│  └─ Return error message
│
├─ Gemini API error
│  └─ Fallback response
│
└─ Network error
   └─ Inform user to retry

All errors logged to console for debugging
```

## 10. Scalability Considerations

**Current (In-Memory):**
- Mock database in tools/index.js
- Conversation history in memory
- Single server instance

**For Production:**
```javascript
├─ Replace mock DB with:
│  ├─ MongoDB for products
│  ├─ PostgreSQL for orders
│  └─ Redis for caching
│
├─ Implement:
│  ├─ Database models
│  ├─ Query optimizations
│  ├─ Caching strategy
│  └─ Load balancing
│
└─ Add:
   ├─ Authentication
   ├─ Rate limiting
   ├─ Logging
   └─ Monitoring
```

## 11. Testing Strategy

### Unit Tests
- Intent detection accuracy
- Tool parameter extraction
- Response generation

### Integration Tests
- End-to-end flows
- Tool chaining
- Context preservation

### Scenario Tests
- Simple searches
- Multi-step orders
- Image uploads
- Out-of-scope queries

### Example Test Flow
```
Input: "I want to buy the second product"
Expected Flow:
  1. Detect ORDER intent ✓
  2. Identify product ✓
  3. Check inventory ✓
  4. Ask quantity ✓
  5. Create order ✓
  6. Return confirmation ✓
```

## 12. Extending the System

### Adding New Tool

```javascript
// 1. Add to orchestrator.getAvailableTools()
{
  name: 'NEW_TOOL',
  description: 'What it does'
}

// 2. Implement in tools/index.js
async function newTool(params) {
  // Implementation
}

// 3. Add to executeTool() switch
case 'NEW_TOOL':
  return await toolsModule.newTool(params);

// 4. Update reasoning to select it
if (needs_new_tool) {
  → Use NEW_TOOL
}
```

### Adding New Intent

```javascript
// 1. Update detectIntent() to recognize it
NEW_INTENT: "User wants to do X"

// 2. Handle in reasoning loop
if (intent.type === 'NEW_INTENT') {
  // Custom reasoning path
}

// 3. Add appropriate tools
// 4. Test with examples
```

---

This architecture enables building sophisticated AI agents that reason like humans! 🧠

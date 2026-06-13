# 🛍️ Agentic AI Shopping Assistant

A comprehensive **multi-step reasoning AI agent** for shopping assistance built with Node.js/Express backend and Angular frontend. The primary focus is on **proper agentic AI patterns** rather than UI design.

## 🎯 Project Objective

Learn and implement proper **Agentic AI concepts**:
- ✅ Intent detection
- ✅ Multi-step reasoning
- ✅ Tool selection and execution
- ✅ Context retention
- ✅ Follow-up questioning
- ✅ Out-of-scope protection
- ✅ Complex reasoning chains

## 🏗️ Architecture

### Agent Workflow

```
User Query
    ↓
Validation (Shopping Domain Check)
    ↓
Intent Detection (Gemini LLM)
    ↓
Reasoning Loop (Multi-Step Decision Making)
    ├─ Analyze current context
    ├─ Decide next action
    ├─ Tool Selection
    ├─ Tool Execution
    └─ Result Analysis
    ↓
Response Generation
    ↓
User
```

### Project Structure

```
Basic AI agent model/
├── backend/                      # Node.js/Express Server
│   ├── src/
│   │   ├── agents/
│   │   │   └── orchestrator.js   # Main agent logic
│   │   ├── tools/
│   │   │   └── index.js          # Tool implementations
│   │   ├── routes/
│   │   │   └── chatRoutes.js     # API endpoints
│   │   └── server.js             # Express app
│   ├── package.json
│   └── .env.example
│
└── frontend/                     # Angular SPA
    ├── src/
    │   ├── app/
    │   │   ├── services/
    │   │   │   └── chat.service.ts
    │   │   ├── app.component.ts
    │   │   ├── app.component.html
    │   │   ├── app.component.css
    │   │   └── app.module.ts
    │   ├── main.ts
    │   ├── index.html
    │   └── styles.css
    ├── package.json
    └── angular.json
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- Google Gemini API Key

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd "b:/Basic AI agent model/backend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   copy .env.example .env
   ```

4. **Add your Gemini API Key:**
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

   Get your API key from: https://makersuite.google.com/app/apikey

5. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd "b:/Basic AI agent model/frontend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:4200`

## 🧠 Agent Architecture Details

### 1. **Intent Detection**

The agent detects user intent from messages:

- `SEARCH` - Searching for products with filters
- `GET_DETAILS` - Requesting specific product details
- `COMPARE` - Comparing products
- `REVIEW_CHECK` - Asking about reviews
- `ORDER` - Making a purchase
- `IMAGE_SEARCH` - Uploading image to find similar products
- `REFINE_SEARCH` - Refining previous search results
- `QUANTITY_CONFIRMATION` - Confirming quantity for order

### 2. **Multi-Step Reasoning**

The orchestrator engine implements sophisticated reasoning:

```javascript
Step 1: Validate query is shopping-related
Step 2: Detect intent using LLM
Step 3: Execute reasoning loop (up to 5 steps):
  - Analyze current state
  - Decide next action
  - Execute tool if needed
  - Check if more info needed
  - Ask follow-up questions if needed
Step 4: Generate final response
```

### 3. **Available Tools**

#### **SEARCH_PRODUCTS**
- Search products with filters
- Parameters: `brand`, `category`, `minPrice`, `maxPrice`, `minRating`
- Example: `Show TVs above ₹50,000 with rating above 4.7`

#### **GET_PRODUCT_DETAILS**
- Retrieve complete product information
- Parameters: `productId`
- Returns: Specs, features, warranty, availability

#### **ANALYZE_REVIEWS**
- Analyze product reviews and sentiment
- Parameters: `productId`
- Returns: Review summary, pros, cons, overall sentiment

#### **CHECK_INVENTORY**
- Check stock availability
- Parameters: `productId`
- Returns: Stock status, quantity, delivery estimate

#### **CREATE_ORDER**
- Create orders
- Parameters: `productId`, `quantity`
- Returns: Order confirmation with ID and tracking info

#### **ANALYZE_IMAGE**
- Analyze uploaded images
- Parameters: `imageData`
- Returns: Similar products, category detection

### 4. **Context Retention**

The agent maintains:
- Conversation history
- Selected products
- Previous tool results
- User preferences
- Current reasoning state

## 📚 Usage Examples

### Example 1: Simple Search
```
User: "Show me Samsung phones below ₹30,000"

Agent:
  Step 1: Detect intent = SEARCH
  Step 2: Extract filters: brand=Samsung, category=Phones, maxPrice=30000
  Step 3: Call SEARCH_PRODUCTS tool
  Step 4: Return matching products
```

### Example 2: Multi-Step Reasoning
```
User: "I want Samsung only"
(Referring to previous results)

Agent:
  Step 1: Detect intent = REFINE_SEARCH
  Step 2: Check context for previous results
  Step 3: Apply additional filter (brand=Samsung)
  Step 4: Call SEARCH_PRODUCTS with refined filters
  Step 5: Return refined list
```

### Example 3: Order with Follow-up
```
User: "I want to buy the second one"

Agent:
  Step 1: Identify selected product
  Step 2: Check inventory
  Step 3: Ask "How many units would you like?"
  (User: "1")
  Step 4: Create order
  Step 5: Return order confirmation
```

### Example 4: Out-of-Scope Protection
```
User: "Who is the Prime Minister of India?"

Agent Response:
"I am a shopping assistant and can only help with products, 
reviews, comparisons, and orders."
```

## 📡 API Endpoints

### Chat
- `POST /api/chat/message` - Send message to agent
- `POST /api/chat/image` - Upload image for analysis
- `GET /api/chat/history` - Get conversation history
- `POST /api/chat/reset` - Reset conversation

### Example Request
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me TVs above 50000",
    "context": {}
  }'
```

## 🎨 UI Components

The Angular frontend includes:

- **Chat Window** - Displays conversation history
- **User Input Box** - TextArea for user messages
- **Send Button** - Submit messages
- **Image Upload** - Upload images for analysis
- **Product Cards** - Display recommendations with:
  - Product name and brand
  - Price and rating
  - Stock status
  - Click to select and purchase
- **Order Confirmation** - Popup showing order details

## 🚀 Key Features

✅ **Proper Agentic Pattern**
- Not a simple chatbot
- Implements reasoning loop
- Uses real tool calling
- Context-aware decisions

✅ **Multi-Step Reasoning**
- Analyzes user intent
- Decides what tool to use
- Executes tools
- Analyzes results
- Asks follow-up questions when needed

✅ **Tool Integration**
- 6 different tools for different tasks
- Proper parameter extraction
- Result analysis
- Decision making based on results

✅ **Context Retention**
- Remembers previous products
- Maintains conversation history
- Carries context between turns
- Handles references (e.g., "the second one")

✅ **Out-of-Scope Protection**
- Validates shopping domain
- Rejects unrelated queries
- Professional responses

✅ **Image Understanding**
- Uploads and analyzes images
- Finds similar products
- Identifies categories

## 🧪 Testing Multi-Step Reasoning

Try these prompts to see the agent in action:

1. **Simple Search:**
   - "Show me phones below ₹30,000"

2. **Refined Search:**
   - First: "Show me TVs"
   - Then: "Only Samsung"

3. **Product Details:**
   - "Tell me more about the first product"

4. **Reviews:**
   - "What do people say about this?"

5. **Purchase Flow:**
   - "I want to buy the second one"
   - "1 unit"

6. **Image Search:**
   - Upload a phone/TV image

7. **Out of Scope:**
   - "Write Java code"
   - "Who is the PM?"

## 📊 Evaluation Criteria

Success of this project is measured by:

- ✅ Correct tool selection
- ✅ Multi-step reasoning
- ✅ Follow-up questioning
- ✅ Context retention
- ✅ Image understanding
- ✅ Order execution
- ✅ Restricting answers to shopping domain

Note: UI appearance is **NOT** part of evaluation.

## 🔑 Gemini API Configuration

The agent uses Google's Gemini API for:
- Intent detection
- Multi-step reasoning
- Follow-up question generation
- Response generation
- Image analysis (via vision model)

**Important:** Replace `your_gemini_api_key_here` in `.env` with your actual API key.

## 🛠️ Development Notes

### Backend Flow
1. Express server receives message
2. Routes to `/api/chat/message`
3. Orchestrator validates domain
4. Detects intent using Gemini
5. Enters reasoning loop
6. Executes tools as needed
7. Generates response
8. Returns to frontend

### Frontend Flow
1. User types message and clicks Send
2. Service sends HTTP POST to backend
3. Shows loading indicator
4. Displays agent response
5. Shows product recommendations if available
6. Maintains conversation history
7. Supports image uploads

## 📝 Notes

- The mock database is in-memory. For production, integrate with real database.
- Tool results are mocked for demonstration. Replace with real API calls.
- Image analysis is simulated. For production, use actual vision APIs.
- The agent uses Gemini's reasoning capabilities for decision-making.

## 🤝 Contributing

This is an educational project. Feel free to extend with:
- More sophisticated reasoning patterns
- Additional tools
- Real database integration
- Payment gateway integration
- Order tracking
- User profiles and wishlists

## 📖 References

- [Google Gemini API](https://ai.google.dev/)
- [Agent Reasoning Patterns](https://ai.google.dev/docs/agents)
- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/)

---

**Happy Learning! 🎓**

This project focuses on proper agentic AI implementation rather than UI polish. The goal is to understand how AI agents think, reason, and make decisions!

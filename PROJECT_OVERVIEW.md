# Project Overview

## What is this project?

**Agentic AI Shopping Assistant** - An educational project demonstrating proper AI agent architecture with multi-step reasoning, tool calling, and context retention.

## 🎯 Primary Goal

Learn and implement **agentic AI patterns**, not to build production e-commerce.

## 📦 What's Included

### Backend (Node.js + Express)
- ✅ Agent Orchestrator with multi-step reasoning
- ✅ 6 Different tools (search, details, reviews, inventory, order, image)
- ✅ Gemini LLM integration
- ✅ Mock database with products
- ✅ REST API with chat endpoints
- ✅ Image upload support

### Frontend (Angular)
- ✅ Simple chat interface
- ✅ Product recommendation cards
- ✅ Image upload button
- ✅ Order confirmation popup
- ✅ Minimal UI (focus on agent logic)

## 🚀 Key Features

1. **Intelligent Intent Detection**
   - Determines what user wants (search, buy, compare, etc.)
   - Extracts filters and parameters

2. **Multi-Step Reasoning**
   - Doesn't just answer directly
   - Reasons through what steps are needed
   - Asks follow-up questions when needed
   - Continues until goal is achieved

3. **Tool Calling System**
   - Selects appropriate tools dynamically
   - Executes tools with extracted parameters
   - Analyzes results
   - Decides what to do next

4. **Context Retention**
   - Remembers previous products shown
   - Handles references like "the second one"
   - Maintains conversation history
   - Carries state between turns

5. **Out-of-Scope Protection**
   - Validates all queries are shopping-related
   - Rejects non-shopping questions
   - Professional error messages

6. **Image Understanding**
   - Accepts image uploads
   - Analyzes to find similar products
   - Recommends based on image content

## 📊 Agent Reasoning Example

**User:** "I want Samsung phones under 30,000"

**Agent's Thinking:**
```
Step 1: Validate
  Is this shopping-related? YES ✓

Step 2: Detect Intent
  Intent: SEARCH
  Filters: brand=Samsung, category=Phones, maxPrice=30000

Step 3: Execute Tool
  Tool: SEARCH_PRODUCTS
  Parameters: brand="Samsung", maxPrice=30000

Step 4: Analyze Results
  Found 2 products matching
  Have enough info? YES

Step 5: Generate Response
  Show products with details

Step 6: Return to User
  Here are Samsung phones under ₹30,000...
```

## 📁 File Structure

```
b:/Basic AI agent model/
│
├─ README.md                 ← Start here!
├─ QUICKSTART.md            ← 5-minute setup
├─ ARCHITECTURE.md          ← Deep dive
├─ TEST_QUERIES.md          ← Test examples
├─ CONFIG.md                ← Configuration
├─ PROJECT_OVERVIEW.md      ← This file
├─ setup.bat                ← Windows installer
├─ setup.sh                 ← Mac/Linux installer
│
├─ backend/
│  ├─ src/
│  │  ├─ agents/orchestrator.js      (Agent logic)
│  │  ├─ tools/index.js              (All tools)
│  │  ├─ routes/chatRoutes.js        (API routes)
│  │  └─ server.js                   (Express app)
│  ├─ package.json
│  └─ .env.example
│
└─ frontend/
   ├─ src/
   │  ├─ app/
   │  │  ├─ services/chat.service.ts
   │  │  ├─ app.component.ts         (Main logic)
   │  │  ├─ app.component.html       (UI)
   │  │  ├─ app.component.css        (Styles)
   │  │  └─ app.module.ts
   │  ├─ main.ts
   │  └─ index.html
   ├─ package.json
   └─ angular.json
```

## 🎓 What You'll Learn

1. **Agent Architecture**
   - Orchestration patterns
   - Multi-step reasoning loops
   - Tool calling design

2. **Intent Recognition**
   - Parsing user intent
   - Extracting parameters
   - Handling ambiguity

3. **Tool Design**
   - Defining tools
   - Executing tools
   - Handling results

4. **Context Management**
   - Maintaining state
   - Handling references
   - Preserving history

5. **LLM Integration**
   - Using Gemini API
   - Prompt engineering
   - Reasoning with AI

6. **Full Stack Development**
   - Backend with Node.js
   - Frontend with Angular
   - API design
   - Component architecture

## ⚡ Quick Start

### 1. Get API Key
Visit: https://makersuite.google.com/app/apikey

### 2. Setup Backend
```bash
cd backend
npm install
echo "GEMINI_API_KEY=your_key_here" > .env
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Open Browser
http://localhost:4200

### 5. Try These Queries
- "Show me TVs above 50,000"
- "Only Samsung"
- "What's the warranty?"
- "I want to buy the first one"

## 🔧 Technologies

| Layer | Technology |
|-------|-----------|
| Backend | Node.js 16+, Express.js |
| Frontend | Angular 16 |
| AI/LLM | Google Gemini API |
| Communication | REST API, JSON |
| Styling | CSS3 |
| TypeScript | Yes (Backend & Frontend) |

## 📈 Scalability Path

**Current:** Learning & prototyping
- Mock database
- Single server
- In-memory state

**Production Ready:** Add
- Real database (PostgreSQL/MongoDB)
- Load balancing
- Caching layer (Redis)
- Authentication
- Rate limiting
- Monitoring

## ✅ Evaluation Criteria

Success is measured by:
- ✅ Correct tool selection
- ✅ Multi-step reasoning
- ✅ Follow-up questioning
- ✅ Context retention
- ✅ Image understanding
- ✅ Order execution
- ✅ Out-of-scope protection

**NOT** evaluated on:
- ❌ UI appearance
- ❌ Design aesthetics
- ❌ Complex navigation
- ❌ Mobile responsiveness

## 🎯 Next Steps

1. Read [README.md](README.md) for full guide
2. Follow [QUICKSTART.md](QUICKSTART.md) for setup
3. Review [ARCHITECTURE.md](ARCHITECTURE.md) for details
4. Try [TEST_QUERIES.md](TEST_QUERIES.md) examples
5. Modify and extend the system
6. Add new tools
7. Improve reasoning
8. Deploy to cloud

## 🤔 FAQ

**Q: Is this production-ready?**
A: It's a learning project. Extend it for production (add DB, auth, etc.)

**Q: Can I modify the tools?**
A: Yes! Edit `backend/src/tools/index.js` to add your own

**Q: How do I add more intents?**
A: Modify the `detectIntent()` in the orchestrator

**Q: Can I integrate with my database?**
A: Yes, replace mock data in tools with real DB queries

**Q: How is this different from a chatbot?**
A: This is an agent - it reasons, decides, and takes actions. A chatbot just responds.

## 📚 Resources

- [Google Gemini API](https://ai.google.dev/)
- [Express.js Docs](https://expressjs.com/)
- [Angular Docs](https://angular.io/)
- [AI Agent Patterns](https://www.anthropic.com/research/constitutional-ai)

## 📞 Support

- Check [CONFIG.md](CONFIG.md) for setup issues
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for design questions
- Try [TEST_QUERIES.md](TEST_QUERIES.md) for usage examples
- Check backend console for agent reasoning

## 🎓 Learning Outcome

After completing this project, you'll understand:
- How modern AI agents actually work
- Multi-step reasoning patterns
- Tool calling and action execution
- Context and state management
- Real-world agentic AI implementation

---

**Ready to learn? Start with [README.md](README.md)! 🚀**

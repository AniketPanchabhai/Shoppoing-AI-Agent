# Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1. Get Gemini API Key (2 minutes)
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### 2. Setup Backend (2 minutes)

```bash
cd "b:/Basic AI agent model/backend"
npm install
```

Create `.env` file:
```
GEMINI_API_KEY=paste_your_key_here
PORT=5000
NODE_ENV=development
```

Start backend:
```bash
npm start
```

You should see:
```
Shopping Agent Backend running on port 5000
```

### 3. Setup Frontend (1 minute)

In another terminal:
```bash
cd "b:/Basic AI agent model/frontend"
npm install
npm start
```

Frontend opens at `http://localhost:4200`

## 🎮 Try These Interactions

### Test 1: Basic Search
Type: `"Show me TVs above 50000"`

Expected: Agent searches and shows products

### Test 2: Product Details
Type: `"Tell me about the first one"`

Expected: Agent shows product details

### Test 3: Purchase Flow
1. Type: `"I want to buy the first product"`
2. Type: `"1"` (quantity)

Expected: Order confirmation

### Test 4: Image Upload
Click "📸 Upload Image" button and select any image.

Expected: Agent finds similar products

### Test 5: Out of Scope
Type: `"Write Java code"`

Expected: "I am a shopping assistant..."

## 🐛 Troubleshooting

### Backend won't start
- Check Node.js version: `node --version` (should be 16+)
- Check if port 5000 is available
- Check `.env` file has GEMINI_API_KEY

### Frontend won't connect
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify `http://localhost:5000/api/health` returns `{"status": "Server is running"}`

### Gemini API errors
- Verify API key is correct
- Check quota at https://makersuite.google.com
- Test with simple message first

## 📚 Next Steps

1. **Understand the Architecture** → Read [README.md](README.md)
2. **Explore Agent Logic** → Check `backend/src/agents/orchestrator.js`
3. **Examine Tools** → See `backend/src/tools/index.js`
4. **Modify Frontend** → Edit `frontend/src/app/app.component.html`
5. **Add New Tools** → Extend tool implementations
6. **Integrate Real DB** → Replace mock database

## 🎯 Learning Outcomes

By working through this project, you'll understand:
- How AI agents reason and decide
- Tool calling patterns
- Multi-step reasoning loops
- Context retention strategies
- Out-of-scope protection
- Real-world agentic AI patterns

## 💡 Tips

- **See Agent Thinking**: Check backend console for step-by-step reasoning
- **Debug Intents**: Modify intent detection prompts in orchestrator
- **Add Tools**: Extend tool selection logic and create new tools
- **Improve Responses**: Tune Gemini prompts in orchestrator
- **Test Edge Cases**: Try unusual combinations of queries

---

Happy Learning! 🚀

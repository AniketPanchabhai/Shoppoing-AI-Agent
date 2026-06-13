# Deployment & Verification Checklist

## Pre-Launch Verification

### Backend Prerequisites
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] Gemini API key obtained from Google
- [ ] `.env` file created with API key
- [ ] Dependencies installed (`npm install`)

### Frontend Prerequisites
- [ ] Angular CLI compatible
- [ ] All dependencies installed (`npm install`)
- [ ] No TypeScript errors
- [ ] Port 4200 available

### System Requirements
- [ ] 2 terminals available
- [ ] Ports 4200 and 5000 available
- [ ] Internet connection for Gemini API
- [ ] 500MB free disk space

## Installation Checklist

### Step 1: Backend Setup
```bash
cd backend
npm install
# Creates node_modules/
```
- [ ] No npm errors
- [ ] node_modules/ created
- [ ] package-lock.json created

### Step 2: Configuration
```bash
# In backend/ directory
copy .env.example .env
# Edit .env with your GEMINI_API_KEY
```
- [ ] .env file created
- [ ] API key entered
- [ ] PORT set to 5000
- [ ] NODE_ENV set to development

### Step 3: Frontend Setup
```bash
cd frontend
npm install
```
- [ ] No npm errors
- [ ] node_modules/ created
- [ ] package-lock.json created

## Runtime Checklist

### Backend Startup
```bash
cd backend
npm start
```
- [ ] Server starts without errors
- [ ] "Shopping Agent Backend running on port 5000" appears
- [ ] No red error messages in console

### Health Check - Backend
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running"}
```
- [ ] Request successful
- [ ] Response JSON valid

### Frontend Startup
```bash
cd frontend
npm start
```
- [ ] Angular compilation successful
- [ ] No TypeScript errors
- [ ] Browser opens to http://localhost:4200

### Frontend Loading
- [ ] Page loads without blank screen
- [ ] Header shows "🛍️ Shopping Agent Assistant"
- [ ] Chat window visible
- [ ] Input box ready
- [ ] Send button enabled

## Functionality Checklist

### Basic Chat
```
Type: "Show me phones"
Click: Send
```
- [ ] User message appears in chat
- [ ] Loading indicator shows
- [ ] Agent responds within 5 seconds
- [ ] Response message appears

### Product Display
After search query:
- [ ] Product cards visible
- [ ] Shows: name, brand, price, rating
- [ ] Stock status shown
- [ ] Cards clickable

### Image Upload
```
Click: "📸 Upload Image"
Select: Any image file
```
- [ ] File dialog appears
- [ ] Image upload succeeds
- [ ] Agent finds similar products
- [ ] Products displayed

### Message History
- [ ] User messages appear in blue
- [ ] Agent messages appear in gray
- [ ] Messages stack correctly
- [ ] Auto-scroll to newest message

### Reset Functionality
```
Click: "Reset Chat" button
```
- [ ] Chat clears
- [ ] Products removed
- [ ] Input field empty
- [ ] Ready for new conversation

## Agent Behavior Checklist

### Intent Detection
- [ ] Search queries recognized
- [ ] Product detail requests understood
- [ ] Purchase intents detected
- [ ] Image uploads classified

### Multi-Step Reasoning
```
Type: "I want to buy the first product"
Wait for: Quantity request
Type: "2"
```
- [ ] Agent asks for quantity
- [ ] Order confirmed after quantity
- [ ] Order details shown

### Context Retention
```
First: "Show me Samsung phones"
Then: "Tell me about the first one"
```
- [ ] Agent remembers Samsung filter
- [ ] Details for correct product shown
- [ ] No ambiguity errors

### Out-of-Scope Protection
```
Type: "Write Java code"
```
- [ ] Agent responds with out-of-scope message
- [ ] No shopping results returned
- [ ] Professional error message

### Tool Usage
- [ ] Search tools work correctly
- [ ] Product detail lookup works
- [ ] Order creation succeeds
- [ ] Inventory checks work

## Performance Checklist

### Response Time
- [ ] Simple search: < 2 seconds
- [ ] Product details: < 1.5 seconds
- [ ] Order creation: < 2 seconds
- [ ] Image analysis: < 3 seconds

### Stability
- [ ] No console errors
- [ ] No memory leaks
- [ ] Handles rapid requests
- [ ] Graceful error handling

### Backend Console
- [ ] Shows intent detection
- [ ] Shows tool selection
- [ ] Shows reasoning steps
- [ ] No unhandled exceptions

## Browser Compatibility
- [ ] Chrome/Edge: ✓
- [ ] Firefox: ✓
- [ ] Safari: ✓
- [ ] Mobile browsers: Limited (not required)

## Error Handling Checklist

### API Errors
- [ ] Invalid API key caught
- [ ] Network errors handled
- [ ] Tool failures graceful
- [ ] User sees friendly messages

### Input Validation
- [ ] Empty messages handled
- [ ] Special characters supported
- [ ] Large inputs accepted
- [ ] File uploads validated

### Recovery
- [ ] Can reset and restart
- [ ] Can continue after error
- [ ] No broken state
- [ ] Can retry operations

## Testing Queries

### Test Group 1: Basic Functionality
```
- "Show me phones"
- "Display all TVs"
- "Products under 50000"
```
Expected: Product lists appear

### Test Group 2: Refinement
```
- "Show phones"
- "Only Samsung"
- "Under 30000"
```
Expected: Refined results shown

### Test Group 3: Purchasing
```
- "I want to buy the first product"
- "2 units"
```
Expected: Order confirmation

### Test Group 4: Edge Cases
```
- "Write Java"
- "What's the weather?"
- ""
```
Expected: Proper error handling

## Verification Summary

- [ ] All prerequisites met
- [ ] Installation successful
- [ ] Backend running correctly
- [ ] Frontend loading properly
- [ ] Agent reasoning working
- [ ] Tools executing correctly
- [ ] Context retained between turns
- [ ] Out-of-scope queries rejected
- [ ] Performance acceptable
- [ ] Error handling graceful
- [ ] Ready for production testing

## Issues Encountered & Resolution

### Issue Template
**Problem:** [Description]
**Solution:** [Steps to fix]
**Verified:** [Date/Time]

### Common Issues

**Issue: Backend won't start**
- Check: Is Node.js installed?
- Check: Is port 5000 available?
- Check: Is GEMINI_API_KEY in .env?
- Solution: Delete node_modules and npm install again

**Issue: Frontend shows blank**
- Check: Is backend running?
- Check: Console for errors
- Solution: Hard refresh (Ctrl+Shift+R)

**Issue: Agent returns empty response**
- Check: API key valid
- Check: Internet connection
- Solution: Check backend console for errors

**Issue: Product cards not showing**
- Check: Search returned results
- Check: Scroll product grid
- Solution: Try different search terms

## Post-Deployment

### Monitoring
- [ ] Set up error logging
- [ ] Monitor API response times
- [ ] Track agent success rate
- [ ] Monitor user queries

### Maintenance
- [ ] Regular API key rotation
- [ ] Check for updates
- [ ] Database backups (if added)
- [ ] Performance optimization

### Improvements
- [ ] Add more products
- [ ] Implement real database
- [ ] Add user authentication
- [ ] Enhance UI/UX
- [ ] Add more tools

---

✅ Once all items checked, system is ready for operation!

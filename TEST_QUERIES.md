# Test Queries for Agent

This file contains example queries to test the Agentic AI Shopping Assistant.

## 1. Basic Search Queries

### Search with Single Filter
- **Input:** "Show me phones"
- **Expected:** List of phones with details
- **Agent Steps:** 
  - Detect: SEARCH intent
  - Extract: category=Phones
  - Execute: SEARCH_PRODUCTS
  - Return: Product list

### Search with Multiple Filters
- **Input:** "Show me Samsung phones below ₹30,000"
- **Expected:** Filtered phone list
- **Agent Steps:**
  - Detect: SEARCH intent
  - Extract: brand=Samsung, category=Phones, maxPrice=30000
  - Execute: SEARCH_PRODUCTS
  - Return: Filtered products

### Advanced Filter Search
- **Input:** "TVs above ₹50,000 with rating above 4.7"
- **Expected:** Premium TVs
- **Agent Steps:**
  - Detect: SEARCH intent
  - Extract: category=TVs, minPrice=50000, minRating=4.7
  - Execute: SEARCH_PRODUCTS with filters
  - Return: Premium TV options

## 2. Refined Search Queries

### Refine Previous Results
1. First: "Show me TVs"
   - Expected: All TVs listed
2. Then: "Only Samsung"
   - Expected: Samsung TVs only
   - Agent Steps:
     - Detect: REFINE_SEARCH intent
     - Extract: brand=Samsung from context
     - Check: Previous results available
     - Execute: SEARCH_PRODUCTS with brand filter
     - Return: Filtered results

### Brand Preference
1. First: "Show phones under 50000"
2. Then: "Only OnePlus please"
   - Expected: OnePlus phones under 50000

## 3. Product Detail Queries

### Get Details
- **Input:** "Tell me about the first product"
- **Expected:** Full product specifications
- **Agent Steps:**
  - Detect: GET_DETAILS intent
  - Extract: product index = 1
  - Execute: GET_PRODUCT_DETAILS
  - Return: Specs, warranty, features

### Specifications Request
- **Input:** "What are the specs of the Samsung TV?"
- **Expected:** Detailed specifications
- **Agent Steps:**
  - Detect: GET_DETAILS intent
  - Extract: product identifier
  - Execute: GET_PRODUCT_DETAILS
  - Return: Complete specs

## 4. Review & Rating Queries

### Review Analysis
- **Input:** "What do people say about this?"
- **Expected:** Review summary with pros/cons
- **Agent Steps:**
  - Detect: REVIEW_CHECK intent
  - Execute: ANALYZE_REVIEWS
  - Return: Sentiment, top pros, top cons

### Sentiment Check
- **Input:** "Are reviews good for the Samsung TV?"
- **Expected:** Review sentiment and summary
- **Agent Steps:**
  - Detect: REVIEW_CHECK intent
  - Execute: ANALYZE_REVIEWS
  - Return: Positive/negative percentage

## 5. Purchase Flow Queries

### Simple Purchase
1. **Input:** "I want to buy the first product"
   - Expected: Inventory check, quantity question
   - Agent Steps:
     - Detect: ORDER intent
     - Extract: product index
     - Execute: CHECK_INVENTORY
     - Decision: Need quantity
     - Ask: "How many units?"

2. **Input:** "1"
   - Expected: Order confirmation
   - Agent Steps:
     - Detect: QUANTITY_CONFIRMATION
     - Extract: quantity = 1
     - Execute: CREATE_ORDER
     - Return: Order ID, confirmation

### Purchase with Selection
- **Input:** "I want to buy the second one"
  - Expected: Order flow starts
  - Agent Steps:
    - Detect: ORDER intent
    - Check: Context for selected product
    - Verify: Product availability
    - Ask: Quantity needed

### Bulk Order
1. **Input:** "I want to order this"
2. **Input:** "5 units"
   - Expected: Order for 5 units placed
   - Order confirmation with total price

## 6. Image Upload Queries

### Image-Based Search
- **Action:** Upload a phone image
- **Input:** Click "📸 Upload Image"
- **Expected:** Similar products found
- **Agent Steps:**
  - Detect: IMAGE_SEARCH intent
  - Execute: ANALYZE_IMAGE
  - Extract: Category, similar items
  - Return: Product recommendations

### Image Analysis
- **Action:** Upload a TV image
- **Expected:** Related TVs shown
- **Agent Steps:**
  - Detect: IMAGE_SEARCH intent
  - Execute: ANALYZE_IMAGE
  - Return: Similar products in same category

## 7. Context Retention Queries

### Multi-Turn Refinement
```
Turn 1: "Show me TVs"
  → Returns: All TVs

Turn 2: "Only expensive ones"
  → Context: Previous results available
  → Agent filters by price

Turn 3: "OLED preferred"
  → Context: TV category, price range maintained
  → Further refined

Turn 4: "Tell me about the best one"
  → Context: Latest filtered list
  → Returns details of top product
```

### Conversation Continuity
```
Turn 1: "Show phones"
Turn 2: "From Samsung"
Turn 3: "The first one seems good"
Turn 4: "What's the warranty?"
  → Agent knows which product via context
  → Returns warranty details
```

## 8. Out-of-Scope Queries (Should Reject)

### Non-Shopping Topics
- **Input:** "Write Java code"
  - **Expected:** "I am a shopping assistant..."
  - **Agent Steps:**
    - Validate: Shopping-related? NO
    - Return: Out-of-scope message

### Knowledge Questions
- **Input:** "Who is the Prime Minister of India?"
  - **Expected:** "I can only help with shopping..."

### General Chat
- **Input:** "How are you?"
  - **Expected:** Out-of-scope response

### Math/Homework
- **Input:** "What is 2+2?"
  - **Expected:** "I am a shopping assistant..."

### Other Domains
- **Input:** "Play a game with me"
- **Input:** "Tell me a joke"
- **Input:** "What's the weather?"
  - **Expected:** All get out-of-scope response

## 9. Edge Case Queries

### Empty Input
- **Input:** "" (empty)
- **Expected:** No action or "Please type something"

### Ambiguous Reference
- **Input:** "Show me phones" then "How much is that?"
- **Expected:** Agent asks "Which one?" or shows options

### Conflicting Filters
- **Input:** "Samsung phones, but not Samsung"
- **Expected:** Agent clarifies preference

### Very High Price
- **Input:** "TVs above ₹1,000,000"
- **Expected:** "No products match these filters"

### Negative Price
- **Input:** "Phones below -5000"
- **Expected:** Invalid filter handling

## 10. Sequential Purchase Flow

Complete workflow to test multi-step reasoning:

```
Step 1: Search
Input: "Show me phones under 50000"
Expected: List of phones

Step 2: Filter
Input: "Only OnePlus"
Expected: OnePlus phones filtered

Step 3: Details
Input: "Tell me about the first one"
Expected: Full specs of OnePlus 11 Pro

Step 4: Reviews
Input: "What do people say?"
Expected: Review analysis

Step 5: Purchase Decision
Input: "I want this one"
Expected: Inventory check

Step 6: Quantity
Input: "2 units"
Expected: Order confirmation with total ₹156,000
```

## Expected Behaviors to Verify

✓ **Tool Selection**
- Right tool chosen for each query
- Tool parameters extracted correctly
- Tool results processed properly

✓ **Multi-Step Reasoning**
- Agent doesn't just return tool output
- Agent asks follow-up questions when needed
- Agent continues reasoning until enough info

✓ **Context Retention**
- References like "the first one" work correctly
- "Only Samsung" applies to previous results
- Conversation history maintained

✓ **Follow-Up Questions**
- Agent asks for quantity before order
- Agent asks for clarification when ambiguous
- Agent asks for more filters if search returns nothing

✓ **Out-of-Scope Protection**
- Non-shopping queries rejected
- Professional rejection messages
- No partial responses to off-topic queries

✓ **Image Understanding**
- Images upload successfully
- Similar products found
- Category detection works

✓ **Order Execution**
- Order confirmation received
- Order ID generated
- Delivery estimate shown

## Performance Metrics to Monitor

- Response time for searches (< 2 seconds)
- Tool selection accuracy (> 95%)
- Intent detection accuracy (> 90%)
- Successful order completion rate (100% when valid)
- Out-of-scope rejection accuracy (100%)

---

Use these queries to thoroughly test the agent's reasoning capabilities!

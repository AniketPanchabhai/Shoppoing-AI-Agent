# ⚡ QUICK START - MongoDB & Updated UI

## 🎯 What Changed?

✅ **UI:** Products now in sidebar (no more scrolling!)  
✅ **Database:** Using real MongoDB instead of mock data  
✅ **Data:** 8 sample products ready to seed  
✅ **Explanation:** Full agentic AI documentation provided  

---

## 📋 SETUP (10 minutes)

### Step 1: Install MongoDB (1 min)

**Windows/Mac:**
```bash
# Download from mongodb.com and install
# Or use Homebrew (Mac)
```

**Verify running:**
```bash
mongosh
# Should connect successfully
```

### Step 2: Update Backend (2 min)

```bash
cd backend

# Install mongoose
npm install mongoose

# Update .env
# Add this line to .env:
# MONGO_URI=mongodb://localhost:27017/shopping-agent
```

### Step 3: Seed Database (1 min)

```bash
node src/seed.js

# Expected output:
# ✓ Connected to MongoDB
# ✓ Successfully inserted 8 products
```

### Step 4: Start Backend (1 min)

```bash
npm start

# Expected output:
# ✓ Shopping Agent Backend running on port 5000
# ✓ MongoDB connected: mongodb://localhost:27017/shopping-agent
```

### Step 5: Start Frontend (5 min)

```bash
cd ../frontend
npm install  # First time only
npm start

# Browser opens to http://localhost:4200
```

---

## 🧪 TEST IT

### Test 1: Basic Search
```
Type: "Show me Samsung phones"
Expected: Products appear in right sidebar
```

### Test 2: Purchase Flow
```
Type: "I want to buy the first product"
Agent asks: "How many units?"
Type: "1"
Expected: Order confirmation popup
```

### Test 3: Image Upload
```
Click: 📸 Upload Image
Select: Any image
Expected: Similar products shown
```

---

## 🗂️ NEW FILES

### Backend
```
src/models/index.js          → Mongoose schemas (Product, Order, Review)
src/services/database.js     → MongoDB connection service
src/seed-data.js             → 8 sample products
src/seed.js                  → Seeding script
```

### Documentation
```
AGENTIC_AI_EXPLAINED.md      → Complete AI explanation
MONGODB_SETUP.md             → Full MongoDB guide
UPDATES_SUMMARY.md           → What changed & why
```

---

## 🎨 UI IMPROVEMENTS

### Before
- Products mixed with chat
- Excessive scrolling
- Confusing layout

### After
- Chat in main area
- Products in fixed sidebar
- Clean, professional look
- Sidebar auto-collapses when empty

---

## 💾 DATABASE SCHEMA

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,           // "Samsung Galaxy S21 Ultra"
  brand: String,          // "Samsung"
  category: String,       // "Phones", "TVs"
  price: Number,          // 95000
  rating: Number,         // 4.7
  reviews: Number,        // 856
  inStock: Boolean,       // true
  quantity: Number,       // 25
  specs: Map,             // { processor: "...", ram: "12GB" }
  warranty: String,       // "1 year"
  description: String,    // "Flagship smartphone..."
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String,        // "ORD-1717840123456" (unique)
  productId: ObjectId,    // Reference to product
  productName: String,    // "Samsung Galaxy S21 Ultra"
  quantity: Number,       // 1
  unitPrice: Number,      // 95000
  totalPrice: Number,     // 95000
  status: String,         // "confirmed", "shipped", etc
  estimatedDelivery: String,
  createdAt: Date
}
```

---

## 🔧 TOOLS NOW USE MONGODB

| Tool | Operation |
|------|-----------|
| SEARCH_PRODUCTS | MongoDB query with filters |
| GET_PRODUCT_DETAILS | MongoDB findById |
| ANALYZE_REVIEWS | MongoDB product lookup |
| CHECK_INVENTORY | MongoDB quantity check |
| CREATE_ORDER | MongoDB insert + update |
| ANALYZE_IMAGE | MongoDB category search |

---

## 📚 WHAT IS AGENTIC AI?

**Simple Answer:**
```
Agentic AI = AI that thinks, reasons, and takes actions
            (not just chatbot that retrieves info)
```

**Your System:**
1. Understands intent (what you want)
2. Reasons through solution (what to do)
3. Selects tools (which tool to use)
4. Executes actions (searches, orders)
5. Analyzes results (enough info?)
6. Asks follow-ups (needs clarification?)
7. Creates orders (real actions)

**Read:** `AGENTIC_AI_EXPLAINED.md` for full explanation

---

## 🚨 TROUBLESHOOTING

### MongoDB Not Connecting
```bash
# Start MongoDB
mongosh

# Or check if running
lsof -i :27017
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# Or kill process
kill -9 <PID>
```

### Seed Failed
```bash
# Make sure MongoDB is running first
mongosh

# Then seed
node src/seed.js
```

### Frontend Won't Connect to Backend
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"Server is running"}
```

---

## 📖 DOCUMENTATION

| Document | Purpose |
|----------|---------|
| AGENTIC_AI_EXPLAINED.md | What agentic AI is & how it works |
| MONGODB_SETUP.md | Complete MongoDB setup guide |
| UPDATES_SUMMARY.md | What was changed & why |
| README.md | Original project overview |
| ARCHITECTURE.md | Technical architecture details |

---

## ✅ VERIFICATION CHECKLIST

- [ ] MongoDB installed and running
- [ ] `npm install mongoose` done
- [ ] `.env` has `MONGO_URI`
- [ ] Seed script executed successfully
- [ ] Backend starts with "✓ MongoDB connected"
- [ ] Frontend loads at http://localhost:4200
- [ ] Can search for products
- [ ] Products appear in right sidebar
- [ ] Can see product details
- [ ] Can create an order
- [ ] Order appears in database

---

## 🎯 NEXT STEPS

1. ✅ Get everything running (use steps above)
2. 📖 Read `AGENTIC_AI_EXPLAINED.md` to understand the AI
3. 🧪 Test queries from `TEST_QUERIES.md`
4. 🚀 Deploy to production (see guides)
5. 🎨 Customize for your needs

---

## 💡 KEY COMMANDS

```bash
# Start MongoDB
mongosh

# Seed database
node src/seed.js

# Start backend
npm start

# Start frontend
npm start

# View products
mongosh
use shopping-agent
db.products.find()

# Clear database
db.products.deleteMany({})

# View orders
db.orders.find()
```

---

**Everything is ready! Start with Step 1 above.** ⚡

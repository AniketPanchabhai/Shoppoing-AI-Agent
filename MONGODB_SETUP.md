# MongoDB Setup Guide

## Quick Setup

### Step 1: Install MongoDB

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer and follow prompts
3. MongoDB will run as a service

**Mac (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Verify MongoDB is Running

```bash
# Should connect successfully
mongo
# or
mongosh
```

### Step 3: Update Backend Configuration

Edit `.env`:
```env
GEMINI_API_KEY=your_key_here
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/shopping-agent
```

### Step 4: Install Dependencies

```bash
cd backend
npm install
# This will install mongoose
```

### Step 5: Seed Database

```bash
cd backend
node src/seed.js
```

Expected output:
```
Connecting to mongodb://localhost:27017/shopping-agent...
✓ Connected to MongoDB
Clearing existing products...
Inserting seed data...
✓ Successfully inserted 8 products
```

### Step 6: Start Backend

```bash
npm start
```

---

## Using MongoDB Atlas (Cloud)

### Step 1: Create Account

1. Visit: https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a new project

### Step 2: Create Cluster

1. Click "Create Deployment"
2. Choose "M0 Free" tier
3. Select region (closest to you)
4. Click "Create Deployment"

### Step 3: Get Connection String

1. Click "Connect"
2. Choose "Drivers" > "Node.js"
3. Copy the connection string
4. Replace `<username>`, `<password>`, `<dbname>`

### Step 4: Update `.env`

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shopping-agent
```

### Step 5: Seed Data

```bash
node src/seed.js "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shopping-agent"
```

---

## Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solution 1: MongoDB not running**
```bash
# Windows - Check service
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Solution 2: Wrong connection string**
```
# Local
MONGO_URI=mongodb://localhost:27017/shopping-agent

# Atlas
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopping-agent
```

**Solution 3: Port already in use**
```bash
# Find process using port 27017
lsof -i :27017

# Kill if needed
kill -9 <PID>
```

### Error: "Authentication failed"

**For Atlas:**
1. Check username/password are correct
2. Add your IP to whitelist:
   - MongoDB Atlas Dashboard
   - Network Access
   - Add Current IP

### Error: "Database not found"

**Solution:**
```bash
# Seed data first
node src/seed.js

# Or create manually in MongoDB
use shopping-agent
```

---

## Verify Setup

### Check Database

**Local:**
```bash
mongo shopping-agent
db.products.find()
```

**Atlas:**
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/shopping-agent"
db.products.find()
```

Should see 8 products.

### Check Backend

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{"status":"Server is running"}
```

### Test API

```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me phones",
    "context": {}
  }'
```

---

## Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  brand: String,
  category: String,
  price: Number,
  rating: Number,
  reviews: Number,
  inStock: Boolean,
  quantity: Number,
  specs: Map,
  warranty: String,
  description: String,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String (unique),
  productId: ObjectId (ref),
  productName: String,
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number,
  status: String ('pending', 'confirmed', 'shipped', 'delivered'),
  estimatedDelivery: String,
  createdAt: Date
}
```

---

## Useful Commands

### Backup Database

```bash
# Local
mongodump --db shopping-agent --out ./backup

# Atlas
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/shopping-agent"
```

### Restore Database

```bash
mongorestore --db shopping-agent ./backup/shopping-agent
```

### View All Databases

```bash
mongo
show dbs
use shopping-agent
show collections
```

### Query Examples

```javascript
// Count products
db.products.count()

// Find by brand
db.products.find({ brand: "Samsung" })

// Find by price range
db.products.find({ price: { $gte: 50000, $lte: 100000 } })

// Update product
db.products.updateOne(
  { _id: ObjectId("...") },
  { $set: { quantity: 5 } }
)

// Delete product
db.products.deleteOne({ _id: ObjectId("...") })
```

---

## Performance Optimization

### Create Indexes

```bash
# Connect to MongoDB
mongo shopping-agent

# Create indexes
db.products.createIndex({ brand: 1 })
db.products.createIndex({ category: 1 })
db.products.createIndex({ price: 1 })
db.products.createIndex({ rating: 1 })
db.orders.createIndex({ orderId: 1 })
db.orders.createIndex({ productId: 1 })
db.orders.createIndex({ createdAt: -1 })
```

---

## Development Tips

### View All Products

```javascript
// In MongoDB shell
use shopping-agent
db.products.find().pretty()
```

### Clear All Data

```javascript
db.products.deleteMany({})
db.orders.deleteMany({})
```

### Add Custom Product

```javascript
db.products.insertOne({
  name: "My Product",
  brand: "My Brand",
  category: "Phones",
  price: 50000,
  rating: 4.5,
  reviews: 100,
  inStock: true,
  quantity: 20,
  specs: { 
    processor: "My Processor",
    ram: "8GB"
  },
  warranty: "1 year",
  description: "My description"
})
```

---

**Ready to use MongoDB! 🚀**

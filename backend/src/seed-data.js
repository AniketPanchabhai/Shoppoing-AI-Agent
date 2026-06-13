/**
 * MongoDB Seed Data
 * Import this into MongoDB using:
 * mongoimport --uri "mongodb://localhost:27017/shopping-agent" --collection products --file seed-data.json
 * 
 * Or use MongoDB Compass to import this data manually
 */

const products = [
  {
    "_id": { "$oid": "507f1f77bcf86cd799439011" },
    "name": "Samsung 55\" 4K Smart TV",
    "brand": "Samsung",
    "category": "TVs",
    "price": 65000,
    "rating": 4.8,
    "reviews": 324,
    "inStock": true,
    "quantity": 15,
    "specs": {
      "screen": "55 inches",
      "resolution": "4K (3840x2160)",
      "refreshRate": "60Hz",
      "smartFeatures": "Tizen OS",
      "panelType": "LED"
    },
    "warranty": "2 years",
    "description": "Premium 4K TV with Smart features",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439012" },
    "name": "Samsung Galaxy S21 Ultra",
    "brand": "Samsung",
    "category": "Phones",
    "price": 95000,
    "rating": 4.7,
    "reviews": 856,
    "inStock": true,
    "quantity": 25,
    "specs": {
      "processor": "Snapdragon 888",
      "ram": "12GB",
      "storage": "256GB",
      "camera": "108MP",
      "battery": "5000mAh"
    },
    "warranty": "1 year",
    "description": "Flagship smartphone with excellent camera",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439013" },
    "name": "iPhone 14 Pro",
    "brand": "Apple",
    "category": "Phones",
    "price": 129000,
    "rating": 4.9,
    "reviews": 1203,
    "inStock": false,
    "quantity": 0,
    "specs": {
      "processor": "A16 Bionic",
      "ram": "6GB",
      "storage": "256GB",
      "camera": "48MP",
      "battery": "3200mAh"
    },
    "warranty": "1 year",
    "description": "Latest iPhone with Pro features",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439014" },
    "name": "Sony 65\" 8K TV",
    "brand": "Sony",
    "category": "TVs",
    "price": 185000,
    "rating": 4.6,
    "reviews": 156,
    "inStock": true,
    "quantity": 8,
    "specs": {
      "screen": "65 inches",
      "resolution": "8K (7680x4320)",
      "refreshRate": "120Hz",
      "smartFeatures": "Android TV",
      "panelType": "OLED"
    },
    "warranty": "3 years",
    "description": "Premium 8K TV with OLED technology",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439015" },
    "name": "OnePlus 11 Pro",
    "brand": "OnePlus",
    "category": "Phones",
    "price": 78000,
    "rating": 4.5,
    "reviews": 542,
    "inStock": true,
    "quantity": 20,
    "specs": {
      "processor": "Snapdragon 8 Gen 1",
      "ram": "8GB",
      "storage": "128GB",
      "camera": "50MP",
      "battery": "5000mAh"
    },
    "warranty": "1 year",
    "description": "Fast and affordable flagship killer",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439016" },
    "name": "LG OLED 55\" TV",
    "brand": "LG",
    "category": "TVs",
    "price": 145000,
    "rating": 4.8,
    "reviews": 423,
    "inStock": true,
    "quantity": 12,
    "specs": {
      "screen": "55 inches",
      "resolution": "4K OLED",
      "refreshRate": "120Hz",
      "smartFeatures": "WebOS",
      "panelType": "OLED"
    },
    "warranty": "2 years",
    "description": "Beautiful OLED display with incredible contrast",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439017" },
    "name": "Google Pixel 7",
    "brand": "Google",
    "category": "Phones",
    "price": 72000,
    "rating": 4.6,
    "reviews": 389,
    "inStock": true,
    "quantity": 18,
    "specs": {
      "processor": "Google Tensor",
      "ram": "8GB",
      "storage": "128GB",
      "camera": "50MP",
      "battery": "4700mAh"
    },
    "warranty": "1 year",
    "description": "Google's flagship with excellent AI features",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  },
  {
    "_id": { "$oid": "507f1f77bcf86cd799439018" },
    "name": "TCL 43\" Smart TV",
    "brand": "TCL",
    "category": "TVs",
    "price": 28000,
    "rating": 4.3,
    "reviews": 212,
    "inStock": true,
    "quantity": 30,
    "specs": {
      "screen": "43 inches",
      "resolution": "Full HD (1920x1080)",
      "refreshRate": "60Hz",
      "smartFeatures": "Roku OS",
      "panelType": "LED"
    },
    "warranty": "1 year",
    "description": "Budget-friendly smart TV",
    "createdAt": { "$date": "2024-06-01T00:00:00Z" }
  }
];

module.exports = { products };

/**
 * HOW TO USE THIS SEED FILE:
 * 
 * Option 1: Using MongoDB Compass (GUI)
 * 1. Open MongoDB Compass
 * 2. Connect to your MongoDB instance
 * 3. Create a database called "shopping-agent"
 * 4. Create a collection called "products"
 * 5. Click "Add Data" > "Import File"
 * 6. Select this file (convert to JSON format first)
 * 7. Click Import
 * 
 * Option 2: Using mongoimport (CLI)
 * 1. Save this data as "products.json" (JSON array format)
 * 2. Run: mongoimport --uri "mongodb://localhost:27017/shopping-agent" --collection products --file products.json
 * 
 * Option 3: Programmatically in Node.js
 * const { Product } = require('./models');
 * const { products } = require('./seed-data');
 * 
 * async function seedData() {
 *   await Product.deleteMany({});  // Clear existing data
 *   await Product.insertMany(products);
 *   console.log('Data seeded!');
 * }
 * 
 * Option 4: Using a seed script (see seed.js file)
 */

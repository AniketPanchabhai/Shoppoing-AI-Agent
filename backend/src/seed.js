/**
 * Seed Database Script
 * Run this to populate MongoDB with initial data
 * 
 * Usage:
 * node src/seed.js mongodb://localhost:27017/shopping-agent
 */

const mongoose = require('mongoose');
const { Product } = require('./models');
const { products } = require('./seed-data');
const app = express();
const dns = require('dns');

dns.setServers([
  '1.1.1.1',
  '1.0.0.1'
]);
async function seedDatabase() {
  console.log('Starting database seeding...', process.env.MONGO_URI);
  try {
    const mongoUri = process.env.MONGO_URI|| 'mongodb://localhost:27017/shopping-agent';
    
    console.log(`Connecting to ${mongoUri}...`);
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✓ Connected to MongoDB');
    
    // Clear existing products
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    // Insert seed data
    console.log('Inserting seed data...');
    const result = await Product.insertMany(products);
    
    console.log(`✓ Successfully inserted ${result.length} products`);
    console.log('\nSample products:');
    result.slice(0, 3).forEach(p => {
      console.log(`  - ${p.name} (${p.brand}) - ₹${p.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

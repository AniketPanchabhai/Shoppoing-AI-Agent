const express = require('express');
const cors = require('cors');
require('dotenv').config();
const databaseService = require('./services/database');
const chatRouter = require('./routes/chatRoutes');

const app = express();
const dns = require('dns');

dns.setServers([
  '1.1.1.1',
  '1.0.0.1'
]);
// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/chat', chatRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopping-agent';
// Start server with MongoDB connection
async function startServer() {
  try {
    // Connect to MongoDB
    await databaseService.connect(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`✓ Shopping Agent Backend running on port ${PORT}`);
      console.log(`✓ MongoDB connected: ${MONGO_URI}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }

}
console.log('Starting server...', MONGO_URI);
startServer();


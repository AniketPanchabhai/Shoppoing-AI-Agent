const mongoose = require('mongoose');

class DatabaseService {
  constructor() {
    this.isConnected = false;
  }

  /**
   * Connect to MongoDB
   */
  async connect(mongoUri) {
    try {
      if (this.isConnected) {
        console.log('Already connected to MongoDB');
        return;
      }

      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      this.isConnected = true;

      console.log('✓ Connected to MongoDB');
      
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      throw error;
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('MongoDB Disconnection Error:', error);
    }
  }

  /**
   * Check connection status
   */
  isMongoConnected() {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}

module.exports = new DatabaseService();

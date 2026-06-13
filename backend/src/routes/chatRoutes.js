const express = require('express');
const router = express.Router();
const orchestrator = require('../agents/orchestrator');
const multer = require('multer');

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * POST /api/chat/message
 * Sends a message to the agent
 */
router.post('/message', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Process query through agent
    const response = await orchestrator.processUserQuery(message, context || {});

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * POST /api/chat/image
 * Uploads an image for analysis
 */
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const imageData = req.file.buffer;
    const message = req.body.message || 'Find products similar to this image';

    // Process image through agent
    const context = {
      imageData: imageData,
      imageType: req.file.mimetype
    };

    const response = await orchestrator.processUserQuery(message, context);

    res.json(response);
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ 
      error: 'Error processing image',
      message: error.message 
    });
  }
});

/**
 * GET /api/chat/history
 * Retrieves conversation history
 */
router.get('/history', (req, res) => {
  const history = orchestrator.conversationHistory;
  res.json({ history });
});

/**
 * POST /api/chat/reset
 * Resets conversation history
 */
router.post('/reset', (req, res) => {
  orchestrator.conversationHistory = [];
  orchestrator.selectedProducts.clear();
  res.json({ message: 'Conversation reset' });
});

module.exports = router;

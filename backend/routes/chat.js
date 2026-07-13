const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const ChatConversation = require('../models/ChatConversation');
const { chatWithAI } = require('../services/aiService');

router.get('/', protect, async (req, res) => {
    try {
        let conversation = await ChatConversation.findOne({ user: req.user._id }).sort({ updatedAt: -1 });

        if (!conversation) {
            conversation = await ChatConversation.create({ user: req.user._id, messages: [] });
        }

        res.json({ success: true, data: conversation, message: 'Chat history fetched successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch chat history', error: error.message });
    }
});

router.post('/', protect, async (req, res) => {
    try {
        const { message } = req.body;
        let conversation = await ChatConversation.findOne({ user: req.user._id }).sort({ updatedAt: -1 });

        if (!conversation) {
            conversation = await ChatConversation.create({ user: req.user._id, messages: [] });
        }

        // Add user message
        conversation.messages.push({ role: 'user', content: message, timestamp: new Date() });

        // Prepare history for AI
        const history = conversation.messages.map(m => ({ role: m.role, content: m.content }));

        // Get AI response
        const aiResponse = await chatWithAI(history);

        // Add AI message
        conversation.messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date() });
        await conversation.save();

        res.json({ success: true, data: conversation, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to process message', error: error.message });
    }
});

module.exports = router;

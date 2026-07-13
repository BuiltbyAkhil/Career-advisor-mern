const mongoose = require('mongoose');

const chatConversationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{
        role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    topic: { type: String, default: 'General Career Advice' }
}, { timestamps: true });

module.exports = mongoose.model('ChatConversation', chatConversationSchema);

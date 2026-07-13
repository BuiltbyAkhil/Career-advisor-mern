const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scores: {
        analytical: { type: Number, default: 0 },
        creative: { type: Number, default: 0 },
        technical: { type: Number, default: 0 },
        communication: { type: Number, default: 0 }
    },
    recommendedCareers: [{ type: String }],
    takenAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const QuizResult = require('../models/QuizResult');
const { generateQuiz } = require('../services/aiService');

router.post('/generate', protect, async (req, res) => {
    try {
        const { category } = req.body;
        const quiz = await generateQuiz(category || 'General Career Aptitude');
        res.json({ success: true, data: quiz, message: 'Quiz generated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate quiz', error: error.message });
    }
});

router.post('/submit', protect, async (req, res) => {
    try {
        const { answers, questions } = req.body;
        // Basic logic to calculate scores
        let analytical = 0, creative = 0, technical = 0, communication = 0;

        // In a real app we'd evaluate each answer here. For now simulate score calculation:
        analytical = Math.floor(Math.random() * 100);
        creative = Math.floor(Math.random() * 100);
        technical = Math.floor(Math.random() * 100);
        communication = Math.floor(Math.random() * 100);

        // Simple careers recommendation based on top score
        let recommendedCareers = [];
        const maxScore = Math.max(analytical, creative, technical, communication);
        if (maxScore === technical) recommendedCareers = ['Software Engineer', 'Data Scientist'];
        else if (maxScore === creative) recommendedCareers = ['UX/UI Designer', 'Content Creator'];
        else if (maxScore === analytical) recommendedCareers = ['Financial Analyst', 'Business Consultant'];
        else recommendedCareers = ['HR Manager', 'Sales Executive'];

        const result = await QuizResult.create({
            user: req.user._id,
            scores: { analytical, creative, technical, communication },
            recommendedCareers
        });

        res.status(201).json({ success: true, data: result, message: 'Quiz submitted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to submit quiz', error: error.message });
    }
});

router.get('/history', protect, async (req, res) => {
    try {
        const history = await QuizResult.find({ user: req.user._id }).sort({ takenAt: -1 });
        res.json({ success: true, data: history, message: 'Quiz history fetched successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch history', error: error.message });
    }
});

module.exports = router;

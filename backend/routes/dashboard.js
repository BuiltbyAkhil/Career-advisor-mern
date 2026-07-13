const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const QuizResult = require('../models/QuizResult');
const CareerRoadmap = require('../models/CareerRoadmap');
const Achievement = require('../models/Achievement');
const Subscription = require('../models/Subscription');

router.get('/', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        const latestQuizResult = await QuizResult.findOne({ user: userId }).sort({ takenAt: -1 });
        const activeRoadmaps = await CareerRoadmap.find({ user: userId }).sort({ createdAt: -1 });
        const achievements = await Achievement.find({ user: userId });
        const subscription = await Subscription.findOne({ user: userId, status: 'active' });

        res.json({
            success: true,
            data: {
                user: req.user,
                latestQuizResult,
                activeRoadmaps,
                achievements,
                subscription: subscription ? subscription.plan : 'free'
            },
            message: 'Dashboard data fetched successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

module.exports = router;

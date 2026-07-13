const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Subscription = require('../models/Subscription');

// Mock/placeholder payment flow — no external gateway integration.
// Activates a subscription immediately so the MERN stack has no external
// payment dependency. Swap this out for real Stripe/Razorpay calls later
// if real payments are needed.
router.post('/subscribe', protect, async (req, res) => {
    try {
        const { plan, amount } = req.body;

        if (!plan || !['premium', 'pro'].includes(plan)) {
            return res.status(400).json({ success: false, message: 'Invalid plan selected' });
        }

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);

        const subscription = await Subscription.create({
            user: req.user._id,
            plan,
            status: 'active',
            gatewaySubscriptionId: `mock_${Date.now()}`,
            amount: amount || 0,
            endDate
        });

        res.json({
            success: true,
            data: subscription,
            message: 'Subscription activated successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to activate subscription', error: error.message });
    }
});

router.get('/status', protect, async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ user: req.user._id, status: 'active' }).sort({ createdAt: -1 });
        res.json({ success: true, data: subscription, message: 'Subscription status fetched' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

module.exports = router;

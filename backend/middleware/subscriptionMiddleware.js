const Subscription = require('../models/Subscription');

const checkSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({ user: req.user._id, status: 'active' });
        if (subscription) {
            req.subscription = subscription;
            next();
        } else {
            res.status(403).json({ success: false, message: 'Active premium subscription required' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error checking subscription status' });
    }
};

module.exports = { checkSubscription };

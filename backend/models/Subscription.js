const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive', 'cancelled', 'past_due'], default: 'active' },
    paymentGateway: { type: String, enum: ['razorpay', 'stripe'] },
    gatewaySubscriptionId: { type: String },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);

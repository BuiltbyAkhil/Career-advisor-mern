const mongoose = require('mongoose');

const careerRoadmapSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetCareer: { type: String, required: true },
    steps: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
        resources: [{
            title: { type: String },
            url: { type: String },
            type: { type: String, enum: ['course', 'article', 'video', 'book'] }
        }]
    }],
    isGeneratedByAI: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CareerRoadmap', careerRoadmapSchema);

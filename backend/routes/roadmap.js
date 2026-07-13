const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const CareerRoadmap = require('../models/CareerRoadmap');
const { generateRoadmap } = require('../services/aiService');

router.post('/generate', protect, async (req, res) => {
    try {
        const { targetCareer, educationLevel } = req.body;
        const roadmapData = await generateRoadmap(targetCareer, educationLevel);

        const roadmap = await CareerRoadmap.create({
            user: req.user._id,
            targetCareer,
            steps: roadmapData.steps,
            isGeneratedByAI: true
        });

        res.status(201).json({ success: true, data: roadmap, message: 'Roadmap generated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to generate roadmap', error: error.message });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const roadmaps = await CareerRoadmap.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: roadmaps, message: 'Roadmaps fetched successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch roadmaps', error: error.message });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const roadmap = await CareerRoadmap.findOne({ _id: req.params.id, user: req.user._id });
        if (!roadmap) {
            return res.status(404).json({ success: false, message: 'Roadmap not found' });
        }
        res.json({ success: true, data: roadmap, message: 'Roadmap fetched successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch roadmap', error: error.message });
    }
});

router.put('/:id/step/:stepId', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const roadmap = await CareerRoadmap.findOne({ _id: req.params.id, user: req.user._id });

        if (!roadmap) {
            return res.status(404).json({ success: false, message: 'Roadmap not found' });
        }

        // Find step by _id or by index (supports both)
        const step = roadmap.steps.id
            ? roadmap.steps.id(req.params.stepId)
            : roadmap.steps[parseInt(req.params.stepId)];

        if (!step) {
            // Fallback: find by string _id match
            const found = roadmap.steps.find(s => s._id.toString() === req.params.stepId);
            if (!found) return res.status(404).json({ success: false, message: 'Step not found' });
            found.status = status;
        } else {
            step.status = status;
        }

        await roadmap.save();
        res.json({ success: true, data: roadmap, message: 'Step updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update step', error: error.message });
    }
});

module.exports = router;

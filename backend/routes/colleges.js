const express = require('express');
const router = express.Router();
const College = require('../models/College');

router.get('/', async (req, res) => {
    try {
        const { city, state, type } = req.query;
        let query = {};
        if (city) query['location.city'] = new RegExp(city, 'i');
        if (state) query['location.state'] = new RegExp(state, 'i');
        if (type) query.type = type;

        const colleges = await College.find(query);
        res.json({ success: true, data: colleges, message: 'Colleges fetched successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.json({ success: true, data: college, message: 'College fetched successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

module.exports = router;

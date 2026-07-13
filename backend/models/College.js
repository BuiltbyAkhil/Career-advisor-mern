const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true }
    },
    established: { type: Number },
    type: { type: String, enum: ['Government', 'Private', 'Deemed', 'Autonomous'], required: true },
    ranking: { type: Number },
    courses: [{
        name: { type: String },
        duration: { type: String },
        fees: { type: Number }
    }],
    website: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);

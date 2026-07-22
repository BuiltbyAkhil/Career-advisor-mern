require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/roadmap', require('./routes/roadmap'));
app.use('/api/colleges', require('./routes/colleges'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/payments', require('./routes/payments'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
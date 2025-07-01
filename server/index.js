require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:3000',    // your React app URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],   // ✅ allow Authorization header
}));        

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutess');

app.use('/api/auth', authRoutes);         // Auth routes (register, login)
app.use('/api/products', productRoutes);  // Product routes (CRUD)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

const express = require('express');
const router = express.Router();
const Exchange = require('../models/Exchange');
const verifyToken = require('../middleware/authMiddleware');

// POST /api/exchange
router.post('/', verifyToken, async (req, res) => {
  try {
    const newExchange = new Exchange({ ...req.body, user: req.user.userId });
    await newExchange.save();
    res.status(201).json(newExchange);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting exchange request' });
  }
});

// GET /api/exchange (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const exchanges = await Exchange.find().sort({ createdAt: -1 });
    res.json(exchanges);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch exchange requests' });
  }
});

module.exports = router;

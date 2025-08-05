const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Installation = require('../models/Installation');


router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, phone, address, notes } = req.body;

    // Validate required fields
    if (!name || !phone || !address) {
      return res.status(400).json({ message: 'Name, phone, and address are required.' });
    }

    const newRequest = new Installation({
      user: req.user.userId,
      name,
      phone,
      address,
      notes,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Installation request error:', err);
    res.status(500).json({ message: 'Failed to submit request' });
  }
});


router.get('/mine', verifyToken, async (req, res) => {
  try {
    const requests = await Installation.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Fetch installation error:', err);
    res.status(500).json({ message: 'Failed to fetch installation requests' });
  }
});

module.exports = router;

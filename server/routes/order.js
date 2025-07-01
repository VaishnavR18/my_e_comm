const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Place order (user must be logged in)
router.post('/place', verifyToken, (req, res) => {
  const userId = req.user.userId;
  res.json({ message: `Order placed by user ${userId}` });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const Order = require('../models/Order');
const User = require('../models/User');
const sendMail = require('../utils/sendMail'); // 

// Place a new order (user must be logged in)
router.post('/place', verifyToken, async (req, res) => {
  try {
    const { items, shippingInfo, paymentInfo = null, totalPrice } = req.body;

    // Create and save order
    const order = new Order({
      user: req.user.userId,
      items,
      shippingInfo,
      paymentInfo,
      totalPrice,
    });
    await order.save();

    // Find user
    const user = await User.findById(req.user.userId);

    // Send order confirmation email
    await sendMail({
      to: user.email,
      subject: 'Your LuxeMarket Order Confirmation',
      html: `
        <h2>Hi ${user.name},</h2>
        <p>Your order <strong>#${order._id}</strong> was placed successfully! 🎉</p>
        <p><strong>Total:</strong> ₹${totalPrice}</p>
        <p>We'll notify you when your items ship.</p>
      `
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Order save error:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Get all orders (admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Update order status (admin only)
router.put('/:orderId/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: req.body.status },
      { new: true }
    );

    // Find user who placed the order
    const user = await User.findById(order.user);

    // Send status update email
    await sendMail({
      to: user.email,
      subject: `Update: Your order #${order._id} is now ${order.status}`,
      html: `
        <h2>Hi ${user.name},</h2>
        <p>Your order <strong>#${order._id}</strong> status has been updated to: <strong>${order.status}</strong>.</p>
        <p>Thank you for shopping with LuxeMarket!</p>
      `
    });

    res.json(order);
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

// Get logged-in user's own orders
router.get('/mine', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Fetch my orders error:', err);
    res.status(500).json({ message: 'Failed to fetch your orders' });
  }
});

module.exports = router;

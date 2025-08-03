const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// Allowed fields to update
const allowedFields = [
  'name', 'brand', 'description', 'price', 'capacity', 'backupTime',
  'imageUrls', 'stock', 'discount', 'rating', 'reviewCount',
  'features', 'warranty', 'category'
];

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products - Create product (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// PUT /api/products/:id - Update product dynamically (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  const updates = {};
  for (const key of Object.keys(req.body)) {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key];
    }
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ error: 'Invalid product data or ID' });
  }
});

// DELETE /api/products/:id - Delete product (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

module.exports = router;

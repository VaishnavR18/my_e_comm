const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a product
router.post('/', async (req, res) => {
  const { name, price, imageUrl, description } = req.body;
  try {
    const newProduct = new Product({ name, price, imageUrl, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, imageUrl, description },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product data or ID' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

module.exports = router;

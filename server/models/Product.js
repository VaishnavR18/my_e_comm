const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

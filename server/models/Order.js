const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: String,
      quantity: Number,
      price: Number,
      imageUrl: String,
    }
  ],
  shippingInfo: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
  paymentInfo: {
    cardName: String,
    cardNumber: String,
    expiryDate: String,
  },
  totalPrice: Number,
  status: {
    type: String,
    default: 'Processing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', orderSchema);

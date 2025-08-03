const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  oldUpsModel: String,
  condition: String,
  estimatedValue: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exchange', exchangeSchema);

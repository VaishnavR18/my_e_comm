const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },                   // e.g., "APC Back-UPS 1000VA"
  brand: { type: String, required: true },                  // e.g., "APC", "Luminous"
  description: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: String, required: true },               // e.g., "1000VA", "1500VA"
  backupTime: { type: String },                             // e.g., "30 mins", "1 hour"
  imageUrls: [String],                                      // Array of image URLs
  stock: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  features: [String],                                       // e.g., ["Battery Included", "LCD Display"]
  warranty: { type: String, default: '1 year' },            // e.g., "2 Years Onsite"
  category: { type: String, required: true },               // e.g., "Home UPS", "Office UPS"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

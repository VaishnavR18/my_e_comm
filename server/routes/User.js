const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  // ✅ No duplicate emails
  },
  password: {
    type: String,
    required: true  // ✅ Hash before saving
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});


module.exports = mongoose.model('User', userSchema);

// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ⚠️ update your connection string to point to your real DB
mongoose.connect('mongodb+srv://vaishnavtejar18:vaishnav18@cluster0.csmp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log('✅ Connected to DB');

    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String
    });

    const User = mongoose.model('User', UserSchema);

    // hash the password
    const hashedPassword = await bcrypt.hash('vai2004', 10);

    const admin = await User.create({
      name: 'Vaishnav',
      email: 'vaishnavtejar18@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin user added!');
    console.log(admin);
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

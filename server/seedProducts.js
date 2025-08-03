const mongoose = require('mongoose');
const Product = require('./models/Product');
const { products } = require('./data/products.js'); // adjust path if needed

async function seed() {
  await mongoose.connect('mongodb+srv://vaishnavtejar18:vaishnav18@cluster0.csmp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seed();

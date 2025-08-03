import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Clock, RefreshCcw, Zap, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/products';
import '../styles/global.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="pt-16">
      {/* Welcome Text */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center items-center text-center px-4 mt-10 mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-10">
          Welcome to UPS360
        </h1>
      </motion.div>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                Power Up with the Right UPS
              </h1>
              <p className="text-lg mb-8 text-black">
                Find the best UPS for your needs. Install it. Exchange the old. Recycle it responsibly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <button className="btn-gradient">Browse UPS</button>
                </Link>
                <Link to="/ups-recommender">
                  <Button variant="outline" className="text-black border-black">Smart Recommender</Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <img
                  className="rounded-lg shadow-2xl mx-auto animate-float"
                  alt="UPS showcase"
                  src="https://cdn.sketchfab.com/urls/3d-model-render.jpg"
                />
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-purple-600 font-bold text-xl">UPS Experts</div>
                  <div className="text-gray-600">All services in one place</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Our UPS Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make UPS buying and servicing easy and eco-friendly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="h-10 w-10 text-purple-600" />, title: "Smart Recommender", desc: "Get the best UPS based on your power needs." },
              { icon: <Truck className="h-10 w-10 text-purple-600" />, title: "Quick Installation", desc: "Book expert installation service at your home." },
              { icon: <RefreshCcw className="h-10 w-10 text-purple-600" />, title: "Exchange UPS", desc: "Get value for your old UPS and upgrade easily." },
              { icon: <Shield className="h-10 w-10 text-purple-600" />, title: "Safe & Reliable", desc: "We offer tested, branded, and guaranteed UPS systems." },
              { icon: <Lightbulb className="h-10 w-10 text-purple-600" />, title: "Knowledge Hub", desc: "Learn how to maintain and choose UPS wisely." },
              { icon: <Clock className="h-10 w-10 text-purple-600" />, title: "24/7 Support", desc: "We're here to help with every step of your UPS journey." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold">Featured UPS Models</h2>
              <p className="text-gray-600">Explore our top-selling units</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button asChild>
                <Link to="/products" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <div className="card-hover" key={product._id}>
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our UPS Newsletter</h2>
            <p className="text-purple-200 mb-8">Stay updated on new UPS models, recycling rewards, and tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-white text-purple-900 hover:bg-purple-100">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

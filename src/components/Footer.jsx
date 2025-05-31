import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              LuxeMarket
            </span>
            <p className="mt-4 text-gray-400">
              Discover premium products with an immersive shopping experience.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold">Quick Links</span>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold">Categories</span>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://example.com/electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="https://example.com/fashion" className="text-gray-400 hover:text-white transition-colors">
                  Fashion
                </a>
              </li>
              <li>
                <a href="https://example.com/home-living" className="text-gray-400 hover:text-white transition-colors">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="https://example.com/beauty" className="text-gray-400 hover:text-white transition-colors">
                  Beauty
                </a>
              </li>
              <li>
                <a href="https://example.com/accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-lg font-semibold">Contact Us</span>
            <address className="mt-4 not-italic space-y-4 text-gray-400">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span>123 Commerce Street, Shopping District, 10001</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span>support@luxemarket.com</span>
              </div>
            </address>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} LuxeMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

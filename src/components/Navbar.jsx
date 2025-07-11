import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, token, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); // close menu when route changes
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  // build nav links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ name: 'Admin Panel', path: '/admin/products' });
    navLinks.push({ name: 'Orders', path: '/admin/orders' });
  }
  else if (token) {
    navLinks.push({ name: 'My Orders', path: '/my-orders' });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          >
            LuxeMarket
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Login / Cart / Hamburger */}
        <div className="flex items-center space-x-3">
          {token ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-300">Hi, {user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" size="sm">Register</Button>
              </Link>
            </>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {token ? (
                <>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Hi, {user?.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-primary">Login</Link>
                  <Link to="/register" className="hover:text-primary">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

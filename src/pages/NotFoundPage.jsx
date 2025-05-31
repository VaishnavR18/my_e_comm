
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="pt-24 pb-16 flex items-center justify-center min-h-[70vh]">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;

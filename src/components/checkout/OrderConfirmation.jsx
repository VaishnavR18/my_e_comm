import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  // Optional: auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="max-w-md mx-auto text-center py-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-4">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <p className="text-gray-600 mb-6">
        <strong>Order #:</strong> {orderNumber}
      </p>
      <Button onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </motion.div>
  );
};

export default OrderConfirmation;

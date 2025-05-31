import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

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
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <p className="text-gray-600 mb-8">
        Order #: {orderNumber}
      </p>
      <p className="text-gray-600 mb-8">
        You will be redirected to the home page in a few seconds...
      </p>
      <Button onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </motion.div>
  );
};

export default OrderConfirmation;
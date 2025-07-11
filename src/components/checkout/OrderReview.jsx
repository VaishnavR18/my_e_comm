import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../contexts/CartContext';

const OrderReview = ({ formData, handleSubmit, onPrevStep, isSubmitting }) => {
  const { items } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Shipping Information</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.email}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Payment Method</h3>
        <div className="bg-gray-50 p-4 rounded-md flex items-center">
          <Wallet className="h-5 w-5 text-gray-500 mr-2" />
          <span>Cash on Delivery</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Order Items</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <span className="font-medium">{item.quantity}x</span>
                <span className="ml-2">{item.name}</span>
              </div>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="flex items-center"
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </motion.div>
  );
};

export default OrderReview;

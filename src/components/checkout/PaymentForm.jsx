import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const PaymentForm = ({ formData, handleChange, onNextStep, onPrevStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-6">Payment Information</h2>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <CreditCard className="h-6 w-6 text-primary mr-2" />
          <span className="font-medium">Credit Card</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card *
            </label>
            <Input
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep} className="flex items-center">
          Review Order <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default PaymentForm;
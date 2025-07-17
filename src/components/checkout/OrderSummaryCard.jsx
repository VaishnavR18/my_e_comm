import React from 'react';
import { useCart } from '../../contexts/CartContext';

const OrderSummaryCard = () => {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="border-t pt-4 flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;

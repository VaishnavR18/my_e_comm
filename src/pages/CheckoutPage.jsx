import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../components/ui/use-toast';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import ShippingForm from '../components/checkout/ShippingForm';
import OrderReview from '../components/checkout/OrderReview';
import OrderSummaryCard from '../components/checkout/OrderSummaryCard';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import { placeOrder } from '../api/orders';

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate('/products');
    }
  }, [items, orderComplete, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateShippingForm = () => {
    const { firstName, lastName, email, address, city, zipCode } = formData;
    if (!firstName || !lastName || !email || !address || !city || !zipCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateShippingForm()) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token'); // get JWT

      const orderPayload = {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        paymentInfo: {
          method: "Cash on Delivery"
        },
        totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      const data = await placeOrder(orderPayload, token);
      console.log('Order placed:', data);

      toast({ title: 'Success', description: 'Order placed successfully!' });
      setOrderComplete(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (error) {
      toast({ title: 'Error', description: 'Failed to place order', variant: 'destructive' });
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {orderComplete ? (
          <OrderConfirmation />
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <CheckoutSteps currentStep={currentStep} />

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {currentStep === 1 && (
                    <ShippingForm
                      formData={formData}
                      handleChange={handleChange}
                      onNextStep={handleNextStep}
                    />
                  )}
                  {currentStep === 2 && (
                    <OrderReview
                      formData={formData}
                      handleSubmit={handleSubmitOrder}
                      onPrevStep={handlePrevStep}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </div>
              </div>

              <div className="md:w-1/3">
                <OrderSummaryCard />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

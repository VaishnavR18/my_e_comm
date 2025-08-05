import React from 'react';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Review' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm">
        {steps.map((step) => (
          <span
            key={step.id}
            className={currentStep >= step.id ? 'text-primary font-medium' : 'text-gray-500'}>
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;

import React, { useState } from 'react';
import { Calculator, DollarSign, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const ExchangeCalculatorPage = () => {
  const [formData, setFormData] = useState({
    productType: '',
    age: '',
    condition: '',
    bill: null,
    photo: null,
  });
  const [estimatedValue, setEstimatedValue] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateEstimate = (e) => {
    e.preventDefault();

    const baseValues = {
      "UPS - Home": 2500,
      "UPS - Office": 4000,
      "Inverter": 2000,
      "Battery Backup": 1500,
    };

    const conditionMultiplier = {
      Excellent: 0.85,
      Good: 0.7,
      Fair: 0.5,
      Poor: 0.3,
    };

    const { productType, age, condition, bill, photo } = formData;

    if (!bill || !photo) {
      alert("Please upload both original bill and photo of your UPS.");
      return;
    }

    const base = baseValues[productType] || 1000;
    const multiplier = conditionMultiplier[condition] || 0.4;
    const depreciation = Math.min(Number(age) * 0.1, 0.8);

    const estimated = Math.max(0, Math.round(base * multiplier * (1 - depreciation)));
    setEstimatedValue(estimated);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Calculator className="mr-2 h-7 w-7" />
          UPS Exchange Estimator
        </h1>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={calculateEstimate} className="space-y-4">
              {/* UPS Type */}
              <div>
                <label className="block font-medium mb-1">UPS Type</label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2">
                  <option value="">Select UPS type</option>
                  <option value="UPS - Home">UPS - Home</option>
                  <option value="UPS - Office">UPS - Office</option>
                  <option value="Inverter">Inverter</option>
                  <option value="Battery Backup">Battery Backup</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block font-medium mb-1">Age (in years)</label>
                <input
                  type="number"
                  name="age"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"/>
              </div>

              {/* Condition */}
              <div>
                <label className="block font-medium mb-1">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2">
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              {/* Upload Original Bill */}
              <div>
                <label className="block font-medium mb-1">Upload Original Bill (PDF/Image)</label>
                <input
                  type="file"
                  name="bill"
                  accept="application/pdf,image/*"
                  onChange={handleChange}
                  required
                  className="w-full"/>
              </div>

              {/* Upload UPS Photo */}
              <div>
                <label className="block font-medium mb-1">Upload Photo of Your UPS</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="w-full"/>
              </div>

              <Button type="submit" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Calculate Estimate
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Display estimate result */}
        {estimatedValue !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-blue-50 border border-blue-400 text-blue-800 px-4 py-4 rounded-lg text-center text-lg font-semibold">
            <DollarSign className="inline-block mr-1" />
            Estimated UPS Exchange Value: ₹{estimatedValue}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExchangeCalculatorPage;

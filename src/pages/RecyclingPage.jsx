import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Trash2, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const RecyclingPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    condition: '',
    pickupAddress: '',
    name: '',
    mobile: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate photo
    if (!formData.photo) {
      alert("Please upload a photo of your UPS.");
      return;
    }

    // Simulate backend
    console.log("Submitted Recycling Form:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        item: '',
        condition: '',
        pickupAddress: '',
        name: '',
        mobile: '',
        photo: null,
      });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Trash2 className="mr-2 h-7 w-7" /> Recycle Your UPS
        </h1>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-800 px-4 py-6 rounded-lg">
            <CheckCircle className="inline-block mr-2" />
            Your recycling request was submitted successfully!
          </motion.div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. Rahul Sharma"/>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-medium mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. 9876543210"/>
                </div>

                {/* Item (Only UPS/Inverter/Battery options) */}
                <div>
                  <label className="block font-medium mb-1">UPS Type</label>
                  <select
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2">
                    <option value="">Select Type</option>
                    <option value="UPS - Home">UPS - Home</option>
                    <option value="UPS - Office">UPS - Office</option>
                    <option value="Inverter">Inverter</option>
                    <option value="Battery Backup">Battery Backup</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block font-medium mb-1">Condition</label>
                  <input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. Working, Damaged Battery"/>
                </div>

                {/* Pickup Address */}
                <div>
                  <label className="block font-medium mb-1">Pickup Address</label>
                  <textarea
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                    placeholder="Enter your full address for pickup"></textarea>
                </div>

                {/* Upload Photo */}
                <div>
                  <label className="block font-medium mb-1">Upload Photo of UPS</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="w-full"/>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Recycling Request
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecyclingPage;

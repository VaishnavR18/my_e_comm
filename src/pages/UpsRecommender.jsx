import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { motion } from 'framer-motion';

const UpsRecommender = () => {
  const [load, setLoad] = useState('');
  const [backupTime, setBackupTime] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!load || !backupTime || isNaN(load) || isNaN(backupTime)) {
      alert('Please enter valid numbers.');
      return;
    }

    const watts = parseFloat(load);
    const hours = parseFloat(backupTime);
    const wattHours = watts * hours;
    const batteryAh = Math.ceil(wattHours / 12); // Assuming 12V battery

    setResult({ watts, hours, wattHours, batteryAh });
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">UPS Battery Recommender</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <Input
          type="number"
          placeholder="Enter Total Load (in Watts)"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Enter Backup Time Needed (in Hours)"
          value={backupTime}
          onChange={(e) => setBackupTime(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Recommend Battery
        </Button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6 space-y-2">
            <p><strong>Total Power Load:</strong> {result.watts} W</p>
            <p><strong>Backup Time:</strong> {result.hours} Hours</p>
            <p><strong>Total Energy Needed:</strong> {result.wattHours} Wh</p>
            <p><strong>Recommended Battery Size:</strong> {result.batteryAh} Ah (12V)</p>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default UpsRecommender;

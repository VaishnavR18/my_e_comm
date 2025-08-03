import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchMyInstallations, requestInstallation } from '../api/installation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../components/ui/use-toast';

const InstallationPage = () => {
  useAuth();
  const { toast } = useToast();
  const [installations, setInstallations] = useState([]);

  // 🔁 Updated form to include name and phone
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyInstallations(token);
        setInstallations(data);
      } catch (err) {
        console.error('Error loading installations:', err);
      }
    };
    load();
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simple validation for phone
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast({ title: 'Invalid phone number', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    try {
      await requestInstallation(form, token);
      toast({ title: 'Request submitted', description: 'We’ll contact you soon.' });

      setForm({
        name: '',
        phone: '',
        address: '',
        notes: '',
      });

      const updated = await fetchMyInstallations(token);
      setInstallations(updated);
    } catch (err) {
      toast({ title: 'Error', description: 'Could not submit request', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Installation Requests</h1>

      {/* 🔁 Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-2">New Installation Request</h2>

        <Input
          name="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          name="phone"
          placeholder="Mobile number (e.g. 9876543210)"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <Input
          name="address"
          placeholder="Installation address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <Textarea
          name="notes"
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={handleChange}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>

      {/* 🔁 Previous Requests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Previous Requests</h2>
        {installations.length === 0 ? (
          <p className="text-gray-600">No installation requests yet.</p>
        ) : (
          <div className="space-y-4">
            {installations.map((req) => (
              <div key={req._id} className="border p-4 rounded shadow-sm bg-gray-50">
                <p><span className="font-medium">Name:</span> {req.name || 'N/A'}</p>
                <p><span className="font-medium">Phone:</span> {req.phone || 'N/A'}</p>
                <p><span className="font-medium">Address:</span> {req.address}</p>
                <p><span className="font-medium">Status:</span> {req.status}</p>
                <p><span className="font-medium">Date:</span> {new Date(req.createdAt).toLocaleString()}</p>
                {req.notes && <p><span className="font-medium">Notes:</span> {req.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallationPage;

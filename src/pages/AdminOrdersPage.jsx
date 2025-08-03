import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../api/orders';
import { fetchExchangeRequests } from '../api/exchange';
import { fetchInstallationRequests } from '../api/installation'; // ✅ New import

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [exchangeOrders, setExchangeOrders] = useState([]);
  const [installRequests, setInstallRequests] = useState([]); // ✅ New state
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadOrders();
    loadExchange();
    loadInstallations();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const loadExchange = async () => {
    try {
      const data = await fetchExchangeRequests();
      setExchangeOrders(data);
    } catch (err) {
      console.error('Failed to load exchange requests:', err);
    }
  };

  const loadInstallations = async () => {
    try {
      const data = await fetchInstallationRequests(token); // ✅ Call admin API
      setInstallRequests(data);
    } catch (err) {
      console.error('Failed to load installation requests:', err);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, token);
      loadOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center mt-20">📦 Admin Orders Dashboard</h1>

      {/* Normal Orders */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">🛒 Product Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded bg-white shadow">
                <p className="font-semibold">Order ID: {order._id}</p>
                <p>User: {order.user}</p>
                <p>Total: ₹{order.totalPrice}</p>
                <p>Service Type: {order.serviceType || "Product Purchase"}</p>
                <p>Status: 
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="ml-2 border rounded px-2"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </p>
                <div className="mt-2">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Exchange Requests */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">🔁 UPS Exchange Requests</h2>
        {exchangeOrders.length === 0 ? (
          <p>No exchange requests submitted.</p>
        ) : (
          <div className="space-y-4">
            {exchangeOrders.map((ex, idx) => (
              <div key={idx} className="border p-4 rounded bg-yellow-50">
                <p><strong>Name:</strong> {ex.name}</p>
                <p><strong>Email:</strong> {ex.email}</p>
                <p><strong>Phone:</strong> {ex.phone}</p>
                <p><strong>Old UPS Model:</strong> {ex.oldUpsModel}</p>
                <p><strong>Condition:</strong> {ex.condition}</p>
                <p><strong>Estimated Value:</strong> ₹{ex.estimatedValue || "Pending"}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Installation Requests */}
      <section>
        <h2 className="text-xl font-semibold mb-4">🛠 Installation Requests</h2>
        {installRequests.length === 0 ? (
          <p>No installation requests submitted.</p>
        ) : (
          <div className="space-y-4">
            {installRequests.map((req, idx) => (
              <div key={idx} className="border p-4 rounded bg-green-50 shadow">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.phone}</p>
                <p><strong>Address:</strong> {req.address}</p>
                <p><strong>Preferred Date:</strong> {req.preferredDate}</p>
                <p><strong>Installation Type:</strong> {req.installationType}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminOrdersPage;

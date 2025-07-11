import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../api/orders';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  const load = async () => {
    const data = await fetchAllOrders();
    setOrders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, token);
      load();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Orders (Admin)</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>User: {order.user}</p>
              <p>Total: ${order.totalPrice}</p>
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
    </div>
  );
};

export default AdminOrdersPage;

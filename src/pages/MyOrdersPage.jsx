import React, { useEffect, useState } from 'react';
import { fetchMyOrders } from '../api/orders';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const load = async () => {
      const data = await fetchMyOrders(token);
      setOrders(data);
    };
    load();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.totalPrice}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
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

export default MyOrdersPage;

const API_BASE_URL = 'http://localhost:5000/api';

// Place a new order
export const placeOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE_URL}/orders/place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to place order');
    return await res.json();
  } catch (err) {
    console.error('placeOrder error:', err);
    throw err;
  }
};

// Fetch all orders (admin only)
export const fetchAllOrders = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  } catch (err) {
    console.error('fetchAllOrders error:', err);
    throw err;
  }
};

// Update order status (admin)
export const updateOrderStatus = async (orderId, status) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return await res.json();
  } catch (err) {
    console.error('updateOrderStatus error:', err);
    throw err;
  }
};

// Fetch logged-in user's own orders
export const fetchMyOrders = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE_URL}/orders/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch your orders');
    return await res.json();
  } catch (err) {
    console.error('fetchMyOrders error:', err);
    throw err;
  }
};

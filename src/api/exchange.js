import axios from 'axios';

const API = 'http://localhost:5000/api';

export const fetchExchangeRequests = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API}/exchange`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

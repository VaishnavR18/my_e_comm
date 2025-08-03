import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update if deployed elsewhere

// 🧾 Fetch installation requests for the logged-in user
export const fetchMyInstallations = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/installations/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 📝 Submit a new installation request
export const requestInstallation = async (form, token) => {
  const res = await axios.post(`${API_BASE_URL}/installations/request`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Admin: Fetch all installation requests
export const fetchInstallationRequests = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/installations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

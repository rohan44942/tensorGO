import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/feedback';

export const submitFeedback = async (feedback) => {
  const token = localStorage.getItem('authToken');
  const response = await axios.post(`http://localhost:5000/api/feedback/submit`, feedback, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const retrieveFeedback = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${API_BASE}/retrieve`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

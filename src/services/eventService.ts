import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

// Fetch all events
export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// Create a new event
export const createEvent = async (eventData: any) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

import axios from 'axios';
import { getToken } from '../context/AuthContext';

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://wxkvfjjh-3000.inc1.devtunnels.ms/api",
  headers: { 'Content-Type': 'application/json' }
});

// Add token to every request
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Unauthorized - clear local storage and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const loginUser = (role, credentials) => {
  return api.post(`/user/${role}/login`, credentials);
};

export const registerUser = (role, userData) => {
  return api.post(`/user/${role}/register`, userData);
};

export default api;
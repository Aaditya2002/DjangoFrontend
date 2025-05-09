import axios from 'axios';

const API_URL = 'https://djangobackend-d2fx.onrender.com/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
}; 
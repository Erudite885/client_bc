// src/api/auth.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Other authentication-related API calls follow the same pattern

export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, { token });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Email verification failed");
  }
};

export const resendVerificationEmail = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resend-verification`, { token });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Email verification failed");
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Forgot password request failed");
  }
};
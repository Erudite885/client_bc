// src/api/users.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/profile`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/profile`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

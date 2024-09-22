// src/api/users.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

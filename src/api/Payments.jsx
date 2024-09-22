// src/api/payments.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createPayment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/payments`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await axios.get(`${API_URL}/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed");
  }
};

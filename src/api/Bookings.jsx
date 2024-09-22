// src/api/bookings.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createBooking = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Booking failed");
  }
};

export const getBookings = () => axios.get(`${API_URL}/bookings`);
export const getBookingDetails = (id) => axios.get(`${API_URL}/bookings/${id}`);
export const updateBooking = (id, data) => axios.put(`${API_URL}/bookings/${id}`, data);
export const deleteBooking = (id) => axios.delete(`${API_URL}/bookings/${id}`);

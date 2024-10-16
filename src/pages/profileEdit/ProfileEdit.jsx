// src/pages/ProfileEdit.js
import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import { FaUserEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export const ProfileEdit = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    fullName: "",
    country: "",
    city: "",
    phone: "",
    profileImage: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({
        username: currentUser.username,
        email: currentUser.email,
        fullName: currentUser.fullName || "",
        country: currentUser.country || "",
        city: currentUser.city || "",
        phone: currentUser.phone || "",
        profileImage: currentUser.profileImage || "",
      });
      setProfileImagePreview(currentUser.profileImage || "");
    } else {
      setError("You are not authenticated!");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "profileImage") {
      setProfileImagePreview(value);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const imageUrl = await uploadToCloudinary(file);
      setUser((prev) => ({ ...prev, profileImage: imageUrl }));
      setProfileImagePreview(imageUrl);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.error("Image Upload Error:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("accessToken");

    if (!currentUser || !token) {
      setError("You are not authenticated!");
      setLoading(false);
      return;
    }

    const updatedData = {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      country: user.country,
      city: user.city,
      phone: user.phone,
      profileImage: user.profileImage,
    };

    try {
      const res = await newRequest.put(`/users/${currentUser._id}`, updatedData);

      setLoading(false);
      setSuccess("Profile updated successfully");

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setProfileImagePreview(res.data.profileImage || "");
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      console.error("Update Error:", err);
      setError(err.response?.data || "Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <FaUserEdit className="text-gray-500 text-3xl" />
            </div>
          )}

          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="profileImageUpload"
              className="hidden"
            />
            <label
              htmlFor="profileImageUpload"
              className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ImUpload className="mr-2" /> {uploading ? "Uploading..." : "Change Photo"}
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={handleInputChange}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Country and City */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={user.country}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={user.city}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              pattern="^\+?[1-9]\d{1,14}$"
              title="Please enter a valid phone number."
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Details"}
            </button>
          </div>

          {/* Success and Error Messages */}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

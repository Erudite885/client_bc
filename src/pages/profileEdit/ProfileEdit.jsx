// src/pages/ProfileEdit.js
import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import uploadToCloudinary from "../../utils/uploadToCloudinary"; // Ensure this utility is correctly implemented
import { FaUserEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im"; // Optional: For better UI
import "./ProfileEdit.scss"; // Ensure corresponding SCSS/CSS exists

export const ProfileEdit = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: "", // Changed from profileImageUrl
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // For image upload state
  const [profileImagePreview, setProfileImagePreview] = useState("");

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({
        username: currentUser.username, // Ensure correct access
        email: currentUser.email,
        profileImage: currentUser.profileImage || "",
      });
      setProfileImagePreview(currentUser.profileImage || "");
    }
  }, []);

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      setError("You are not authenticated!");
      setLoading(false);
      return;
    }

    const updatedData = {
      username: user.username,
      email: user.email,
      profileImage: user.profileImage, // Ensure this matches backend expectation
    };

    try {
      console.log("Sending updated data:", updatedData); // Debugging
      const res = await newRequest.put(`/users/${currentUser._id}`, updatedData); // Removed headers

      // Handle success
      setLoading(false);
      setSuccess("Profile updated successfully");

      // Update localStorage with new user data
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setProfileImagePreview(res.data.profileImage || "");
    } catch (err) {
      setLoading(false);
      console.error("Update Error:", err); // Debugging
      setError(err.response?.data || "Failed to update profile. Please try again.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // If updating profile image, update the preview
    if (name === "profileImage") {
      setProfileImagePreview(value);
    }
  };

  // Handle Image Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Validate file type and size
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
      console.error("Image Upload Error:", error); // Debugging
      setError("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-card">
        <h2 className="title">
          <FaUserEdit /> Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <div className="image-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="profileImageUpload"
                className="file-input"
              />
              <label htmlFor="profileImageUpload" className="upload-button">
                <ImUpload /> {uploading ? "Uploading..." : "Upload Image"}
              </label>
            </div>
            {profileImagePreview && (
              <div className="form-group image-preview">
                <label>Profile Image Preview:</label>
                <img src={profileImagePreview} alt="Profile Preview" className="preview-img" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

// export default ProfileEdit;

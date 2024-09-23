// src/utils/uploadToCloudinary.js
import axios from "axios";

const uploadToCloudinary = async (file) => {
  const cloudName = "dcanlnwpu"; // Replace with your Cloudinary cloud name
  const unsignedUploadPreset = "brandimage"; // Replace with your upload preset

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);

  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export default uploadToCloudinary;

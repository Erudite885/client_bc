import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "s13nr33r");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dxdbrn0pc/image/upload", data, {
  // Remove withCredentials if it's not needed
  withCredentials: false,
});

    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    if (err.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Response error:", err.response.data);
    } else if (err.request) {
      // The request was made, but no response was received
      console.log("Request error:", err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", err.message);
    }
    console.log("Error config:", err.config);
  
  }
};

export default upload;

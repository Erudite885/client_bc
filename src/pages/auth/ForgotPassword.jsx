// src/pages/Auth/ForgotPassword.js
import React, { useState } from "react";
import { Button } from "../../components/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-midLightBlue">
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Your Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword
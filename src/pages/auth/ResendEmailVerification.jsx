// src/components/ResendEmailVerification.js

import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import { Button } from "../../components/Button/Button";

const ResendEmailVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await newRequest.post("/auth/resend-verification", { email });
      setMessage("A new verification email has been sent to your email address.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Resend Verification Email</h2>
        <p className="text-lg mb-4">Enter your email address to resend the verification email.</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />
        <Button variant="primary" onClick={handleResend} disabled={loading}>
          {loading ? "Sending..." : "Resend Verification Email"}
        </Button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResendEmailVerification;

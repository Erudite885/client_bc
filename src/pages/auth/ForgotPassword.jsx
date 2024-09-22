import React, { useState } from "react";
import newRequest from "../../utils/newRequest"; // Axios instance
import { Button } from "../../components/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await newRequest.post("/auth/forgot-password", { email });
      setMessage("If an account with that email exists, a reset link has been sent.");
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.error || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <p className="text-lg mb-4">Enter your email address to reset your password.</p>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4"
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </Button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

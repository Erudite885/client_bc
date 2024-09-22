// src/components/ResetPassword/ResetPassword.js

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { Button } from "../../components/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using react-icons for visibility toggle icons

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setTokenValid(true);
    } else {
      setError("Invalid or missing reset token.");
    }
  }, [searchParams]);

  // Password strength validation function
  const validatePasswordStrength = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Validate password strength
    if (!validatePasswordStrength(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await newRequest.post(`/auth/reset-password?token=${token}`, { password, confirmPassword });
      setMessage("Password has been reset successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {tokenValid && !message && (
          <>
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              {/* New Password Field */}
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 pr-10"
                  required
                />
                {/* Toggle Password Visibility */}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Confirm New Password Field */}
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 pr-10"
                  required
                />
                {/* Toggle Confirm Password Visibility */}
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

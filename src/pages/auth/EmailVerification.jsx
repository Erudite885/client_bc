// src/components/EmailVerification.js

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const EmailVerification = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      const verifyUserEmail = async () => {
        try {
          await newRequest.get(`/auth/verify-email?token=${token}`);
          setMessage("Email verified successfully! Redirecting to login...");

          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } catch (error) {
          setError(
            error.response?.data?.error || "Email verification failed. The link may have expired or is invalid."
          );
        } finally {
          setIsVerifying(false);
        }
      };
      verifyUserEmail();
    } else {
      setError("Invalid or missing verification token.");
      setIsVerifying(false);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {isVerifying ? (
          <p className="text-gray-500 mb-4">Verifying your email, please wait...</p>
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;

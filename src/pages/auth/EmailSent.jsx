// src/components/EmailSent.js

import React from "react";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const EmailSent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <p className="text-lg mb-4">
          A verification link has been sent to your email address. Please check your inbox.
        </p>
        <Button variant="primary" onClick={() => navigate("/resend-verification")}>
          Resend Verification Email
        </Button>
      </div>
    </div>
  );
};

export default EmailSent;

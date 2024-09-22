import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest"; // Using the axios instance for requests
import { Button } from "../../components/Button/Button";

const EmailVerification = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true); // Show a verifying message initially
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    // Only verify if there is a token in the URL
    if (token) {
      const verifyUserEmail = async () => {
        try {
          // Send a request to the backend to verify the email with the token
          await newRequest.get(`/auth/verify?token=${token}`);
          setMessage("Email verified successfully! Redirecting to login...");
          setError(""); // Clear any previous errors

          // Redirect to login after a few seconds
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } catch (err) {
          setError("Email verification failed. The link may have expired or is invalid.");
          setMessage(""); // Clear any success messages
        } finally {
          setIsVerifying(false); // Stop showing the verifying message
        }
      };

      // Call the verification function
      verifyUserEmail();
    } else {
      // If no token is present, do not show an error until the user clicks the link
      setIsVerifying(false);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {isVerifying ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8 text-center">
          <p className="text-gray-500 mb-4">Verifying your email, please wait...</p>
        </div>
      ) : (
        <>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8 text-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}
          </div>
        </>
      )}
      {!isVerifying && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
            <p className="text-lg mb-4">
              A verification link has been sent to your email address. Please check your inbox.
            </p>
            {/* Optional: Add a button to resend verification email */}
            <Button variant="primary" onClick={() => navigate("/resend-verification")}>
              Resend Verification Email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;

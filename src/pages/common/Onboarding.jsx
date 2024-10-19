import React from "react";
import newRequest from "../../utils/newRequest"; // Axios or similar utility for API calls
import { useNavigate } from "react-router-dom";

import brandlogo from "../../assets/brandlogo.svg";
import onboardingImg from "../../assets/images.jpeg";

export const Onboarding = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleCompleteOnboarding = async () => {
    try {
      // Call the backend to update isFirstTimeLogin to false
      await newRequest.put(`/users/${currentUser._id}/onboarding-complete`);

      // Update localStorage to reflect that onboarding is complete
      currentUser.isFirstTimeLogin = false;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // Navigate to the dashboard
      navigate("/edit-profile");
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-midLightBlue flex items-center justify-center">
      <div className="bg-[#a5b6ff] rounded-2xl shadow-xl p-10 max-w-3xl w-full">
        {/* App Logo or Illustration */}
        <div className="flex justify-center mb-8">
          <img src={brandlogo} alt="App Logo" className="h-20 w-2/5" />
        </div>

        {/* Welcome Message */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Welcome <span className="capitalize">{currentUser.username}</span>!
        </h1>

        {/* Introduction */}
        <p className="text-center text-gray-600 ">We're thrilled to have you here!</p>
        <p className="text-center text-gray-600 mb-10">
          {/* <span className="font-semibold">BrandCollaborator</span> is designed to help you streamline your tasks and
                  boost productivity. */}
          Let's get you started on your journey to success.
        </p>

        {/* Illustration or Image */}
        {/* <div className="flex justify-center mb-10">
          <img src={onboardingImg} alt="Welcome Illustration" className="h-56 w-auto" />
        </div> */}

        {/* Call to Action */}
        {/* <div className="text-center mb-10">
          <p className="text-lg text-gray-700">
            Ready to explore? Click the button below to access your personalized dashboard.
          </p>
        </div> */}

        {/* Complete Onboarding Button */}
        <div className="text-center">
          <button
            onClick={handleCompleteOnboarding}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out"
          >
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import newRequest from "../../utils/newRequest"; // Axios or similar utility for API calls
import { useNavigate } from "react-router-dom";

export const Onboarding = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleCompleteOnboarding = async () => {

    try {
      // Call the backend to update isFirstTimeLogin to false
      const res = await newRequest.put(`/users/${currentUser._id}/onboarding-complete`);

      // Update localStorage to reflect that onboarding is complete
      currentUser.isFirstTimeLogin = false;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // Navigate to the dashboard or home page
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
    }
  };

  return (
    <div>
      <h2>Onboarding</h2>
      <p>Welcome {currentUser.username}! Let's complete your account setup.</p>
      {/* Your onboarding steps here */}
      <button onClick={handleCompleteOnboarding}>Complete Onboarding</button>
    </div>
  );
};

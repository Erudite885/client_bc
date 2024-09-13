import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const GetStarted = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    navigate(`/register?role=${userType}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-4xl font-bold mb-10">Get Started</h2>
      <div className="space-y-6">
        <Button onClick={() => handleUserTypeSelection("brand")} variant="primary" className="w-64">
          I'm a Brand
        </Button>
        <Button onClick={() => handleUserTypeSelection("freelancer")} variant="primary" className="w-64">
          I'm a Freelancer
        </Button>
        <Button onClick={() => handleUserTypeSelection("influencer")} variant="primary" className="w-64">
          I'm an Influencer
        </Button>
      </div>
    </div>
  );
};

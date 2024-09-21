import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const GetStarted = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    navigate(`/register?role=${userType}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white via-midLightBlue py-16 px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Get Started</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img
            src="https://via.placeholder.com/400x300" // Replace with a real image
            alt="Join as Brand"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Join as a Brand</h3>
            <p className="text-gray-600 mb-6 text-center">Find the perfect content creator <br/> or freelancer for your projects.</p>
            <Button onClick={() => handleUserTypeSelection("brand")} variant="primary" className="w-full py-2">
              Get Started as Brand
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img
            src="https://via.placeholder.com/400x300" // Replace with a real image
            alt="Join as Influencer"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Join as a Content Creator</h3>
            <p className="text-gray-600 mb-6 text-center">
              Partner with brands and <br /> showcase your creative influence.
            </p>
            <Button onClick={() => handleUserTypeSelection("influencer")} variant="primary" className="w-full py-2">
              Get Started as Content Creator
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img
            src="https://via.placeholder.com/400x300" // Replace with a real image
            alt="Join as Freelancer"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Join as a Freelancer</h3>
            <p className="text-gray-600 mb-6 text-center">Showcase your skills and <br/>work with exciting brands.</p>
            <Button onClick={() => handleUserTypeSelection("freelancer")} variant="primary" className="w-full py-2">
              Get Started as Freelancer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

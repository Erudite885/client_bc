import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import in3 from "../../assets/in12.jpg";
import in2 from "../../assets/in7.jpg";
import in1 from "../../assets/in5.jpg";

const headings = [
  "Join the Journey",
  "Begin Your Adventure",
  "Unlock Your Potential",
  "Step Into Success",
  "Launch Your Career",
  "Discover New Opportunities",
  "Create, Connect, Succeed",
];

export const GetStarted = () => {
  const navigate = useNavigate();
  const [currentHeading, setCurrentHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prevIndex) => (prevIndex === headings.length - 1 ? 0 : prevIndex + 1));
    }, 12000); // Change heading every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleUserTypeSelection = (userType) => {
    navigate(`/register?role=${userType}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white via-midLightBlue py-16 px-4">
      {/* Text Carousel with Glassmorphism effect */}
      <div className="flex items-center justify-center py-8 px-6 mb-8 bg-white bg-opacity-10 backdrop-blur-lg backdrop-opacity-80 rounded-xl shadow-lg border border-white/40">
        <h1 className="text-4xl font-bold text-gray-800 text-center transition-all duration-500 ease-in-out">
          {headings[currentHeading]}
        </h1>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img
            src={in3} // Replace with a real image
            alt="Join as Brand"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Join as a Brand</h3>
            <p className="text-gray-600 mb-6 text-center">
              Find the perfect content creator <br /> or freelancer for your projects.
            </p>
            <Button onClick={() => handleUserTypeSelection("brand")} variant="primary" className="w-full py-2">
              Get Started as Brand
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img
            src={in2} // Replace with a real image
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
            src={in1} // Replace with a real image
            alt="Join as Freelancer"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Join as a Freelancer</h3>
            <p className="text-gray-600 mb-6 text-center">
              Showcase your skills and <br />
              work with exciting brands.
            </p>
            <Button onClick={() => handleUserTypeSelection("freelancer")} variant="primary" className="w-full py-2">
              Get Started as Freelancer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

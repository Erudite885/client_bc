// src/components/Featured.jsx
import React, { useState, useEffect } from "react";
import hero2 from "../../assets/hero2.jpg"; // Ensure the path is correct

function Featured() {
  const words = [
    "Collaborators",
    "Freelancers",
    "Talent",
    "Content Creators",
    "Professionals",
    "Influencers",
    "Experts",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setFade(false), 5000); // Start fade out before word change
    const fadeIn = setTimeout(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex === words.length - 1 ? 0 : prevIndex + 1));
      setFade(true);
    }, 6000); // Total duration matches the interval

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(fadeIn);
    };
  }, [currentWordIndex, words.length]);

  return (
    <section className="featured min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-midLightBlue to-white px-6 md:px-24">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center">
        {/* Left Section */}
        <div className="left w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
          <h1 className="uppercase text-sm font-semibold text-gray-800">
            <span className="">Connect with</span> <br />
            <span
              className={`relative inline-block transition-all duration-500 ${
                fade ? "opacity-100 translate-y-0" : "opacity-20 translate-y-2"
              }`}
            >
              <span className="bg-gradient-to-r from-green-700 via-blue-500 to-orange-400 bg-clip-text text-transparent animate-gradient bg-200% text-4xl">
                Top {words[currentWordIndex]}
              </span>
            </span>{" "}
            <br />
            for Your Business
          </h1>
          <p className="mt-4 text-gray-600">
            Discover and collaborate with a diverse range of professionals including designers, marketers, developers,
            and more to elevate your brand.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/get-started"
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition duration-200 text-center"
            >
              Get Started
            </a>
            <a
              href="/gigs"
              className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-200 text-center"
            >
              Browse Collaborators
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-1/2 flex justify-center">
          <img
            src={hero2}
            alt="Collaborators working together"
            className="w-full max-w-md rounded-lg shadow-lg object-cover transform transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Featured;

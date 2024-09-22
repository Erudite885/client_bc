import React, { useEffect, useState } from "react";
import "./Home.scss";
import image2 from "../../assets/cta.jpg";
import { Button } from "../../components/Button/Button";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import hero1 from "../../assets/hero1.jpg";
import hero3 from "../../assets/hero3.jpg";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { projects } from "../../data";

function Home() {
  const [slidesToShow, setSlidesToShow] = useState(4);

  // This effect listens for window resizing and adjusts the number of slides to show
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setSlidesToShow(1); // Show 1 slide on mobile devices (less than 768px)
      } else if (width >= 768 && width < 1440) {
        setSlidesToShow(3); // Show 2 slides on medium-sized devices (768px to 1439px)
      } else {
        setSlidesToShow(4); // Show 4 slides on larger screens
      }
    };

    // Set the initial value on page load
    handleResize();

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      <Featured />
      <div className="py-12 px-28">
        <h2 className="font-bold text-2xl">Top Content Creators</h2>
        <Slide slidesToShow={slidesToShow} arrowsScroll={4}>
          {projects.map((card) => (
            <ProjectCard key={card.id} card={card} />
          ))}
        </Slide>
      </div>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>Find the right creator to begin working on your project within minutes.</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
          </div>
          <div className="item">
            <img src={hero1} alt="inflencer image" />
          </div>
        </div>
      </div>

      <div className="explore">
        <div className="container">
          <h1 className="font-bold text-2xl">Explore the marketplace</h1>
          <div className="items">
            <Link to="/gigs?cat=design">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Graphics & Design</span>
              </div>
            </Link>
            <Link to="/gigs?cat=animation">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Video & Animation</span>
              </div>
            </Link>
            <Link to="/gigs?cat=music">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Music & Audio</span>
              </div>
            </Link>
            <Link to="/gigs?cat=web">
              <div className="item">
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                  alt=""
                />
                <div className="line"></div>
                <span>Programming & Tech</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>Upgrade to a curated experience packed with tools and benefits, dedicated to Brands</p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to creators with proven experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <Link to="/get-started">
              <button>Get Started</button>
            </Link>
          </div>
          <div className="item">
            <img src={hero3} alt="" />
          </div>
        </div>
      </div>

      <div className="bg-white text-center md:py-16 md:px-8 flex flex-col-reverse md:flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-2">Create, Connect, and Collaborate!</h2>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Sign Up to Discover Opportunities!
          </h1>
          <p className="mt-4 text-lg text-gray-500">Unlock Your Full Potential!</p>
          <div className="mt-8">
            <Button onClick={() => handleUserTypeSelection("influencer")} className="py-4 px-16 text-lg">
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center space-x-4">
            <img
              src={image2}
              alt="Model 2"
              // className="h-32 sm:h-48 md:h-64 lg:h-72"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

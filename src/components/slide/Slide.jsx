import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({ children, slidesToShow }) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider
          slidesToShow={slidesToShow}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={true} // Enable arrows for manual navigation if needed
          dots={true} // Enable dots for better navigation visibility
          wheel={false} // Keep wheel behavior disabled (or enable if desired)
          pauseOnHover={false} // Ensures autoplay does not stop when hovering over slides
          infinite={true} // Ensures continuous scrolling
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;

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
          arrows={false}
          dots={false}
          wheel={false}
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;

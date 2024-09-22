import React from "react";
import  hero2 from "../../assets/hero2.jpg";
import "./Featured.scss";

function Featured() {

  return (
    <div className="featured bg-gradient-to-r from-white via-midLightBlue px-24">
      <div className="container">
        <div className="left text-center lg:text-left">
          <h1>
            Find the perfect <br /><span>Content Creator</span>
           <br/> for your business
          </h1>
        </div>
        <div className="right">
          <img src={hero2} alt="influencer image" />
        </div>
      </div>
    </div>
  );
}

export default Featured;

import React from "react";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides for desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear", // CSS easing for smooth transitions
    responsive: [
      {
        breakpoint: 1024, // Tablet and smaller
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile and smaller
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    {
      id: 1,
      type: "image",
      name: "medipatch",
      mediaUrl: "https://via.placeholder.com/150",
      text: "I am someone who has suffered from knee pain",
    },
    {
      id: 2,
      type: "image",
      name: "horadiol",
      mediaUrl: "https://via.placeholder.com/150",
      text: "It releases your skin and does the job!",
    },
    {
      id: 3,
      type: "youtube",
      name: "sttokeofficial",
      mediaUrl:
        "https://www.youtube.com/embed/yfCKf0nAWj8?autoplay=1&mute=1&loop=1&playlist=yfCKf0nAWj8&modestbranding=1&showinfo=0&rel=0&controls=0", // YouTube embed link
      text: "Ergonomically designed for an effortless grip experience",
    },
    {
      id: 4,
      type: "image",
      name: "azio.beauty",
      mediaUrl: "https://via.placeholder.com/150",
      text: "How many anti-aging creams I have tried in my lifetime...",
    },
    {
      id: 5,
      type: "video",
      name: "alluringminerals",
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      text: "Cause my skin to break out...",
    },
    {
      id: 6,
      type: "youtube",
      name: "alluringminerals",
      mediaUrl:
        "https://www.youtube.com/embed/4lRKp_4MdUU?autoplay=1&mute=1&loop=1&playlist=&modestbranding=1&showinfo=0&rel=0&controls=0", // YouTube embed link
      text: "Cause my skin to break out...",
    },
    {
      id: 7,
      type: "youtube",
      name: "alluringminerals",
      mediaUrl:
        "https://www.youtube.com/embed/Awo2UD_-GNQ?autoplay=1&mute=1&loop=1&modestbranding=1&showinfo=0&rel=0&controls=0", // YouTube embed link
      text: "Cause my skin to break out...",
    },
    {
      id: 8,
      type: "youtube",
      name: "alluringminerals",
      mediaUrl:
        "https://www.youtube.com/embed/arxOuJqFaLI?autoplay=1&mute=1&loop=1&modestbranding=1&showinfo=0&rel=0&controls=0", // YouTube embed link
      text: "Cause my skin to break out...",
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-bold mb-6">Top Content Creators</h2>
      <Slider {...settings} className="carousel">
        {items.map((item) => (
          <div key={item.id} className="p-2">
            <div className="border rounded-lg shadow-lg overflow-hidden">
              {item.type === "image" ? (
                <img src={item.mediaUrl} alt={item.name} className="w-full h-48 object-cover" />
              ) : item.type === "youtube" ? (
                <iframe
                  src={item.mediaUrl}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-48 object-cover"
                />
              ) : (
                <video src={item.mediaUrl} autoPlay loop muted playsInline className="w-full h-48 object-cover" />
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

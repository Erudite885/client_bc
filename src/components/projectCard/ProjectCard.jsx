import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      {/* Embedding YouTube Short using iframe */}
      <iframe
        width="100%"
        height="auto"
        src={`https://www.youtube.com/embed/${card.videoId}?autoplay=1&mute=1&loop=1&playlist=${card.videoId}`}
        title="YouTube video player"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="projectVideo"
      ></iframe>
      {/* <div className="info">
        <div className="texts">
          <span>{card.username}</span>
        </div>
      </div> */}
    </div>
  );
}

export default ProjectCard;

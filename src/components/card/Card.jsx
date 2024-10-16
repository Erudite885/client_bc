// src/components/Common/Card.js
import React from "react";

const Card = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`flex items-center p-6 rounded-lg shadow-md ${bgColor}`}>
      <div className="p-3 bg-white rounded-full">{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Card;

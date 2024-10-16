import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md hidden md:block">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
        <ul className="mt-6">
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
              Overview
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
              Users
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
              Bookings
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-indigo-500 font-medium">
              Payments
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

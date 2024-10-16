import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-700">Dashboard</div>
        <div className="flex items-center">
          <button className="md:hidden block text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

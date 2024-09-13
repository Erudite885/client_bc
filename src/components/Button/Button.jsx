// src/components/Button/Button.js
import React from "react";
import { motion } from "framer-motion";

export const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseClasses = "px-6 py-2 rounded-md font-bold transition-all duration-300 focus:outline-none";

  const variants = {
    primary: `bg-[#172D3B] text-white hover:bg-blue-200 hover:text-[#172D3B] ${baseClasses}`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 ${baseClasses}`,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

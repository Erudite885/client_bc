// src/pages/Common/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { motion } from "framer-motion";

export function NotFound() {
  return (
    <motion.div
      className="min-h-screen bg-white text-black flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">Go Back Home</Button>
      </Link>
    </motion.div>
  );
};

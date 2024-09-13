// src/pages/Common/Support.js
import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { motion } from "framer-motion";
import axios from "axios";

import support from "../../assets/support.png";

export function Support (){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/support", formData);
      setStatus("Support ticket submitted successfully.");
    } catch (error) {
      setStatus("Failed to submit ticket.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container m-auto px-4 md:px-6 pt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] px-6 ">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold mb-6">Support</h1>
              <p className="text-sm md:text-lg mb-6">
                Need help? Submit a support ticket and our team will get back to you as soon as possible.
              </p>
            </div>
            <form className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Issue</label>
                <textarea
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="5"
                ></textarea>
              </div>
              <Button variant="primary" type="submit">
                Submit Ticket
              </Button>
            </form>
            {status && <p className="mt-4 text-green-500">{status}</p>}
          </div>
          <div>
            <img
              src={support}
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto overflow-hidden hidden md:flex rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};


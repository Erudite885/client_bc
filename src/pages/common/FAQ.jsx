import React, { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "../../constants/data";
import { Link } from "react-router-dom";

export const FAQ = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndices((prevOpenIndices) =>
      prevOpenIndices.includes(index) ? prevOpenIndices.filter((i) => i !== index) : [...prevOpenIndices, index]
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Welcome to the Brand Collaborator Help/FAQ section! Here you'll find answers to common questions about our
              platform. If you need further assistance, feel free to contact us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-black">{faq.question}</span>

                  <svg
                    className={`w-6 h-6 text-gray-400 transform ${openIndices.includes(index) ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`px-4 pb-5 sm:px-6 sm:pb-6 ${openIndices.includes(index) ? "block" : "hidden"}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            Didn’t find the answer you are looking for?{" "}
            <Link
              to="/contact"
              title=""
              className="font-medium text-blue-500 transition-all duration-200 hover:text-blue-600 focus:text-blue-600 hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

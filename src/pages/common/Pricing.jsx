// src/components/Pricing.jsx
import React from "react";
import { FaUserPlus, FaHandshake } from "react-icons/fa"; // Example icons
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pricing</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Transparent and Fair Pricing for Freelancers and Content Creators
          </p>
        </div>

        {/* Main Pricing Sections */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Freelancer Registration */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <FaUserPlus className="text-blue-600 text-3xl mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">Freelancer </h3>
            </div>
            <ul className="mb-6 space-y-2">
              <li className="text-gray-700">
                <span className="font-bold">Service Charge:</span>{" "}
                <span className="text-green-600">20% Commission</span>
              </li>
              <li className="text-gray-700">
                <span className="font-bold">Global Equivalence:</span> Adjusted based on current exchange rates
              </li>
            </ul>
            <Link to="/register?role=freelancer">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                Register Now
              </button>
            </Link>
          </div>

          {/* Content Creator Booking */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <FaHandshake className="text-blue-600 text-3xl mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">Content Creator </h3>
            </div>
            <ul className="mb-6 space-y-2">
              <li className="text-gray-700">
                <span className="font-bold">One-Time Fee:</span> <span className="text-green-600">N5000</span> (~$10-$15
                USD)
              </li>
              <li className="text-gray-700">
                <span className="font-bold">Service Charge:</span>{" "}
                <span className="text-green-600">20% Commission</span>
              </li>
              <li className="text-gray-700">
                <span className="font-bold">Details:</span> Applies to total service fees
                {/* (e.g., video creation, post collaboration, live sessions) */}
              </li>
            </ul>
            <Link to="/register?role=influencer">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                Register Now
              </button>
            </Link>
          </div>
        </div>

        {/* Summary of Fees */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Summary of Fees</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                    Fee Type
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">
                    Activation Fee <small>(content creator only)</small>{" "}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">N5000 (or equivalent in other currencies)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">Commission to platform</td>
                  <td className="py-2 px-4 border-b border-gray-200">20% of total service fee</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">Payout</td>
                  <td className="py-2 px-4 border-b border-gray-200">80% of total service fee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Additional Details</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-bold">Payment Processing:</span> Secure transactions through the Brand Collaborator
              platform
            </li>
            <li>
              <span className="font-bold">Payouts to Creators:</span> Net payment after 20% commission deduction
            </li>
            <li>
              <span className="font-bold">Currency Conversion:</span> Handled by the payment processor at the current
              exchange rate during the transaction
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

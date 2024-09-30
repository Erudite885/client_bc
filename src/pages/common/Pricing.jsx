// src/components/Pricing.jsx
import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 mt-16">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 max-w-4xl w-full">
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-gray-800 mb-6 text-center">
          Brand Collaborator Pricing Structure
        </h1>

        {/* Freelancer Registration Fee */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading text-blue-600 mb-4">
            1. Freelancer Registration Fee
          </h2>
          <ul className="list-disc list-inside space-y-2 font-body text-gray-700 text-base sm:text-lg">
            <li>
              <span className="font-semibold">One-Time Fee:</span> Freelancers will pay a one-time registration fee of
              N5000 (approximately $10-$15 USD depending on current exchange rates).
            </li>
            <li>
              <span className="font-semibold">Global Equivalence:</span> The fee will be equivalent to N5000 for users
              worldwide, adjusted for currency exchange rates to ensure consistency.
            </li>
          </ul>
        </section>

        {/* Content Creator Booking Fee */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading text-blue-600 mb-4">
            2. Content Creator Booking Fee
          </h2>
          <ul className="list-disc list-inside space-y-2 font-body text-gray-700 text-base sm:text-lg">
            <li>
              <span className="font-semibold">Service Charge:</span> A 20% commission will be charged on each booking
              made through the platform for content creation services.
            </li>
            <li>
              <span className="font-semibold">Commission Details:</span> This commission applies to the total amount
              charged by the content creator for services such as video creation, post collaboration, and live sessions.
            </li>
          </ul>
        </section>

        {/* Example Scenarios */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading text-blue-600 mb-4">Example Scenarios</h2>
          {/* Freelancer Registration Example */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">1. Freelancer Registration:</h3>
            <ul className="list-disc list-inside space-y-1 font-body text-gray-700 text-base sm:text-lg">
              <li>A freelancer registers on Brand Collaborator and pays the one-time fee of N5000.</li>
              <li>
                Equivalent payment for international freelancers will be calculated based on the current exchange rate,
                ensuring they pay an equivalent amount in their local currency.
              </li>
            </ul>
          </div>

          {/* Content Creator Booking Example */}
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">2. Content Creator Booking:</h3>
            <ul className="list-disc list-inside space-y-1 font-body text-gray-700 text-base sm:text-lg">
              <li>A brand books a content creator for a video creation project worth N100,000.</li>
              <li>Brand Collaborator charges a 20% commission on the N100,000 fee.</li>
              <li>
                <span className="font-semibold">Commission Amount:</span> N20,000
              </li>
              <li>
                <span className="font-semibold">Net Payment to Creator:</span> N80,000
              </li>
            </ul>
          </div>
        </section>

        {/* Additional Details */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading text-blue-600 mb-4">Additional Details</h2>
          <ul className="list-disc list-inside space-y-2 font-body text-gray-700 text-base sm:text-lg">
            <li>
              <span className="font-semibold">Payment Processing:</span> All payments, including the registration fee
              and commissions, will be processed securely through the Brand Collaborator platform.
            </li>
            <li>
              <span className="font-semibold">Payouts to Creators:</span> Content creators will receive their net
              payment (total fee minus the 20% commission) after the brand has made the payment.
            </li>
            <li>
              <span className="font-semibold">Currency Conversion:</span> For international transactions, currency
              conversion will be handled by the payment processor at the current exchange rate at the time of the
              transaction.
            </li>
          </ul>
        </section>

        {/* Summary of Fees */}
        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading text-blue-600 mb-4">Summary of Fees</h2>
          <ul className="list-disc list-inside space-y-2 font-body text-gray-700 text-base sm:text-lg">
            <li>
              <span className="font-semibold">Freelancer Registration Fee:</span> One-time fee of N5000 (or equivalent
              amount in other currencies).
            </li>
            <li>
              <span className="font-semibold">Content Creator Commission:</span> 20% commission on the total fee for
              services booked through Brand Collaborator.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Pricing;

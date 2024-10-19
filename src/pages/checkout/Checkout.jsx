// src/pages/Checkout.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Checkout() {
  const { gigId } = useParams();
  const navigate = useNavigate();

  console.log("Checkout gigId:", gigId); // Debugging line
  // Fetch gig data
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", gigId],
    queryFn: () => newRequest.get(`/gigs/${gigId}`).then((res) => res.data),
  });

  const handleProceedToPayment = () => {
    navigate(`/payment-confirmation/${gigId}`);
  };

  const handleCancel = () => {
    navigate(`/gig/${gigId}`);
  };

  if (isLoading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Something went wrong!</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{data?.title}</h2>
        <p className="text-gray-700 mb-4">{data.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Price:</span> #{data.price}
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleProceedToPayment}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

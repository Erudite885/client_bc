import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";

function PaymentConfirmation() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!gigId) {
      alert("Invalid gig ID. Redirecting to home.");
      navigate("/gigs");
    }
  }, [gigId, navigate]);

  // Fetch gig data
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", gigId],
    queryFn: () => newRequest.get(`/gigs/${gigId}`).then((res) => res.data),
    enabled: !!gigId,
  });

 const handleConfirmAndPay = async () => {
   try {
     const response = await newRequest.post("/payments/initialize", {
       gigId,
       email: currentUser?.email,
       amount: data.price * 100, // Convert to kobo
       userId: currentUser?._id, // Include user ID
     });

     window.location.href = response.data.paymentUrl;
   } catch (err) {
     console.error("Error initiating payment:", err);
     alert(err.response?.data?.message || "An error occurred while processing payment.");
   }
 };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading gig data</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Payment Confirmation</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{data.title}</h2>
        <p className="text-gray-700 mb-4">{data.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Total Amount:</span> #{data.price}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate(`/checkout/${gigId}`)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Back to Checkout
          </button>
          <button
            onClick={handleConfirmAndPay}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm and Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;

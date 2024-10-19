// src/components/OrderFailure.js
import React from "react";

function OrderFailure() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Payment Failed</h1>
      <p>There was an issue processing your payment. Please try again.</p>
    </div>
  );
}

export default OrderFailure;

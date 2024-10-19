// PaymentCompleted.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function PaymentCompleted() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");

    if (reference) {
      newRequest
        .get(`/payments/verify?reference=${reference}`)
        .then(() => {
          navigate("/order-success");
        })
        .catch(() => {
          navigate("/order-failure");
        });
    }
  }, [location.search, navigate]);

  return <div>Verifying payment...</div>;
}

export default PaymentCompleted;

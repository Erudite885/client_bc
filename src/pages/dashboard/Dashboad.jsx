// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandDashboard from "./BrandDashboard";
import InfluencerDashboard from "./InfluencerDashboard";
import FreelancerDashboard from "./FreelancerDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setRole(currentUser.role); // Set user role
    }
  }, []);

  return (
    <div>
      {role === "brand" && <BrandDashboard />}
      {role === "influencer" && <InfluencerDashboard />}
      {role === "freelancer" && <FreelancerDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;

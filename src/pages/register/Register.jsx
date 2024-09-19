import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "brand",
    birthday: "",
    businessName: "",
    contactName: "",
    website: "",
    companySize: "",
    industry: "",
    fullName: "",
    portfolioLinks: "",
    youtubeLink: "",
    tiktokLink: "",
    otherLink: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get("role");
    if (role) {
      setUser((prev) => ({ ...prev, role }));
    }
  }, [location]);

  const calculateAge = useCallback((dateString) => {
    return moment().diff(moment(dateString, "YYYY-MM-DD"), "years");
  }, []);

  const handleChange = useCallback((e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = calculateAge(user.birthday);

    if (user.role === "influencer" && age < 18) {
      setError("You must be at least 18 years old to register.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await newRequest.post("/auth/register", user);
      setLoading(false);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register as <span className="capitalize">{user.role}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {user.role === "brand" && (
            <>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={user.businessName}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={user.contactName}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </>
          )}

          {user.role === "freelancer" && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={user.fullName}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="portfolioLinks"
                placeholder="Portfolio Links"
                value={user.portfolioLinks}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
            </>
          )}

          {user.role === "influencer" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={user.birthday}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={user.fullName}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="youtubeLink"
                placeholder="YouTube Link"
                value={user.youtubeLink}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="tiktokLink"
                placeholder="TikTok Link"
                value={user.tiktokLink}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <input type="hidden" name="role" value={user.role} />
          <Button type="submit" variant="primary" className="w-full">
            Register
          </Button>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;

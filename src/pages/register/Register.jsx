import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Select from "react-select";
import countryList from "react-select-country-list"; // Country selection list

import newRequest from "../../utils/newRequest";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    website: "",
    companySize: "",
    industry: "",
    businessName: "",
    jobTitle: "",
    country: "",
    city: "",
    fullName: "",
    birthday: "",
    portfolioLinks: [],
    preferredLanguages: [],
    primaryPlatform: [],
    socialProfiles: {
      youtube: "",
      instagram: "",
      tiktok: "",
      facebook: "",
      twitter: "",
    },
  });

  const countryOptions = countryList().getData(); // Get the list of countries

  // Set the role from the URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get("role");
    if (role) {
      setUser((prev) => ({ ...prev, role }));
    }
  }, [location]);

  // Calculate age based on birthday input
  const calculateAge = useCallback((dateString) => {
    return moment().diff(moment(dateString, "YYYY-MM-DD"), "years");
  }, []);

  // Handle input changes for form fields
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setUser((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else if (name === "portfolioLinks") {
      setUser((prev) => ({
        ...prev,
        [name]: value.split(",").map((link) => link.trim()),
      }));
    } else if (name === "preferredLanguages") {
      setUser((prev) => ({
        ...prev,
        [name]: value.split(",").map((lang) => lang.trim()),
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  // Handle checkbox changes for platform selection (for influencers)
  const handleCheckboxChange = useCallback((e) => {
    const { value, checked } = e.target;
    setUser((prev) => {
      let updatedPlatforms = prev.primaryPlatform;
      if (checked) {
        if (updatedPlatforms.length < 3) {
          updatedPlatforms = [...updatedPlatforms, value];
        } else {
          // Ignore if more than 3 are selected
          return prev;
        }
      } else {
        updatedPlatforms = updatedPlatforms.filter((platform) => platform !== value);
      }
      return { ...prev, primaryPlatform: updatedPlatforms };
    });
  }, []);

  // Handle country selection
  const handleCountryChange = (selectedOption) => {
    setUser((prev) => ({
      ...prev,
      country: selectedOption ? selectedOption.label : "",
    }));
  };

  // Email validation using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const age = calculateAge(user.birthday);

    // Role-specific validation
    if (user.role === "influencer" && age < 18) {
      setError("You must be at least 18 years old to register.");
      return;
    }

    if (!validateEmail(user.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(user.password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (user.role === "influencer" && user.primaryPlatform.length !== 3) {
      setError("You must select exactly 3 platforms.");
      return;
    }

    // Construct data to send based on role
    let dataToSend = {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
      phone: user.phone,
      country: user.country,
      city: user.city,
    };

    if (user.role === "brand") {
      dataToSend = {
        ...dataToSend,
        businessName: user.businessName,
        jobTitle: user.jobTitle,
        companySize: user.companySize,
        industry: user.industry,
        website: user.website,
        fullName: user.fullName,
      };
    } else if (user.role === "freelancer") {
      dataToSend = {
        ...dataToSend,
        fullName: user.fullName,
        preferredLanguages: user.preferredLanguages,
        portfolioLinks: user.portfolioLinks,
      };
    } else if (user.role === "influencer") {
      dataToSend = {
        ...dataToSend,
        fullName: user.fullName,
        birthday: user.birthday,
        preferredLanguages: user.preferredLanguages,
        primaryPlatform: user.primaryPlatform,
        socialProfiles: user.socialProfiles,
      };
    }

    try {
      setLoading(true);
      await newRequest.post("/auth/register", dataToSend);
      setLoading(false);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/verify"), 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
      console.log(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {" "}
            Register as{" "}
            {user.role === "influencer" ? "Content Creator" : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </h2>
          <p className="text-gray-500">Sign up for your account</p>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700">Username *</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Role-Specific Fields */}
          {user.role === "brand" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={user.businessName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Contact Person's Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={user.jobTitle}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Company Size *</label>
                <select
                  name="companySize"
                  value={user.companySize}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Industry *</label>
                <input
                  type="text"
                  name="industry"
                  value={user.industry}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Website *</label>
                <input
                  type="url"
                  name="website"
                  value={user.website}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
            </>
          )}

          {user.role === "freelancer" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Preferred Languages (comma-separated) *</label>
                <input
                  type="text"
                  name="preferredLanguages"
                  value={user.preferredLanguages.join(", ")}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="e.g., English, Spanish"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Portfolio Links (comma-separated) *</label>
                <input
                  type="text"
                  name="portfolioLinks"
                  value={user.portfolioLinks.join(", ")}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="e.g., http://link1.com, http://link2.com"
                  required
                />
              </div>
            </>
          )}

          {user.role === "influencer" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  name="birthday"
                  value={user.birthday}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Preferred Languages (comma-separated)</label>
                <input
                  type="text"
                  name="preferredLanguages"
                  value={user.preferredLanguages.join(", ")}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="e.g., English, Spanish"
                />
              </div>

              {/* Primary Platform Selection */}
              <div className="mb-4">
                <label className="block text-gray-700">Select Exactly 3 Platforms *</label>
                <div className="flex flex-wrap">
                  {["youtube", "instagram", "tiktok", "facebook", "twitter"].map((platform) => (
                    <label key={platform} className="mr-4">
                      <input
                        type="checkbox"
                        value={platform}
                        checked={user.primaryPlatform.includes(platform)}
                        onChange={handleCheckboxChange}
                        className="mr-1"
                      />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                  ))}
                </div>
                {user.primaryPlatform.length > 3 && <p className="text-red-600">You can select up to 3 platforms.</p>}
              </div>

              {/* Social Profiles */}
              {user.primaryPlatform.map((platform) => (
                <div key={platform} className="mb-4">
                  <label className="block text-gray-700">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)} Link *
                  </label>
                  <input
                    type="url"
                    name={`socialProfiles.${platform}`}
                    value={user.socialProfiles[platform]}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>
              ))}
            </>
          )}

          {/* Common Fields */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Country Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Country *</label>
            <Select
              options={countryOptions}
              value={countryOptions.find((option) => option.label === user.country)}
              onChange={handleCountryChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Select your country"
              isClearable={true}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">City *</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password *</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Accept Terms of Service and Privacy Policy */}
          <div className="mb-4">
            <p>
              By registering you accept our{" "}
              <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {error && (
          <div className="text-red-600 text-sm mt-4" role="alert">
            {error}
          </div>
        )}

        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

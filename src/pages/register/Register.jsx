import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
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
    website: "",
    companySize: "",
    industry: "",
    businessName: "",
    jobTitle: "",
    country: "",
    city: "",
    fullName: "",
    birthday: "",
    portfolioLinks: "",
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
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Handle checkbox changes for platform selection (for influencers)
  const handleCheckboxChange = useCallback((e) => {
    const { value, checked } = e.target;
    setUser((prev) => {
      const updatedPlatforms = checked
        ? [...prev.primaryPlatform, value]
        : prev.primaryPlatform.filter((platform) => platform !== value);

      // Ensure only 3 platforms are selected
      if (updatedPlatforms.length > 3) {
        return prev; // Ignore if more than 3 are selected
      }

      return { ...prev, primaryPlatform: updatedPlatforms };
    });
  }, []);

  // Handle changes for preferred languages
  const handlePreferredLanguagesChange = (e) => {
    const { options } = e.target;
    const selectedLanguages = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setUser((prev) => ({
      ...prev,
      preferredLanguages: selectedLanguages,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    const age = calculateAge(user.birthday);

    // Role-specific validation
    if (user.role === "influencer" && age < 18) {
      setError("You must be at least 18 years old to register.");
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

    // Clean up the user object based on the role
    const filteredUser = { ...user };
    if (user.role === "freelancer" || user.role === "influencer") {
      delete filteredUser.companySize;
      delete filteredUser.businessName;
      delete filteredUser.jobTitle;
      delete filteredUser.website;
      delete filteredUser.industry;
    }

    try {
      setLoading(true);
      await newRequest.post("/auth/register", filteredUser);
      setLoading(false);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register as {user.role === "influencer" ? "Content Creator" : user.role}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
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

          {/* Email */}
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

          {/* Brand-specific fields */}
          {user.role === "brand" && (
            <>
              <input
                type="text"
                name="businessName"
                placeholder="Brand/Company Name"
                value={user.businessName}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="fullName"
                placeholder="Contact Person's Full Name"
                value={user.fullName}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={user.jobTitle}
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
              <input
                type="text"
                name="country"
                placeholder="Country of Headquarters"
                value={user.country}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={user.city}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="website"
                placeholder="Company Website"
                value={user.website}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
              <div className="mb-4">
                <label className="block text-gray-700">Company Size</label>
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
              <input
                type="text"
                name="industry"
                placeholder="Industry"
                value={user.industry}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </>
          )}

          {/* Freelancer-specific fields */}
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
                name="phone"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
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
                name="country"
                placeholder="Country of Residence"
                value={user.country}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={user.city}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <select
                multiple
                name="preferredLanguages"
                value={user.preferredLanguages}
                onChange={handlePreferredLanguagesChange}
                className="border p-2 mb-2 w-full"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Mandarin">Mandarin</option>
              </select>
              <input
                type="text"
                name="portfolioLinks"
                placeholder="Portfolio Links (comma-separated)"
                value={user.portfolioLinks}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            </>
          )}

          {/* Influencer-specific fields */}
          {user.role === "influencer" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
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
                name="phone"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                name="country"
                placeholder="Country of Residence"
                value={user.country}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={user.city}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <select
                multiple
                name="preferredLanguages"
                value={user.preferredLanguages}
                onChange={handlePreferredLanguagesChange}
                className="border p-2 mb-2 w-full"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Mandarin">Mandarin</option>
              </select>

              <div className="mb-4">
                <label className="block text-gray-700">Select 3 Platforms</label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="YouTube"
                    checked={user.primaryPlatform.includes("YouTube")}
                    onChange={handleCheckboxChange}
                  />
                  YouTube
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="Instagram"
                    checked={user.primaryPlatform.includes("Instagram")}
                    onChange={handleCheckboxChange}
                  />
                  Instagram
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="TikTok"
                    checked={user.primaryPlatform.includes("TikTok")}
                    onChange={handleCheckboxChange}
                  />
                  TikTok
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="Facebook"
                    checked={user.primaryPlatform.includes("Facebook")}
                    onChange={handleCheckboxChange}
                  />
                  Facebook
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="Twitter"
                    checked={user.primaryPlatform.includes("Twitter")}
                    onChange={handleCheckboxChange}
                  />
                  Twitter
                </label>
              </div>
              {user.primaryPlatform.includes("YouTube") && (
                <input
                  type="text"
                  name="youtubeLink"
                  placeholder="YouTube Link"
                  value={user.socialProfiles.youtube}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatform.includes("Instagram") && (
                <input
                  type="text"
                  name="instagramLink"
                  placeholder="Instagram Link"
                  value={user.socialProfiles.instagram}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatform.includes("TikTok") && (
                <input
                  type="text"
                  name="tiktokLink"
                  placeholder="TikTok Link"
                  value={user.socialProfiles.tiktok}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatform.includes("Facebook") && (
                <input
                  type="text"
                  name="facebookLink"
                  placeholder="Facebook Link"
                  value={user.socialProfiles.facebook}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatform.includes("Twitter") && (
                <input
                  type="text"
                  name="twitterLink"
                  placeholder="Twitter Link"
                  value={user.socialProfiles.twitter}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
            </>
          )}

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Submit Button */}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;

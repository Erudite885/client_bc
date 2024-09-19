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
    jobTitle: "",
    country: "",
    city: "",
    website: "",
    companySize: "",
    industry: "",
    fullName: "",
    preferredLanguages: "",
    youtubeLink: "",
    tiktokLink: "",
    facebookLink: "",
    instagramLink: "",
    twitterLink: "",
    blogLink: "",
    primaryPlatforms: [],
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

  const handleCheckboxChange = useCallback((e) => {
    const { value, checked } = e.target;
    setUser((prev) => {
      const primaryPlatforms = checked
        ? [...prev.primaryPlatforms, value]
        : prev.primaryPlatforms.filter((platform) => platform !== value);
      return { ...prev, primaryPlatforms };
    });
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

   if (user.role === "influencer" && user.primaryPlatforms.length !== 3) {
     setError("You must select exactly 3 platforms.");
     return;
   }

   // Clean up the user object based on the role
   const filteredUser = { ...user }; // Create a copy of the user state
   if (user.role === "freelancer") {
     delete filteredUser.companySize; // Remove companySize for freelancers
     delete filteredUser.businessName; // Remove brand-specific fields
     delete filteredUser.jobTitle;
     delete filteredUser.website;
     delete filteredUser.industry;
   } else if (user.role === "influencer") {
     delete filteredUser.companySize; // Remove irrelevant fields
     delete filteredUser.businessName;
     delete filteredUser.jobTitle;
     delete filteredUser.website;
     delete filteredUser.industry;
   }

   try {
     setLoading(true);
     await newRequest.post("/auth/register", filteredUser); // Send the cleaned user object
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register as {user.role === "influencer" ? "Content Creator" : user.role}
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
              <input
                type="text"
                name="preferredLanguages"
                placeholder="Preferred Languages"
                value={user.preferredLanguages}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />
            </>
          )}

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
              <input
                type="text"
                name="preferredLanguages"
                placeholder="Preferred Languages"
                value={user.preferredLanguages}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
                required
              />

              <div className="mb-4">
                <label className="block text-gray-700">Select 3 Platforms</label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="YouTube"
                    checked={user.primaryPlatforms.includes("YouTube")}
                    onChange={handleCheckboxChange}
                  />
                  YouTube
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="Instagram"
                    checked={user.primaryPlatforms.includes("Instagram")}
                    onChange={handleCheckboxChange}
                  />
                  Instagram
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="TikTok"
                    checked={user.primaryPlatforms.includes("TikTok")}
                    onChange={handleCheckboxChange}
                  />
                  TikTok
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="Facebook"
                    checked={user.primaryPlatforms.includes("Facebook")}
                    onChange={handleCheckboxChange}
                  />
                  Facebook
                </label>
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    value="Twitter"
                    checked={user.primaryPlatforms.includes("Twitter")}
                    onChange={handleCheckboxChange}
                  />
                  Twitter
                </label>
              </div>
              {user.primaryPlatforms.includes("YouTube") && (
                <input
                  type="text"
                  name="youtubeLink"
                  placeholder="YouTube Link"
                  value={user.youtubeLink}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatforms.includes("Instagram") && (
                <input
                  type="text"
                  name="instagramLink"
                  placeholder="Instagram Link"
                  value={user.instagramLink}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatforms.includes("TikTok") && (
                <input
                  type="text"
                  name="tiktokLink"
                  placeholder="TikTok Link"
                  value={user.tiktokLink}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatforms.includes("Facebook") && (
                <input
                  type="text"
                  name="facebookLink"
                  placeholder="Facebook Link"
                  value={user.facebookLink}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatforms.includes("Twitter") && (
                <input
                  type="text"
                  name="twitterLink"
                  placeholder="Twitter Link"
                  value={user.twitterLink}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
              {user.primaryPlatforms.includes("Blog") && (
                <input
                  type="text"
                  name="blogLink"
                  placeholder="Blog/Website Link"
                  value={user.blogLink}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              )}
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

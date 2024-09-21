import React, { useState } from "react";
import "./Login.scss";
import Carousel from "infinite-react-carousel";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing eye and eye-slash icons

import in3 from "../../assets/in1.jpg";
import in2 from "../../assets/in2.jpg";
import in1 from "../../assets/in3.jpg";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between showing and hiding the password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex h-screen place-items-center bg-gradient-to-r from-white via-midLightBlue">
      {/* Left section: Login form */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center bg-gradient-to-r from-white via-midLightBlue">
        <div className="w-full max-w-md p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Welcome!</h2>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />} {/* Icon changes based on visibility */}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Continue
            </button>
          </form>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/get-started" className="text-blue-600 hover:underline">
                Create one here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      {/* Right section: Sample Image */}
      <div className="hidden lg:flex lg:w-1/2 h-full">
        <div className="h-full w-full">
          <Carousel autoplay arrows={false} dots={false} wheel={false} autoplaySpeed={8000} infinite>
            <div>
              <img src={in1} alt="Slide 1" className="object-cover w-full h-screen " />
            </div>
            <div>
              <img src={in2} alt="Slide 2" className="object-cover w-full h-screen " />
            </div>
            <div>
              <img src={in3} alt="Slide 3" className="object-cover w-full h-screen " />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Login;

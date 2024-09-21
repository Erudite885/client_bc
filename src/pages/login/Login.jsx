import React, { useState, useEffect } from "react";
import Carousel from "infinite-react-carousel";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

import in3 from "../../assets/in1.jpg";
import in2 from "../../assets/in2.jpg";
import in1 from "../../assets/in3.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.match(/[^a-zA-Z0-9]/)) return "strong";
    return "medium";
  };

  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordStrength("");
    }
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthClass = () => {
    switch (passwordStrength) {
      case "weak":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      case "strong":
        return "text-green-500";
      default:
        return "";
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
                  type={showPassword ? "text" : "password"}
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
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {/* Only show password strength if the user has typed something */}
              {password && (
                <div className={`password-strength text-sm mt-1 ${getPasswordStrengthClass()}`}>
                  Password strength: {passwordStrength}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
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
              className={`w-full py-2.5 rounded-lg text-sm font-medium ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </form>

          {error && (
            <div className="text-red-600 text-sm mt-4" role="alert">
              {error}
            </div>
          )}

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

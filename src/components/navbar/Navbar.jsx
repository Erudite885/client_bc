import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import brandlogo from "../../assets/brandlogo.svg";
import brandlogo_active from "../../assets/brandlogo_preview.png";
import { Button } from "../Button/Button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // List of paths where the navbar should be hidden
  const hiddenPaths = ["/login", "/register"];

  // Conditionally hide the navbar if the current path is in the hiddenPaths array
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className={`w-full bg-white shadow-md fixed top-0 left-0 z-50 transition-all ${active ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src={brandlogo}
              style={{ filter: "brightness(0.6)" }} // Adjust brightness value as needed
              className="h-8 w-auto"
              alt="BrandCollaborator Logo"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            }
          >
            Login
          </NavLink>
          <Link to="/get-started">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center mr-7">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-gray-50"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-gray-50"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-gray-50"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-gray-50"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
            <Link
              to="/get-started"
              className="block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <Button fullWidth>Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

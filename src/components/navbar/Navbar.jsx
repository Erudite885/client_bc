import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import brandlogo from "../../assets/brandlogo.svg";
import brandlogo_active from "../../assets/brandlogo_preview.png";
import person1 from "../../assets/abt_person.svg";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  // const isActive = () => {
  //   window.scrollY > 0 ? setActive(true) : setActive(false);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", isActive);
  //   return () => {
  //     window.removeEventListener("scroll", isActive);
  //   };
  // }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="">
          <Link to="/" className="flex items-center">
            <img src={active ? brandlogo_active : brandlogo} className="w-full h-auto" alt="BrandCollaborator Logo" />
          </Link>
        </div>
        <div className="links">
          {!currentUser && <Link to="/">Home</Link>}
          {!currentUser && <Link to="/about">About Us</Link>}
          {!currentUser && <Link to="/register?role=influencer">Become a Content Creator</Link>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  {currentUser.isAdmin && (
                    <>
                      <Link className="link" to="/mygigs">
                        Profile
                      </Link>
                      <Link className="link" to="/add">
                        Brands
                      </Link>
                      <Link className="link" to="/orders">
                        Influencers
                      </Link>
                      <Link className="link" to="/orders">
                        Freelancers
                      </Link>
                      <Link className="link" to="/orders">
                        Payouts
                      </Link>
                    </>
                  )}
                  {currentUser.isInfluencer && (
                    <>
                      <Link className="link" to="/mygigs">
                        Profile
                      </Link>
                      <Link className="link" to="/orders">
                        Earnings
                      </Link>
                    </>
                  )}
                  {currentUser.isBrand && (
                    <>
                      <Link className="link" to="/mygigs">
                        Projects
                      </Link>
                      <Link className="link" to="/add">
                        Campaigns
                      </Link>
                      <Link className="link" to="/orders">
                        Payments
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/support">
                    Support
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
              {/* {open && (
                <div className="options">
                  {currentUser.isBrand && (
                    <>
                      <Link className="link" to="/mygigs">
                        Projects
                      </Link>
                      <Link className="link" to="/add">
                        Campaigns
                      </Link>
                      <Link className="link" to="/orders">
                        Payments
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Payments
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )} */}
              {/* {open && (
                <div className="options">
                  {currentUser.isInfluencer && (
                    <>
                      <Link className="link" to="/mygigs">
                        Profile
                      </Link>
                      <Link className="link" to="/orders">
                        Earnings
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/orders">
                    Earnings
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )} */}
              {/* {open && (
                <div className="options">
                  {currentUser.isAdmin && (
                    <>
                      <Link className="link" to="/mygigs">
                        Profile
                      </Link>
                      <Link className="link" to="/add">
                        Brands
                      </Link>
                      <Link className="link" to="/orders">
                        Influencers
                      </Link>
                      <Link className="link" to="/orders">
                        Freelancers
                      </Link>
                      <Link className="link" to="/orders">
                        Payouts
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Influencers
                  </Link>
                  <Link className="link" to="/orders">
                    Freelancers
                  </Link>
                  <Link className="link" to="/orders">
                    Payouts
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )} */}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/get-started">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import React, { useState } from "react";
import { Slider } from "infinite-react-carousel/lib";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";
import Modal from "../../components/modal/Modal";

function Gig() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { id } = useParams(); // Get gig ID from URL params
  const navigate = useNavigate(); // Initialize navigate
  const currentUser = getCurrentUser(); // Get current user data

  // Fetching gig data
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/${id}`).then((res) => res.data),
  });

  // Fetch freelancer information using freelancer ID from gig data
  const freelancerId = data?.freelancer?._id;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", freelancerId],
    queryFn: () => newRequest.get(`/users/${freelancerId}`).then((res) => res.data),
    enabled: !!freelancerId,
  });

  // Determine if the current user is the owner of the gig
  const isOwner = currentUser?._id === freelancerId;

  // Placeholder image URL
  const placeholderImage = "/img/noavatar.jpg";

  // Ensure media has at least one image
  const images = data?.media.length > 0 ? data.media : [placeholderImage];

  // Handle purchase button click
  const handlePurchase = () => {
    if (currentUser) {
      // User is logged in and not the owner, proceed to payment
      navigate(`/pay/${id}`);
    } else {
      // User is not logged in, show login modal
      setShowLoginModal(true);
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {isLoading ? (
        <div className="text-center text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Something went wrong!</div>
      ) : (
        <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-6">
          <div className="left w-full lg:w-2/3 space-y-8">
            {/* Gig Title */}
            <h1 className="text-4xl font-bold text-gray-800">{data.title}</h1>

            {/* Slider Section */}
            <Slider slidesToShow={1} arrowsScroll={1} autoplay className="rounded-lg shadow-xl overflow-hidden">
              {images.map((img, index) => (
                <img key={index} src={img} alt="Gig media" className="w-full h-96 object-cover" />
              ))}
            </Slider>

            {/* Gig Description */}
            <div className="bg-white p-8 rounded-lg shadow-md mt-8">
              <h2 className="text-3xl font-semibold text-gray-800 mt-6">About This Gig</h2>
              <p className="text-gray-600 leading-relaxed mt-4">{data.description}</p>
            </div>

            {/* Freelancer Details */}
            {isLoadingUser ? (
              "Loading seller details..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller bg-white p-8 rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About The Seller</h2>
                <div className="flex items-center gap-6 mb-6">
                  <img
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    src={dataUser?.profileImage || placeholderImage}
                    alt="Freelancer"
                  />
                  <div>
                    <span className="text-xl font-semibold text-gray-900">{dataUser?.username}</span>
                    <div className="stars flex items-center gap-1">
                      {Array(Math.round(data.totalStars / data.starNumber || 0))
                        .fill()
                        .map((_, i) => (
                          <img key={i} src="/img/star.png" alt="star" className="w-5 h-5" />
                        ))}
                      <span className="ml-1 text-yellow-500">{Math.round(data.totalStars / data.starNumber || 0)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{dataUser?.description}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block font-semibold text-gray-700">From:</span>
                    <span>{dataUser?.country || "Unknown"}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-700">Member Since:</span>
                    <span>{new Date(dataUser?.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-700">Languages:</span>
                    <span>{dataUser?.preferredLanguages?.join(", ") || "Not specified"}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-700">Avg. Response Time:</span>
                    <span>4 hours</span>
                    {/* Add avg. response time to backend if needed */}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <Reviews gigId={id} freelancerId={data?.freelancer?._id} />
          </div>

          <div className="right relative top-16 max-h-96 w-full lg:w-1/3">
            {/* Gig Price and Short Details */}
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
              <h2 className="text-4xl font-bold text-gray-900">#{data.price}</h2>
              <p className="text-gray-600">{data.description}</p>

              <div className="details space-y-3">
                <div className="item flex items-center gap-2">
                  <img src="/img/clock.png" alt="Delivery Time" className="w-6" />
                  <span className="text-gray-700">{data.deliveryTime} Days Delivery</span>
                </div>
                <div className="item flex items-center gap-2">
                  <img src="/img/recycle.png" alt="Revisions" className="w-6" />
                  <span className="text-gray-700">{data.revisions} Revisions</span>
                </div>
              </div>

              {/* Features */}
              <div className="features space-y-2">
                {data?.features?.map((feature, index) => (
                  <div key={index} className="item flex items-center gap-2">
                    <img src="/img/greencheck.png" alt="Feature" className="w-6" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Purchase Button */}
              {isOwner ? (
                <button
                  className="mt-6 w-full py-3 bg-gray-300 text-white font-semibold rounded-lg cursor-not-allowed"
                  disabled
                >
                  You can't purchase your own gig
                </button>
              ) : (
                <button
                  onClick={handlePurchase}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-[#091634] to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-green-600 transition duration-300 ease-in-out"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal using the project-specific Modal component */}
      <Modal
        isOpen={showLoginModal}
        title="Please login to complete purchase"
        body=""
        onClose={() => setShowLoginModal(false)}
        onConfirm={() => navigate("/login")}
        confirmText="Login"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Gig;

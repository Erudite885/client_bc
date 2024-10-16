import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  // Log the entire item to check if userId exists
  console.log("GigCard item:", item);

  // Check if item.userId exists before making the request
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () => {
      console.log("Fetching user data for userId:", item.userId);
      return item.userId
        ? newRequest.get(`/users/${item.userId}`).then((res) => {
            console.log("Fetched user data:", res.data);
            return res.data;
          })
        : Promise.resolve(null); // If no userId, resolve with null
    },
    enabled: !!item.userId, // Only enable the query if userId exists
  });

  if (error) {
    console.error("Error fetching user data:", error);
  }

  return (
    <Link to={`/gigs/${item._id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Thumbnail Image */}
        <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />

        {/* Gig Info */}
        <div className="p-4">
          <p className="text-gray-600 mb-3 line-clamp-2 text-xl font-semibold">{item.title}</p>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong!</p>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <img
                src={item.freelancer?.profileImage || "/img/noavatar.jpg"}
                alt={item.freelancer?.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700 font-medium">{item.freelancer?.username}</span>
            </div>
          )}
          {/* <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p> */}

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-3">
            <img src="./img/star.png" alt="Star" className="w-4 h-4" />
            <span className="text-yellow-500 font-bold text-sm">
              {!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Gig Price & Favorite */}
        <div className="p-4 flex justify-between items-center">
          <img src="./img/heart.png" alt="Favorite" className="w-5 h-5 cursor-pointer" />
          <div className="text-right">
            <span className="text-gray-500 text-sm">Price</span>
            <h2 className="text-xl font-bold text-gray-900">#{item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

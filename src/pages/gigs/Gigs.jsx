import React, { useEffect, useRef, useState } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Gigs() {
  const [sort, setSort] = useState(null); // Default is no sorting
  const [minPrice, setMinPrice] = useState(0); // Default min price
  const [maxPrice, setMaxPrice] = useState(100000); // Default max price
  const minRef = useRef();
  const maxRef = useRef();
  const [open, setOpen] = useState(false); // For sort dropdown

  // Fetch all gigs initially without any filters or sorting
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort, minPrice, maxPrice], // Include sorting and price in the queryKey
    queryFn: () =>
      newRequest
        .get(`/gigs`, {
          params: {
            sort,
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 100000, // Default to high value if maxPrice is empty
          },
        })
        .then((res) => res.data),
    keepPreviousData: true, // Keep previous data while loading
  });

  // Re-fetch gigs when sorting changes
  const reSort = (type) => {
    setSort(type);
    setOpen(false); // Close the dropdown
    refetch();
  };

  // Apply price filter
  const applyPriceFilter = () => {
    setMinPrice(minRef.current.value);
    setMaxPrice(maxRef.current.value);
    refetch(); // Refetch with new price filters
  };

  useEffect(() => {
    refetch(); // Refetch when sort or price filter changes
  }, [sort, minPrice, maxPrice]);

  return (
    <div className="w-full flex justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        {/* Title and Description */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-800">AI Artists</h1>
          <p className="text-lg text-gray-600 mt-2">Explore the boundaries of art and technology</p>
        </div>

        {/* Menu: Budget and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center sm:items-start gap-4">
          {/* Left: Budget Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="hidden md:flex text-gray-700 font-medium">Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
            />
            <button
              onClick={applyPriceFilter}
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
            >
              Apply
            </button>
          </div>

          {/* Right: Sort Options */}
          <div className="relative flex items-center gap-2">
            <span className="text-gray-700 font-medium">Sort by</span>
            <span className="font-semibold text-gray-900">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img
              src="./img/down.png"
              alt="Toggle Sort Menu"
              className="cursor-pointer w-4"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-md border border-gray-200 z-10 p-4 w-40">
                <div className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={() => reSort("null")}>
                  ...
                </div>
                <div className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={() => reSort("sales")}>
                  Best Selling
                </div>
                <div className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={() => reSort("createdAt")}>
                  Newest
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;

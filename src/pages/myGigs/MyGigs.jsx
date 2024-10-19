import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import Modal from "../../components/modal/Modal";

const MyGigs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [gigToDelete, setGigToDelete] = useState(null); // Track which gig to delete

  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  // Fetching gigs created by the current user
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => newRequest.get(`/gigs/mygigs`).then((res) => res.data),
  });

  // Mutation to delete a gig
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      toast.success("Gig deleted successfully!", {
        position: "top-right",
        autoClose: 3000, // Automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); // Show success notification
    },
    onError: () => {
      toast.error("Failed to delete gig. Please try again."); // Show error notification
    },
  });

  // Handle Delete button click to open modal
  const handleDeleteClick = (id) => {
    setGigToDelete(id); // Set the gig to delete
    setIsModalOpen(true); // Open the modal
  };

  // Handle confirm delete from modal
  const handleConfirmDelete = () => {
    mutation.mutate(gigToDelete); // Delete the gig
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-8">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading gigs. Please try again later.</p>
        ) : data?.length === 0 ? (
          <p className="text-center text-gray-600">You have no gigs. Add some gigs to get started!</p>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-700">My Gigs</h1>
              {currentUser.role === "freelancer" && (
                <Link to="/add">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Add New Gig
                  </button>
                </Link>
              )}
            </div>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Sales</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((gig) => (
                  <tr key={gig._id} className="border-b">
                    <td className="px-4 py-2">
                      <img
                        className="w-16 h-16 object-cover rounded-md"
                        src={gig.thumbnail}
                        alt={`Thumbnail for ${gig.title}`}
                      />
                    </td>
                    <td className="px-4 py-2">{gig.title}</td>
                    <td className="px-4 py-2">${gig.price}</td>
                    <td className="px-4 py-2">{gig.sales}</td>
                    <td className="px-4 py-2">
                      {currentUser.role === "freelancer" && (
                        <div className="flex gap-3">
                          <Link
                            to={`/gigs/${gig._id}`}
                            className="text-fuchsia-500 hover:text-fuchsia-700 transition"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(gig._id)} // Open the modal
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reusable Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        body="Are you sure you want to delete this gig? This action cannot be undone."
        onClose={() => setIsModalOpen(false)} // Close modal when user cancels
        onConfirm={handleConfirmDelete} // Confirm delete
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default MyGigs;

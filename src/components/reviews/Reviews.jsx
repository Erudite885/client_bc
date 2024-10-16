import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import getCurrentUser from "../../utils/getCurrentUser"; // Import your function to get the current user

const Reviews = ({ gigId, freelancerId }) => {
  // Pass freelancerId as prop
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser(); // Get current user data

  // Fetch reviews for the gig
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId], // Include gigId in the query key
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  // Mutation to submit a new review
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]); // Refetch reviews after a successful review submission
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews bg-white p-8 rounded-lg shadow-md mt-8">
      <h2>Reviews</h2>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : data.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}

      {currentUser &&
        currentUser._id !== String(freelancerId) && ( // Check if the current user is not the owner of the gig
          <div className="add mt-6">
            <h3>Add a review</h3>
            <form action="" className="addForm" onSubmit={handleSubmit}>
              <div className="flex">
                <input type="text" placeholder="Write your opinion" required />
                <select name="star" id="" required>
                  <option value="">Rate</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <button type="submit" disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        )}
      {!currentUser && <p>Please log in to add a review.</p>}
    </div>
  );
};

export default Reviews;

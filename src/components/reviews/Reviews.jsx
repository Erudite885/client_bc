import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import getCurrentUser from "../../utils/getCurrentUser"; // Import your function to get the current user

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser(); // Get current user data

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId], // Include gigId in the query key
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]); // Include gigId in the query key
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
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
        !currentUser.isSeller && ( // Check if the current user is not a seller
          <div className="add">
            <h3>Add a review</h3>
            <form action="" className="addForm" onSubmit={handleSubmit}>
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
            </form>
          </div>
        )}
    </div>
  );
};

export default Reviews;

import React, { useReducer, useState, useEffect } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/uploadToCloudinary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  // State variables
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState("");

  // State for image previews
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Reducer for form state management
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the input is 'price', ensure it's stored as a number
    if (name === "price") {
      dispatch({
        type: "CHANGE_INPUT",
        payload: { name, value: Number(value) },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: { name, value },
      });
    }
  };

  // Handle tag addition
  const handleTag = (e) => {
    e.preventDefault();
    const tag = newTag.trim();
    if (tag) {
      dispatch({
        type: "ADD_TAG",
        payload: tag,
      });
      setNewTag("");
    }
  };

  // Handle cover image selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setSingleFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setThumbnailPreview(previewURL);
    } else {
      setThumbnailPreview(null);
    }
  };

  // Handle multiple images selection
  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Generate preview URLs for each selected file
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation for creating a new gig
  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error("Error creating gig:", error);
      setError("Failed to create gig. Please try again.");
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      // Upload Thumbnail Image
      const thumbnail = await upload(singleFile);

      // Upload Multiple Images
      const media = await Promise.all(files.map(async (file) => await upload(file)));

      // Update State with Uploaded Image URLs
      dispatch({ type: "ADD_MEDIA", payload: { thumbnail, media } });

      // Prepare Gig Data
      const gigData = { ...state, thumbnail, media };

      // Submit Gig Data
      mutation.mutate(gigData);
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Clean up Thumbnail Preview URL
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  // Clean up Multiple Images Preview URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  // Utility function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex justify-center py-12 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Add New Gig</h1>

        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
          {/* Info Section */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Title */}
            <div>
              <label className="block text-gray-600 mb-2">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. I will design a professional logo"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600 mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Provide a detailed description of your gig"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-600 mb-2">Category</label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select a category</option>
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>
            </div>

            {/* Thumbnail Image Upload */}
            <div>
              <label className="block text-gray-600 mb-2">Thumbnail Image</label>
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={handleThumbnailChange}
                className="w-full"
                required
              />
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>

            {/* Upload Images */}
            <div>
              <label className="block text-gray-600 mb-2">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                name="media"
                onChange={handleImagesChange}
                className="w-full"
                required
              />
              {imagePreviews.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Delivery Time */}
            <div>
              <label className="block text-gray-600 mb-2">Delivery Time</label>
              <select
                name="deliveryTime"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select delivery time</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="7">1 Week</option>
                <option value="14">2 Weeks</option>
              </select>
            </div>

            {/* Revisions */}
            <div>
              <label className="block text-gray-600 mb-2">Number of Revisions</label>
              <select
                name="revisions"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select revision number</option>
                <option value="0">0 Revisions</option>
                <option value="1">1 Revision</option>
                <option value="2">2 Revisions</option>
                <option value="3">3 Revisions</option>
                   </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-600 mb-2">Add Tags</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  name="tag"
                  placeholder="e.g. Logo Design"
                  className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleTag}
                  className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                >
                  Add Tag
                </button>
              </div>
              {state.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.tags.map((tag, index) => (
                    <span key={index} className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_TAG",
                            payload: tag,
                          })
                        }
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Slider */}
            <div>
              <label className="block text-gray-600 mb-2">Price</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="price"
                  min="0"
                  max="30000"
                  step="100"
                  value={state.price}
                  onChange={handleChange}
                  className="w-full"
                  required
                  aria-label="Price Range"
                />
                <span className="text-gray-700 font-medium">#{formatNumber(state.price)}</span>
              </div>
            </div>

            {/* Create Button */}
            <button
              type="submit"
              disabled={uploading || !singleFile || files.length === 0}
              className={`mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ${
                (uploading || !singleFile || files.length === 0) && "opacity-50 cursor-not-allowed"
              }`}
            >
              {uploading ? "Uploading..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

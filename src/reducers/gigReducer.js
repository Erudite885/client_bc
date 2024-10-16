// gigReducer.js
export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id || "", // Ensure fallback to empty string
  title: "",
  description: "",
  price: 10000,
  category: "",
  thumbnail: "",
  media: [],
  deliveryTime: 0,
  revisions: 0,
  tags: [], // Array of Strings
 
};

// gigReducer.js
export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      // Handles generic input changes
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "ADD_MEDIA":
      // Handles addition of thumbnail and media URLs
      return {
        ...state,
        thumbnail: action.payload.thumbnail,
        media: action.payload.media,
      };

    case "ADD_TAG":
      // Handles addition of a tag
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };

    case "REMOVE_TAG":
      // Handles removal of a tag
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };

    case "RESET":
      // Resets the state to INITIAL_STATE
      return INITIAL_STATE;

    default:
      return state;
  }
};


import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null, // Feed is initially null
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replace entire state with new feed data
    },
    removeUserFromFeed: (state, action) => {
      if (!state || !state.data) return state; // Guard clause for null state
      return {
        ...state, // Spread existing state
        data: state.data.filter((feed) => feed._id !== action.payload), // Update only the `data` field
      };
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;

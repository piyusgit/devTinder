import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null, // Ensure initial state is properly structured
  reducers: {
    setRequest: (state, action) => {
      return action.payload; // Replaces the entire state with new request data
    },
    removeRequest: (state, action) => {
      if (!state || !state.data) return state; // Prevent errors if state is null

      const newFeed = state.data.filter(
        (request) => request._id !== action.payload
      ); // Update only `data`
      return newFeed;
    },
  },
});

export const { setRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;

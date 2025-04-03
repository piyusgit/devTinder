import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    setRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter(
        (request) => request._id !== action.payload._id
      );
      return newArray;
    },
  },
});

export const { setRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;

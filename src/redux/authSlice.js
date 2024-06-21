import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userDetails(state, action) {
      (state.isAuthenticated = true), (state.user = action.payload);
    },
  },
});

export const { userDetails, checkToken } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userDetails(state, action) {
      state.user = action.payload;
    },
    isAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { userDetails, isAuth } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    isAuth: (state, action) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { userDetails, isAuth } = authSlice.actions;
export default authSlice.reducer;

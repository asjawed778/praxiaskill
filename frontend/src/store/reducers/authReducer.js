import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || {},  
 isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.accessToken = actions.payload.accessToken;
      state.refreshToken = actions.payload.refreshToken;
      state.user = actions.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", actions.payload.accessToken);
      localStorage.setItem("refreshToken", actions.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(actions.payload.user));
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state, actions) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("isAuthenticated", "false");
      localStorage.clear();
    },
  },
});

export const { login, logout, isAuthenticated } = authSlice.actions;

export default authSlice.reducer;

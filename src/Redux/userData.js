// src/Redux/userData.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
  email: "",
  token: "",
};

const userData = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    /**
     * Set user data after login/signup
     * @param {Object} state
     * @param {Object} action - expects { user: { name, email, role }, token }
     */
    setUser: (state, action) => {
      const { user = {}, token = "" } = action.payload || {};
      state.name = user.name || "";
      state.email = user.email || "";
      state.role = user.role || "";
      state.token = token;
    },

    /**
     * Update role only (useful for promotions/demotions)
     * @param {Object} action - either { role } or raw string
     */
    updateUserRole: (state, action) => {
      state.role =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.role || state.role;
    },

    /**
     * Reset user data on logout
     */
    setLogOut: (state) => {
      state.name = "";
      state.email = "";
      state.role = "";
      state.token = "";
    },
  },
});

// Export actions
export const { setUser, setLogOut, updateUserRole } = userData.actions;

// Export reducer
export default userData.reducer;

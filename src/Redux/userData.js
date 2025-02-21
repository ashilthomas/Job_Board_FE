import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  role: "",
  email: "",
};

const userData = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.user.name; // Use correct key
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.token = action.payload.token
    },
    setLogOut:(state)=>{
        state.username = ""
      state.email =""
      state.role =""
      state.token =''

    }
  },
});

// Export actions
export const { setUser,setLogOut } = userData.actions; // Use correct action name

// Export reducer
export default userData.reducer;

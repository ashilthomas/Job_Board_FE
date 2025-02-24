import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
  email: "",
  token:""
};

const userData = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.user.name; 
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.token = action.payload.token
    },
    updateUserRole: (state, action) => {
        state.role = action.payload.role; // Only updating role
      },
    setLogOut:(state)=>{
        state.name = ""
      state.email =""
      state.role =""
      state.token =''

    }
  },
});

// Export actions
export const { setUser,setLogOut,updateUserRole } = userData.actions; // Use correct action name

// Export reducer
export default userData.reducer;

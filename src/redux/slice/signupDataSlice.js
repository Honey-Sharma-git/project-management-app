import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const signupDataSlice = createSlice({
  name: "saveSignupData",
  initialState: initialState,
  reducers: {
    takeSignupData: (state, action) => {
      return action.payload;
    },
  },
});
export default signupDataSlice.reducer;
export const { takeSignupData } = signupDataSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const updateProjFormSlice = createSlice({
  name: "updateProjForm",
  initialState: initialState,
  reducers: {
    toggleProjForm: (state, action) => {
      return !state;
    },
  },
});
export default updateProjFormSlice.reducer;
export const { toggleProjForm } = updateProjFormSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const projectDataSlice = createSlice({
  name: "projectData",
  initialState: initialState,
  reducers: {
    getProjects: (state, action) => {
      return action.payload;
    },
  },
});
export default projectDataSlice.reducer;
export const { getProjects } = projectDataSlice.actions;

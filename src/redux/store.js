import { configureStore } from "@reduxjs/toolkit";
import projectDataReducers from "./slice/projectDataSlice";
import updateProjFormReducers from "./slice/updateProjFormSlice";
export const store = configureStore({
  reducer: {
    projectData: projectDataReducers,
    updateProjForm: updateProjFormReducers,
  },
});

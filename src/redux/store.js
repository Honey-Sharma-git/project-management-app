import { configureStore } from "@reduxjs/toolkit";
import projectDataReducers from "./slice/projectDataSlice";
import updateProjFormReducers from "./slice/updateProjFormSlice";
import signupDataReducers from "./slice/signupDataSlice";
export const store = configureStore({
  reducer: {
    projectData: projectDataReducers,
    updateProjForm: updateProjFormReducers,
    saveSignupData: signupDataReducers,
  },
});

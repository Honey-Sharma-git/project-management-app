import { BrowserRouter, Routes, Route } from "react-router";
import { Signup } from "./pages/login/Signup";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

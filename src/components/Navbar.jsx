import { useState } from "react";
import { MyAccountModal } from "./MyAccountModal";
import { Navigate, useNavigate } from "react-router";

export const Navbar = () => {
  const [isAccModalShown, setIsAccModalShown] = useState(false);
  const navigate = useNavigate();
  function toggleAccountModal() {
    setIsAccModalShown((prev) => {
      return !prev;
    });
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }
  return (
    <nav className="bg-[var(--color-teal)] flex flex-row flex-wrap justify-between px-2 sm:px-5 md:px-5 py-2 shadow-lg drop-nav-animation gap-5">
      <h1 className="text-2xl font-bold text-white">
        Project Management Dashboard
      </h1>
      <div className="flex flex-row gap-5 relative">
        <button
          onClick={toggleAccountModal}
          className="px-3 py-1 bg-[var(--btn-color-purple)] hover:bg-[var(--btn-hover-color-purple)] text-white rounded-lg cursor-pointer shadow-md"
        >
          My Account
        </button>
        {isAccModalShown && (
          <MyAccountModal isAccModalShown={isAccModalShown} />
        )}
        <button
          onClick={logout}
          className="px-3 py-1 bg-[var(--btn-color-purple)] hover:bg-[var(--btn-hover-color-purple)] text-white rounded-lg cursor-pointer shadow-md"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

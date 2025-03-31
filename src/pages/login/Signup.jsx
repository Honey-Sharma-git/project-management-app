import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Signup = () => {
  const [isPassShown, setIsPassShown] = useState(false);
  function togglePassShown(e) {
    e.preventDefault();
    setIsPassShown((prev) => {
      return !prev;
    });
  }
  return (
    <main className="flex flex-row justify-center items-center min-h-screen p-5 pl-20 bg-[var(--color-dark-navy)]">
      <article className="w-full rounded-xl flex flex-row gap-20 drop-shadow-2xl min-h-[90vh] text-[var(--text-color-gray)]">
        <section className="signup-bg-img w-1/2 p-2 rounded-xl shadow-xl shadow-gray-900/50">
          <Link to={"/"}>
            <h2 className="  bg-[var(--color-dark-navy)] p-1 rounded-md px-2 w-fit">
              Project Management App
            </h2>
          </Link>
        </section>
        <section className="p-5 pl-0 pr-16 w-1/2 flex flex-col gap-3 justify-center">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <p>
            <span>Already have an account? </span>
            <Link className="text-[var(--link-color)] hover:underline" to={"/"}>
              Log in
            </Link>
          </p>
          <form className="flex flex-col gap-3 ">
            <div className="flex flex-row gap-5 flex-wrap lg:flex-nowrap justify-between ">
              <div className="flex flex-col w-full   gap-1">
                <label htmlFor="fName">First name:</label>
                <input
                  className="p-2 bg-[var(--input-bg-color)] rounded-sm"
                  type="text"
                  name="fName"
                  id="fName"
                  placeholder="Karan"
                />
              </div>
              <div className="flex flex-col w-full    gap-1">
                <label htmlFor="lName">Last name:</label>
                <input
                  className="p-2 bg-[var(--input-bg-color)] rounded-sm"
                  type="text"
                  name="lName"
                  id="lName"
                  placeholder="Kapoor"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <input
                className="p-2 bg-[var(--input-bg-color)] rounded-sm"
                type="text"
                name="email"
                id="email"
                placeholder="myemail@example.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <div className="relative">
                <input
                  className="p-2 pr-10 bg-[var(--input-bg-color)] rounded-sm w-full"
                  type={isPassShown ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="**************"
                />
                <button
                  aria-label={isPassShown ? "Hide password" : "Show password"}
                  onClick={(e) => {
                    togglePassShown(e);
                  }}
                  className=" text-xl cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 hover:text-[var(--btn-color-purple)]"
                >
                  {isPassShown ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3 px-1">
              <span>
                <input type="checkbox" name="terms" id="terms" />
              </span>
              <label htmlFor="terms">
                <span>I agree to </span>
                <Link
                  className="text-[var(--link-color)] hover:underline"
                  to={"/"}
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className=" hover:bg-[var(--btn-hover-color-purple)] cursor-pointer p-2 bg-[var(--btn-color-purple)] rounded-sm w-full shadow-xl shadow-gray-900/50"
              >
                Create account
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
};

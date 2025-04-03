import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [isPassShown, setIsPassShown] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  function togglePassShown(e) {
    e.preventDefault();
    setIsPassShown((prev) => {
      return !prev;
    });
  }

  function handleChange(e) {
    setNewUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function postData() {
    try {
      const response = await fetch("http://192.168.0.105:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error putting data while signing up", error);
    }
    setNewUser({
      email: "",
      password: "",
      name: "",
    });
  }
  return (
    <main className="flex flex-row justify-center items-center min-h-screen p-5 sm:pl-5 md:pl-20 bg-[var(--color-dark-navy)]">
      <article className="w-full rounded-xl flex flex-row sm:gap-5 md:gap-20 drop-shadow-2xl min-h-[90vh] text-[var(--text-color-gray)]">
        <section className="hidden sm:block signup-bg-img w-1/2 p-2 rounded-xl shadow-xl shadow-gray-900/50 box-left">
          <Link to={"/"}>
            <h2 className="  bg-[var(--color-dark-navy)] p-1 rounded-md px-2 w-fit">
              Project Management App
            </h2>
          </Link>
        </section>
        <section className="sm:p-0 md:pl-5  pl-0 sm:pr-0 md:pr-16  w-full sm:w-1/2 flex flex-col gap-3 sm:justify-center box-right">
          <div className="sm:hidden flex flex-col h-1/4 justify-center items-center rounded-lg ">
            <Link to={"/"}>
              <h2 className="text-3xl p-4 text-[var(--color-dark-navy)] font-bold sm:p-1 rounded-lg px-2 w-fit backdrop-blur-2xl bg-white/50 ">
                Project Management App
              </h2>
            </Link>
          </div>
          <h1 className="text-4xl font-bold">Create an account</h1>
          <p>
            <span>Already have an account? </span>
            <Link className="text-[var(--link-color)] hover:underline" to={"/"}>
              Log in
            </Link>
          </p>
          <form className="flex flex-col gap-3 ">
            <div className="flex flex-row gap-5 flex-wrap lg:flex-nowrap justify-between ">
              <div className="flex flex-col w-full    gap-1">
                <label htmlFor="name">Full name:</label>
                <input
                  onChange={handleChange}
                  className="p-2 bg-[var(--input-bg-color)] rounded-sm"
                  type="text"
                  name="name"
                  id="name"
                  value={newUser.name}
                  placeholder="Karan Kapoor"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <input
                onChange={handleChange}
                className="p-2 bg-[var(--input-bg-color)] rounded-sm"
                type="text"
                name="email"
                id="email"
                value={newUser.email}
                placeholder="myemail@example.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  className="p-2 pr-10 bg-[var(--input-bg-color)] rounded-sm w-full"
                  type={isPassShown ? "text" : "password"}
                  name="password"
                  id="password"
                  value={newUser.password}
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
                  postData();
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

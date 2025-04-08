import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import { msgTime } from "../../utils/constants";
import { takeSignupData } from "../../redux/slice/signupDataSlice";
import { useDispatch } from "react-redux";
import { capitalizeWords } from "../../utils/common";
export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPassShown, setIsPassShown] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    role: "user",
  });
  console.log(newUser);
  const [validation, setValidation] = useState({
    isNameValid: false,
    isEmailValid: false,
    isPassValid: false,
  });
  function togglePassShown(e) {
    e.preventDefault();
    setIsPassShown((prev) => {
      return !prev;
    });
  }
  function signupFormValidation(e) {
    const fieldName = e.target.name;
    const fieldVal = e.target.value;
    if ("name" === fieldName) {
      const isValid = fieldVal.length >= 3;
      setValidation((prev) => {
        return { ...prev, isNameValid: isValid };
      });
    } else if ("email" === fieldName) {
      const isValid =
        fieldVal.includes("@") &&
        fieldVal.includes(".") &&
        !fieldVal.includes(" ");
      setValidation((prev) => {
        return { ...prev, isEmailValid: isValid };
      });
    } else if ("password" === fieldName) {
      const isValid = fieldVal.length >= 6 && !fieldVal.includes(" ");
      setValidation((prev) => {
        return { ...prev, isPassValid: isValid };
      });
    }
  }

  function handleChange(e) {
    signupFormValidation(e);
    setNewUser((prev) => {
      const { name, value } = e.target;
      if (name === "name") {
        return { ...prev, [name]: capitalizeWords(value) };
      } else if ("email" === name) {
        return { ...prev, [name]: value.toLowerCase() };
      } else {
        return { ...prev, [name]: value };
      }
    });
  }

  async function signUpUser() {
    try {
      //Show loading:
      setLoading(true);
      const response = await fetch("http://192.168.0.105:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (response.status === 201) {
        //Hide loading:
        setLoading(false);
        Alert(data.message, "success", msgTime.VERY_SHORT);
        dispatch(takeSignupData(newUser));
        navigate("/");
      } else {
        //Show loading:
        setLoading(true);
        Alert(data.data[0].msg, "error", msgTime.LONG);
      }
    } catch (error) {
      console.log("Error putting data while signing up", error);
      Alert(error, "error", msgTime.VERY_LONG);
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
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Full name:</label>
                <input
                  onChange={handleChange}
                  className={`p-2 bg-[var(--input-bg-color)] rounded-sm ${
                    validation.isNameValid
                      ? "focus:outline-green-300 focus:outline-2"
                      : "focus:outline-red-400 focus:outline-2"
                  }`}
                  type="text"
                  name="name"
                  id="name"
                  value={newUser.name}
                  placeholder="Karan Kapoor"
                />
                {newUser.name && !validation.isNameValid && (
                  <p role="alert" className="text-red-500 text-sm">
                    Name should be at least 3 character long.
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <input
                onChange={handleChange}
                className={`p-2 bg-[var(--input-bg-color)] rounded-sm ${
                  validation.isEmailValid
                    ? "focus:outline-green-300 focus:outline-2"
                    : "focus:outline-red-400 focus:outline-2"
                }`}
                type="text"
                name="email"
                id="email"
                value={newUser.email}
                placeholder="myemail@example.com"
              />
              {newUser.email && !validation.isEmailValid && (
                <p role="alert" className="text-red-500 text-sm">
                  Enter valid email (include @ .(dot) and without space)
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  className={`p-2 pr-10 bg-[var(--input-bg-color)] rounded-sm w-full ${
                    validation.isPassValid
                      ? "focus:outline-green-300 focus:outline-2"
                      : "focus:outline-red-400 focus:outline-2"
                  }`}
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
              {newUser.password && !validation.isPassValid && (
                <p role="alert" className="text-red-500 text-sm">
                  Password must be at least 6 characters long.
                </p>
              )}
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              <p>Select role:</p>
              <div className="space-x-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  id="user"
                  defaultChecked={true}
                  value={"user"}
                />
                <label htmlFor="user">User</label>
              </div>
              <div className="space-x-2">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  id="admin"
                  value={"admin"}
                />
                <label htmlFor="admin">Admin</label>
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
                disabled={
                  !(
                    validation.isNameValid &&
                    validation.isEmailValid &&
                    validation.isPassValid
                  )
                }
                onClick={(e) => {
                  e.preventDefault();
                  signUpUser();
                }}
                className={`disabled:bg-[var(--btn-color-purple)]/30  disabled:cursor-not-allowed hover:bg-[var(--btn-hover-color-purple)] cursor-pointer p-2 bg-[var(--btn-color-purple)] rounded-sm w-full shadow-xl shadow-gray-900/50 ${
                  loading ? "animate-pulse" : null
                }`}
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

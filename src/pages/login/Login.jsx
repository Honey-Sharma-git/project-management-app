import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../utils/common";
import { msgTime } from "../../utils/constants";
import { useSelector } from "react-redux";
export const Login = () => {
  const navigate = useNavigate();
  const justSignedUpUser = useSelector((state) => {
    return state.saveSignupData;
  });
  const [isPassShown, setIsPassShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userNameEmail, setUserNameEmail] = useState({});
  const [user, setUser] = useState({
    email: justSignedUpUser.email,
    password: justSignedUpUser.password,
  });
  const [validation, setValidation] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });
  //Introduced this to prevent appearance of validation msg when redirected from just signed up user.
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  function togglePassShown(e) {
    e.preventDefault();
    setIsPassShown((prev) => {
      return !prev;
    });
  }
  function formValidation(e) {
    if (e.target.name === "email") {
      //Email validation:
      const emailVal = e.target.value;
      const isValid =
        emailVal.includes("@") &&
        emailVal.includes(".") &&
        !emailVal.includes(" ");
      //Setting state for UI:
      setValidation((prev) => {
        return { ...prev, isEmailValid: isValid };
      });
    } else if (e.target.name === "password") {
      //Password validation:
      const passVal = e.target.value;
      const isValid = !passVal.includes(" ") && passVal.length > 0;
      //Setting state for UI:
      setValidation((prev) => {
        return { ...prev, isPasswordValid: isValid };
      });
    }
  }

  function handleChange(e) {
    setTouched((prev) => {
      return { ...prev, [e.target.name]: true };
    });
    formValidation(e);
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function login(e) {
    e.preventDefault();
    //Show loading:
    setIsLoading(true);
    try {
      if (validation.isEmailValid && validation.isPasswordValid) {
        const response = await fetch("http://192.168.0.105:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();

        //On success of API:
        if (response.status === 200) {
          //Login successful Alert:
          Alert(data?.message, "success", msgTime.VERY_SHORT);

          //Setting token and userId to localStorage:
          setToken(data.token);
          setUserId(data.userId);
          setUserNameEmail({ name: data.name, email: data.email });
          //Remove loading:
          setIsLoading(false);
        } else {
          //Error message in Alert:
          Alert(data?.message, "warning", msgTime.LONG);
          //Remove loading:
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("Error putting data while signing up", error);
      Alert(error, "error", msgTime.VERY_LONG);
    }
  }
  //If token is present move to dashboard
  useEffect(() => {
    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userNameEmail.name);
      localStorage.setItem("userEmail", userNameEmail.email);
    }

    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <main className="flex flex-row justify-center items-center min-h-screen p-5 sm:pl-5 md:pl-20 bg-[var(--color-dark-navy)]">
      <article className="w-full rounded-xl flex flex-row sm:gap-5 md:gap-20 drop-shadow-2xl min-h-[90vh] text-[var(--text-color-gray)]">
        <section className="hidden sm:block login-bg-img w-1/2 p-2 rounded-xl shadow-xl shadow-gray-900/50 box-left">
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
          <h1 className="text-4xl font-bold">Log in</h1>
          <form className="flex flex-col gap-3 ">
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
                value={user.email}
                placeholder="myemail@example.com"
              />
              {touched.email && user.email && !validation.isEmailValid && (
                <p role="alert" className="text-red-500 text-sm">
                  Enter a valid email (Include '@', '.' without space)
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password:</label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  className={`p-2 pr-10 bg-[var(--input-bg-color)] rounded-sm w-full ${
                    validation.isPasswordValid
                      ? "focus:outline-green-300 focus:outline-2"
                      : "focus:outline-red-400 focus:outline-2"
                  }`}
                  type={isPassShown ? "text" : "password"}
                  name="password"
                  id="password"
                  value={user.password}
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
              {touched.password &&
                user.password &&
                !validation.isPasswordValid && (
                  <p role="alert" className="text-red-500 text-sm">
                    Enter a valid email (Include '@', '.' without space)
                  </p>
                )}
            </div>
            <div className="flex flex-row gap-3 px-1">
              <span>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
              </span>
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div>
              <button
                disabled={
                  !(validation.isEmailValid && validation.isPasswordValid)
                }
                onClick={login}
                className={`disabled:bg-[var(--btn-color-purple)]/30  disabled:cursor-not-allowed hover:bg-[var(--btn-hover-color-purple)] cursor-pointer p-2 bg-[var(--btn-color-purple)] rounded-sm w-full shadow-xl shadow-gray-900/50 ${
                  isLoading ? "animate-pulse" : null
                }`}
              >
                Log in
              </button>
            </div>
          </form>
          <p>
            <span>Don't have an account? </span>
            <Link
              className="text-[var(--link-color)] hover:underline"
              to={"/signup"}
            >
              Sign up
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
};

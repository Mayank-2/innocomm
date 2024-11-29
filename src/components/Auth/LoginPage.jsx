import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_ALLOWED_HOST;

  const handle_login = async (e) => {
    e.preventDefault();
    setLoading(true)
    await axios({
      method: "post",
      url: `${url}/accounts/api/users/login`,
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response);
        setLoading(false)
        sessionStorage.setItem("innocomm_auth", JSON.stringify(response.data.data));
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-slate-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Innocomm</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Welcome Back to Innocomm! Log in to access your account, explore
            amazing products, and enjoy a seamless shopping experience. Let's
            get started!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <span
              className="cursor-pointer underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              {" "}
              Get Started!
            </span>
          </p>
          
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form className="flex flex-col space-y-5" onSubmit={handle_login}>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email || ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
                
              </div>
              <input
                type="password"
                id="password"
                value={password || ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                {loading ? "Loggin in....." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

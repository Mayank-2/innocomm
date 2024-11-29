import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const url = process.env.REACT_APP_ALLOWED_HOST;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !number || !password || !confirmPassword) {
      setErrors("All fields are required.");
      setLoading(false);
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;
    } else {
      
      setLoading(true);
      await axios({
        method: "post",
        url: `${url}/accounts/api/users/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          name: name,
          contact: number,
          password: password,
          password2: confirmPassword,
        },
      })
        .then((response) => {
          setLoading(false);
          if (response.status === 201) {
            navigate("/login");
          }
        })
        .catch((error) => {
          setLoading(false);
          setErrors(
            error.response.data.errors.email[0]
              ? error.response.data.errors.email[0]
              : ""
          );
          setTimeout(() => {
            setErrors("");
          }, 5000);
        });

      setLoading(false);
      setName("");
      setNumber("");
      setConfirmPassword("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {errors && (
        <div className="absolute bottom-[10px] left-[10px] bg-red-500 p-4 w-[300px]">
          <p className="text-white">{errors}</p>
        </div>
      )}

      <div className="bg-white p-10 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create Your Account
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-bold text-slate-700">Name</label>
            <input
              type="text"
              name="name"
              value={name || ""}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={email || ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none "
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-slate-700">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              value={number || ""}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password || ""}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-bold text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword || ""}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-full border-2 border-gray-200 p-3 rounded outline-none"
            />
          </div>

          <button className="block w-full bg-yellow-400 hover:bg-yellow-500 p-4 rounded text-slate-900 transition duration-300">
            {loading ? "signing in..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;

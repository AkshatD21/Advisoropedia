import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://advisoropedia-api.vercel.app/auth/forgot-password", {
      email,
    })
      .then((response) => {
        if (response.data.status) {
          alert("check your email for reset password link");
          navigate("/login");
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container flex items-center justify-center h-screen">
        <form
          className="form w-full max-w-sm p-6 bg-white rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
          {message && <div className="text-red-500 mb-4">{message}</div>}

          <div className="my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              autoComplete="off"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

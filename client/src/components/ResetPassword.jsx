import React from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, resetPassword] = React.useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/reset-password/" + token, {
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        } else {
          setError(response.data.message);
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
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Confirm Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="Password"
              placeholder="******"
              onChange={(e) => resetPassword(e.target.value)}
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

export default ResetPassword;

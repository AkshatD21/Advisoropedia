import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // profilePicture: "",
    termsAndConditions: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.termsAndConditions) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    Axios.post("http://localhost:3000/auth/signup", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("kya  hora");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container flex items-center justify-center h-screen">
        <form
          className="form w-full max-w-sm p-6 bg-white rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          {message && <div className="text-red-500 mb-4">{message}</div>}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              name="termsAndConditions"
              checked={formData.termsAndConditions}
              onChange={() =>
                setFormData({
                  ...formData,
                  termsAndConditions: !formData.termsAndConditions,
                })
              }
            />
            <span className="text-sm">I agree to the terms and conditions</span>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4"
            type="submit"
          >
            Sign Up
          </button>

          <p className="mt-4">
            Have an Account Already?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

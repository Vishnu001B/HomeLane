import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../src/constants";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error state to handle error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/user/register`,
        formData
      );
      console.log("Registration successful:", response.data);
      localStorage.setItem("emailId", formData.email);
      // Navigate to OTP verification page on successful registration
      navigate("/verifyOtp");
      setError(""); // Clear any previous errors on successful registration
    } catch (error) {
      if (error.response) {
        // Handle error based on status code
        switch (error.response.status) {
          case 400:
            setError("Email ID already exists.");
            break;

          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      } else {
        // Handle error if there's no response
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
            Login with OTP
          </button>
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
            Login with Password
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm text-blue-500">
          <a href="#">Forgot Password?</a>
          <a href="#">Forget Password via Email?</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

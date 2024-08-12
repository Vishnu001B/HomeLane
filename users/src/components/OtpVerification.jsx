import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "../../src/constants";

function OtpVerification({ mobileNumber, onClose }) {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Retrieve emailId from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailId");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email ID not found. Please register again.");
      navigate("/register");
    }
  }, [navigate]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
    try {
      const resp = await axios.post(`${API_URL}/api/user/verify-otp`, {
        email,
        otp,
      });

      toast.success("OTP verified successfully");
      navigate("/");
      // Close the modal or perform other actions if needed
      // Navigate to the home page
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const resendOtp = async () => {
    try {
      const resp = await axios.post(`${API_URL}/api/user/resend-otp`, {
        email,
        mobile: mobileNumber,
      });
      if (resp.status === 200) {
        toast.success("OTP resent successfully");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </h2>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            type="text"
          />
        </div>
        <Button
          onClick={verifyOtp}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-700"
        >
          Verify OTP
        </Button>
        <Button
          onClick={resendOtp}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Resend OTP
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default OtpVerification;

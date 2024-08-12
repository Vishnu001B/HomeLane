import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Register from "./Register";

const Login = ({ setIsLoginModalOpen }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginWithOTP, setLoginWithOTP] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const toggleLoginMethod = () => {
    setLoginWithOTP(!loginWithOTP);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isRegister ? (
          <Register
            toggleForm={toggleForm}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="flex justify-center mb-4">
              <button
                className={`${
                  loginWithOTP
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md hover:bg-blue-600 mr-2`}
                onClick={toggleLoginMethod}
              >
                Login with OTP
              </button>
              <button
                className={`${
                  !loginWithOTP
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md hover:bg-blue-600`}
                onClick={toggleLoginMethod}
              >
                Login with Password
              </button>
            </div>
            {loginWithOTP ? (
              <>
                {/* Login with OTP Form */}
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <AccountCircleIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="ml-2 w-full focus:outline-none"
                    />
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
                    Send OTP
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Login with Password Form */}
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <AccountCircleIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Username or Email"
                      className="ml-2 w-full focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md p-2">
                    <span className="text-gray-500">
                      <LockOpenIcon />
                    </span>
                    <input
                      type="password"
                      placeholder="***********"
                      className="ml-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Remember me</span>
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Login
                  </button>
                </div>
              </>
            )}

            <div className="flex justify-between mt-4 text-sm text-blue-500">
              <a href="#">Forgot Password?</a>
              <span className="cursor-pointer" onClick={toggleForm}>
                Create an Account
              </span>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="flex items-center justify-center w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-100 mr-2">
                <span className="mr-2">
                  <FacebookIcon />
                </span>
                Facebook
              </button>
              <button className="flex items-center justify-center w-full border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-100 ml-2">
                <span className="mr-2">
                  <GoogleIcon />
                </span>
                Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

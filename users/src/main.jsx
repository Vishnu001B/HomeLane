import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategoryDetails from "./components/category/CategoryDetails";
import ProductDetails from "./components/productDetrils/ProductDetails";
import Login from "./routes/Login";
import Register from "./routes/Register";
import OtpVerification from "./components/OtpVerification";
import { Provider } from "react-redux";
import homeLine from "./store/index";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/category/:name",
        element: <CategoryDetails />,
      },
      {
        path: "/productDetails",
        element: <ProductDetails />,
      },

      {
        path: "*",
        element: <h1>Page Not Found</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verifyOtp",
        element: <OtpVerification />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <Provider store={homeLine}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
  </React.StrictMode>
);

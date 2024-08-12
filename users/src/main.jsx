import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./components/HomePage";

import CategoryDetails from "./components/category/CategoryDetails";
import ProductDetails from "./components/productDetrils/ProductDetails";

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
      }

    
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    <RouterProvider router={router}>
          <App />
        </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);

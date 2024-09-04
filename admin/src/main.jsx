import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Dashboard } from './Pages/Dashboard.jsx';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Charts } from './Pages/Charts';
import { LoginForm } from './Pages/LoginForm';
import { SignUpForm } from './Pages/SingUpFrom';
import { ProductHomePage } from './Pages/Product/ProductHomePage';
import { AddProduct } from './Pages/Product/AddProduct';
import { UpdateProduct } from './Pages/Product/UpdateProduct';
import NavbarController from './components/NavbarController';

// Create the router instance
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:<LoginForm/> ,
      },
      {
        path: '/navbarheadercontroller',
        element:<NavbarController/> ,
      },
      {
        path: '/signup',
        element: <SignUpForm/>,
      },
    
      {
        path: '/dashboard',
        element: <Dashboard />,
      },{
        path: '/products',
        element: <ProductHomePage />,
      },{
        path: '/AddProduct',
        element:<AddProduct/>,
      },{
        path: '/UpdateProduct',
        element:<UpdateProduct/>,
      }
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>
);

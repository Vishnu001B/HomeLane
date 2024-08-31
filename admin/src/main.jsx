import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Dashboard } from './Pages/Dashboard.jsx';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Charts } from './Pages/Charts';
import { LoginForm } from './Pages/LoginForm';

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
        path: '/dashboard',
        element: <Charts/>,
      },
      {
        path: '/order',
        element: <Dashboard />,
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

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from "./components/home/Home";
import Store from "./components/store/Store";
import Contact from "./components/contact/Contact";
import Nav from "./components/home/Nav";
import Footer from "./components/home/Footer";
import Page404 from "./components/home/Page404";
import Login from "./components/home/Login";
import Signup from "./components/home/Signup";
import Cart from "./components/cart/Cart";

// Component for the pass-through pages
function Root({ Page }) {
  return (
    <>
      <Nav />
      <div className="flex-grow">
        <Page />
      </div>
      <Footer />
    </>
  );
}

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace={true} />,
  },
  {
    path: "/home",
    element: <Root Page={Home} />,
  },
  {
    path: "/contact",
    element: <Root Page={Contact} />,
  },
  {
    path: "/store",
    element: <Root Page={Store} />,
  },
  {
    path: "/cart",
    element: <Root Page={Cart} />,
  },
  {
    path: "/login",
    element: <Root Page={Login} />,
  },
  {
    path: "/signup",
    element: <Root Page={Signup} />,
  },
  {
    path: "*",
    element: <Root Page={Page404} />,
  },
]);

// Main App component
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

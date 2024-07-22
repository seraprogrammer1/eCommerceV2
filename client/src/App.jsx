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

function PassThrough({ Page }) {
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace={true} />,
  },
  {
    path: "/home",
    element: <PassThrough Page={Home} />,
  },
  {
    path: "/contact",
    element: <PassThrough Page={Contact} />,
  },
  {
    path: "/store",
    element: <PassThrough Page={Store} />,
  },
  {
    path: "/cart",
    element: <PassThrough Page={Cart} />,
  },
  {
    path: "/login",
    element: <PassThrough Page={Login} />,
  },
  {
    path: "/signup",
    element: <PassThrough Page={Signup} />,
  },
  {
    path: "*",
    element: <PassThrough Page={Page404} />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

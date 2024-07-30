import React, { useState } from "react";
import icon from "../../assets/images/nav/icon.png";
import { Link, useNavigate } from "react-router-dom";

// Component for the links
function Links({ to, text }) {
  return (
    <span className="mx-2 flex flex-col justify-center">
      <Link className="text-sl sm:text-xl text-black md:text-white" to={to}>
        {text}
      </Link>
    </span>
  );
}

// Component for the navigation bar
export default function Nav() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);

  // Cookie object
  const cookie = {
    exists: function (name) {
      if (document.cookie.split(";").find((e) => e.includes(name))) return true;
      else return false;
    },
    check: function () {
      if (this.exists("token") && !loggedIN) {
        setLoggedIN(true);
      } else if (!this.exists("token") && loggedIN) {
        setLoggedIN(false);
      }
    },
  };

  cookie.check();

  // Function to check if the user is logged in
  function logout() {
    if (cookie.exists("token")) {
      fetch("/api/logout")
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw err;
            });
          }
          cookie.check();
        })
        .catch((err) => {
          console.error(err.message);
          alert(err.message);
        });
    } else {
      cookie.check();
    }
  }

  return (
    <nav className="sticky top-0 z-50">
      <div className="flex py-1 justify-between bg-dark-navy">
        <img
          src={icon}
          className="w-16 mx-6"
          alt="Galaxy_Builds_Icon"
          onClick={() => {
            navigate("/home");
          }}
        />
        <span className="flex">
          <nav className={`${!show ? "flex" : "nav"} md:flex`}>
            <div className="md:hidden mx-2 flex flex-col justify-center">
              <button
                id="hamburger"
                className={`${!show ? "" : "flex flex-row-reverse"} text-4xl max-h-fit`}
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#000000"
                  >
                    <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />{" "}
                  </svg>
                ) : (
                  <>
                    <span className="bg-white w-6 h-[3px] block mb-1.5 rounded-md"></span>{" "}
                    <span className="bg-white w-6 h-[3px] block mb-1.5 rounded-md"></span>{" "}
                    <span className="bg-white w-6 h-[3px] block rounded-md"></span>{" "}
                  </>
                )}
              </button>
            </div>
            <span className={`${!show ? "hidden" : "nav-span"} md:flex`}>
              <Links to="/home" text="Home" />
              <Links to="/store" text="Store" />
              <Links to="/cart" text="Cart" />
              <Links to="/contact" text="Contact" />
              <div className="mx-2 flex flex-col justify-center">
                <button
                  className={`text-sl sm:text-xl text-black md:text-white border-2 border-black md:border-white rounded-md px-2
              hover:bg-white hover:text-dark-navy`}
                  onClick={(e) => {
                    let element = e.target;
                    if (element.classList.contains("disabled")) return;
                    element.classList.add("disabled");
                    element.style.animation = "shrink 0.25s forwards";
                    setTimeout(() => {
                      element.style.animation = "";
                      element.classList.remove("disabled");
                    }, 250);
                    loggedIN ? logout() : navigate("/login");
                  }}
                >
                  {loggedIN ? "Logout" : "Login"}
                </button>
              </div>
            </span>
          </nav>
        </span>
      </div>
    </nav>
  );
}

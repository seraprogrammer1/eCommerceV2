import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Component for the login page
function Login() {
  const navigate = useNavigate();
  const form = {
    username: { value: "", isValid: false },
    password: { value: "", isValid: false },
  };
  const [submitted, setSubmitted] = useState("");

  // Component for creating the input fields
  function CreateInput({ type, id, name, formProp, label, classes }) {
    const [validInput, setValidInput] = useState({
      isValid: false,
      message: "",
    });
    const [started, setStarted] = useState(false); // check if the input has been started

    function Validation(e) {
      if (!started) {
        setStarted(true);
      }
      const value = e.target.value;
      if (value && value.length <= 20) {
        setValidInput({ isValid: true, message: "" });
        formProp.value = value;
        formProp.isValid = true;
      } else {
        setValidInput({
          isValid: false,
          message: `${value.length > 20 ? "Max 20 characters" : ""}
                ${value.length === 0 ? "Required" : ""}`,
        });
        formProp.value = value;
        formProp.isValid = false;
      }
    }
    return (
      <>
        <fieldset className="flex flex-col">
          <label>{label}</label>
          <p className="mt-2 text-sm text-red-600">
            {validInput.isValid ? "" : validInput.message}
          </p>
          <input
            className={`flex-grow px-2 rounded-[4px] border-[1px] border-[#ccc] focus:outline-none ${classes} required ${validInput.isValid || !started ? "" : "border-red-600"}`}
            type={type}
            id={id}
            name={name}
            onInputCapture={Validation}
          />
        </fieldset>
      </>
    );
  }

  // Function to handle the form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (submitted) {
      alert("already submitted");
      return;
    }

    let pass = true;
    let message = "";
    Object.entries(form).forEach(([key, value]) => {
      if (!value.isValid) {
        if (message) message += ", ";
        message += `${key} is invalid`;
        pass = false;
      }
    });

    if (!pass) {
      alert(message);
      return;
    }

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    };

    fetch("/api/login", option)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        setSubmitted("Logged In");
        navigate(data.redirect);
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      });
  }

  return (
    <>
      <div className="px-6 flex flex-col items-center py-40">
        <form
          className="flex flex-col flex-grow px-6 py-6 bg-vibrant-sky-blue w-[400px] max-w-full *:my-2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <CreateInput
            label="Username"
            type={"text"}
            id={"username"}
            formProp={form.username}
            classes={"py-1"}
          />
          <CreateInput
            label="Password"
            type={"password"}
            id={"password"}
            formProp={form.password}
            classes={"py-1"}
          />
          <p className="text-sm text-center text-dark-navy flex flex-col">
            Not a member?
            <Link to="/signup" className="text-dark-navy">
              Sign up now
            </Link>
          </p>
          <button
            className="bg-white max-w-300px px-3 rounded-[4px] border-[#ccc] border-[1px] py-1 self-center hover:bg-dark-navy hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
        {submitted && <p>{submitted}</p>}
      </div>
    </>
  );
}

export default Login;

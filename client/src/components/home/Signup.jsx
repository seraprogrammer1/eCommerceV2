import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const form = {
    email: { value: "", isValid: false },
    firstName: { value: "", isValid: false },
    lastName: { value: "", isValid: false },
    userName: { value: "", isValid: false },
    password: { value: "", isValid: false },
  };
  const [submitted, setSubmitted] = useState(""); // check if the form has been submitted

  // Component for creating the input fields
  function CreateInput({ type, id, name, email, formProp, label, classes }) {
    const [validInput, setValidInput] = useState({
      isValid: false,
      message: "",
    });
    const [started, setStarted] = useState(false);

    function Validation(e) {
      if (!started) {
        setStarted(true);
      }
      const value = e.target.value;
      const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const max = () => {
        if (name) return 40;
        if (email) return 255;
        return 20;
      };

      const message = () => {
        if (value.length === 0) return "Required";
        if (value.length > max()) return `Max ${max()} characters`;
        if (email && !validEmail.test(value)) return "Invalid Email";
        return "";
      };

      if (
        value &&
        value.length <= max() &&
        (email ? validEmail.test(value) : true)
      ) {
        setValidInput({ isValid: true, message: "" });
        formProp.value = value;
        formProp.isValid = true;
      } else {
        setValidInput({
          isValid: false,
          message: `${message()}`,
        });
        formProp.value = value;
        formProp.isValid = false;
      }
    }
    return (
      <>
        <fieldset className="flex flex-col justify-between">
          <label>{label}</label>
          <p className="mt-0.5 text-sm text-red-600">
            {validInput.isValid ? "" : validInput.message}
          </p>
          <input
            className={`px-2 rounded-[4px] border-[1px] border-[#ccc] focus:outline-none ${classes} required ${validInput.isValid || !started ? "" : "border-red-600"}`}
            type={type}
            id={id}
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
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        password: password.value,
      }),
    };

    fetch("/api/signup", option)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        setSubmitted(data.message);
        navigate(data.redirect);
      })
      .catch((err) => {
        console.error(err.message);
        setSubmitted(err.massage);
      });
  }

  return (
    <>
      <div className="px-6 flex flex-col items-center py-40">
        <form
          className="flex flex-col flex-grow px-6 py-6 bg-vibrant-sky-blue w-[500px] max-w-full *:my-2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <span className="flex flex-col *:my-2 md:my-0 md:flex-row justify-between">
            <CreateInput
              label="First Name"
              type={"text"}
              id={"firstName"}
              name={true}
              formProp={form.firstName}
              classes={"py-1"}
            />
            <CreateInput
              label="Last Name"
              type={"text"}
              id={"lastName"}
              name={true}
              formProp={form.lastName}
              classes={"py-1"}
            />
          </span>
          <CreateInput
            label="Email"
            type={"text"}
            id={"email"}
            email={true}
            formProp={form.email}
            classes={"py-1"}
          />
          <CreateInput
            label="Username"
            type={"text"}
            id={"userName"}
            formProp={form.userName}
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
            Already a member?
            <Link to="/login" className="text-dark-navy">
              Log in now
            </Link>
          </p>
          <input
            className="bg-white max-w-300px px-3 rounded-[4px] border-[#ccc] border-[1px] py-1 self-center hover:bg-dark-navy hover:text-white"
            type="submit"
            value="Submit"
          />
        </form>
        {submitted && <p>{submitted}</p>}
      </div>
    </>
  );
}

export default SignUp;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import "./LoginForm";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigete = useNavigate();

  const [loading, setLoading] = useState(false);

  const form = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const password2 = useRef(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      navigete("/project");
      return;
    }

    if (!form.current) return;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (loading) return;
      checkInput();
    };

    form.current.addEventListener("submit", handleSubmit);

    return () => {
      form.current?.removeEventListener("submit", handleSubmit);
    };
  }, [loading, navigete]);

  function checkInput() {
    const usernameValue = username.current.value.trim();
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();
    const password2Value = password2.current.value.trim();

    let isValid = true;

    if (usernameValue === "") {
      setErrorFor(username.current, "Username cannot be blank");
      isValid = false;
    } else {
      setSuccessFor(username.current);
    }

    if (emailValue === "") {
      setErrorFor(email.current, "Email cannot be blank");
      isValid = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor(email.current, "Email is not valid");
      isValid = false;
    } else {
      setSuccessFor(email.current);
    }

    if (passwordValue === "") {
      setErrorFor(password.current, "Password cannot be blank");
      isValid = false;
    } else {
      setSuccessFor(password.current);
    }

    if (password2Value === "") {
      setErrorFor(password2.current, "Password cannot be blank");
      isValid = false;
    } else if (password2Value != passwordValue) {
      setErrorFor(password2.current, "Password does not match");
      isValid = false;
    } else {
      setSuccessFor(password2.current);
    }

    if (isValid) {
      setLoading(true);

      setTimeout(() => {
        const user = {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        setLoading(false);
        navigete("/project");
      }, 2000);
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    if (small) small.innerText = message;

    formControl.className = "form-control error";
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <div className="login-body">
      <div className="container">
        <div className="header">
          <h2>Create Account</h2>
        </div>
        <form className="form" id="form" ref={form}>
          <div className="form-control">
            <label>Username:</label>
            <input
              type="text"
              placeholder="cupid20"
              id="username"
              ref={username}
            />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small>Error message</small>
          </div>

          <div className="form-control">
            <label>Email:</label>
            <input
              type="email"
              placeholder="hello@gmail.com"
              id="email"
              ref={email}
            />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small>Error message</small>
          </div>

          <div className="form-control">
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              ref={password}
            />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small>Error message</small>
          </div>

          <div className="form-control">
            <label>Password check:</label>
            <input
              type="password"
              placeholder="password two"
              id="password2"
              ref={password2}
            />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small>Error message</small>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
          <p className="login-account-text">
            Already signed in? {" "}
            <Link
              to="/confirm-login"
              onClick={() => localStorage.setItem("isLoggedIn", "false")}
            >
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

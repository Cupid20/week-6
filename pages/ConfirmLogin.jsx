import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginForm.css";

export function ConfirmLogin() {
  const navigate = useNavigate();

  const form = useRef(null);
  const username = useRef(null);
  const password = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      localStorage.setItem("isLoggedIn", "false");
    }

    if (!form.current) return;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (loading) return;

      const saved = localStorage.getItem("user");
      if (!saved) return alert("No account found, create account first");

      const user = JSON.parse(saved);

      const usernameValue = username.current.value.trim();
      const passwordValue = password.current.value.trim();

      if (usernameValue === "" || passwordValue === "") {
        return alert("Fill username and password");
      }

      if (usernameValue === user.username && passwordValue === user.password) {
        localStorage.setItem("isLoggedIn", "true");

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/project");
        }, 1500);
      } else {
        alert("Wrong username or password");
      }
    };

    form.current.addEventListener("submit", handleSubmit);

    return () => form.current?.removeEventListener("submit", handleSubmit);
  }, [loading, navigate]);

  return (
    <div className="login-body">
      <div className="container">
        <div className="header">
          <h2>Login</h2>
        </div>

        <form className="form" ref={form}>
          <div className="form-control">
            <label>Username:</label>
            <input type="text" placeholder="username" ref={username} />
            <small></small>
          </div>

          <div className="form-control">
            <label>Password:</label>
            <input type="password" placeholder="password" ref={password} />
            <small></small>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="create-account-text">
            Don't have account yet?{" "}
            <Link
              to="/login"
              onClick={() => localStorage.setItem("isLoggedIn", "false")}
            >
              create account now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

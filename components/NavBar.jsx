import React, { useState } from "react";
import "./NavBar.css";
import logo_light from "../src/assets/logo_w.png";
import logo_dark from "../src/assets/logo_d.png";
import toggle_light from "../src/assets/toggle.png";
import toggle_dark from "../src/assets/toggle (1).png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ theme, setTheme }) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/confirm-login");
  }
  return (
    <div className="navbar">
      <img
        src={theme == "light" ? logo_light : logo_dark}
        alt=""
        className="logo"
      />

      <button
        className="nav-btn-small"
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Menu"
      >
        ☰
      </button>

      <div className={`nav-right ${navOpen ? "open" : ""}`}>
        <ul className="navbar-list-container">
          <li>
            <Link to="/project" onClick={() => setNavOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setNavOpen(false)}>
              Profile
            </Link>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>

        <img
          onClick={() => {
            toggle_mode();
          }}
          src={theme == "light" ? toggle_light : toggle_dark}
          className="toggle-icon"
        />
      </div>
    </div>
  );
};

export default NavBar;

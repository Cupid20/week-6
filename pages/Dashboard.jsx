import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  const savedUser = useMemo(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      navigate("/confirm-login");
      return;
    }

    const savedHtml = localStorage.getItem("data") || "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(savedHtml, "text/html");
    const items = doc.querySelectorAll("li");
    const checked = doc.querySelectorAll("li.checked");

    const total = items.length;
    const completed = checked.length;
    const pending = total - completed;

    setStats({ total, completed, pending });
  }, [navigate]);

  return (
    <div className="dash-page">
      <div className="dash-wrap">
        <div className="dash-top">
          <div className="dash-title-area">
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">
              {savedUser?.username ? `Welcome, ${savedUser.username}` : "Welcome"}
            </p>
          </div>

          <div className="dash-links">
            <Link className="dash-btn" to="/project">
              Open Project
            </Link>
            <Link className="dash-btn dash-btn-secondary" to="/profile">
              Profile
            </Link>
          </div>
        </div>

        <div className="dash-grid">
          <div className="dash-card">
            <p className="dash-label">Total Tasks</p>
            <p className="dash-value">{stats.total}</p>
          </div>

          <div className="dash-card">
            <p className="dash-label">Completed</p>
            <p className="dash-value">{stats.completed}</p>
          </div>

          <div className="dash-card">
            <p className="dash-label">Pending</p>
            <p className="dash-value">{stats.pending}</p>
          </div>
        </div>

        <div className="dash-grid-2">
          <div className="dash-card">
            <h2 className="dash-h2">Account</h2>
            <p className="dash-text">
              Username: <span className="dash-strong">{savedUser?.username || "Not set"}</span>
            </p>
            <p className="dash-text">
              Email: <span className="dash-strong">{savedUser?.email || "Not set"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
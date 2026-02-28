import { Routes, Route, useLocation } from "react-router-dom";
import { SpLoader } from "../pages/SpLoader";
import { LoginForm } from "../pages/LoginForm";
import { ProjectList } from "../pages/ProjectList";
import NavBar from "../components/NavBar";
import { ProfileForm } from "../pages/ProfileForm";
import { ConfirmLogin } from "../pages/ConfirmLogin";
import { Dashboard } from "../pages/Dashboard";
import "./index.css";
import { useEffect, useState } from "react";

export function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/login" || location.pathname === '/confirm-login';
  return (
    <div className={`app-container ${theme}`}>
      {!hideNav && <NavBar theme={theme} setTheme={setTheme} />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<SpLoader />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/confirm-login" element={<ConfirmLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project" element={<ProjectList />} />
          <Route path="/profile" element={<ProfileForm />} />
          
        </Routes>
      </main>
    </div>
  );
}

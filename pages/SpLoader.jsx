import React, { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import "./SpLoader.css";

export function SpLoader() {
  const [showing, setShowing] = useState(() => {
    const alreadyShown = localStorage.getItem('sploaderShown')
    return alreadyShown !== 'true';
  })


  useEffect(() => {
    if (!showing) return;

    const timer = setTimeout(() => {
      setShowing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showing]);

  return (
    <>
      <div className={`sploader-container ${showing ? "is-loading" : ""}`}>
        <div className="sploader">
          {showing ? (
            <img className="loader-img" src="../src/assets/Loading.svg" />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </>
  );
}

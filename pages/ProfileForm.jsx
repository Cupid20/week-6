import React, { useEffect, useState } from "react";
import './ProfileForm.css'

export function ProfileForm() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return <div>No user found</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
import React from "react";
import { auth, signOut } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("خروج موفق!");
        navigate("/"); // بعد از خروج به صفحه لاگین برگردد
      })
      .catch((error) => {
        console.error("خطا در خروج:", error);
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>پنل کاربری</h2>
      <button onClick={handleLogout}>خروج</button>
    </div>
  );
}

export default Dashboard;
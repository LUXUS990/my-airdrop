import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Path from "./pages/Path";
import Friends from "./pages/Friends";
import Invite from "./pages/Invite";
import Login from "./pages/Login"; // صفحه ورود
import { auth } from "./firebaseConfig"; // وارد کردن تنظیمات Firebase
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // گوش دادن به تغییرات وضعیت احراز هویت
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // اگر هنوز وضعیت کاربر مشخص نشده، می‌توانید یک لودر نمایش دهید
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* صفحه ورود: اگر کاربر وارد شده باشد، به Home هدایت می‌شود */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          {/* مسیرهای محافظت‌شده: اگر کاربر وارد نشده باشد، به صفحه ورود هدایت می‌شود */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/path"
            element={user ? <Path /> : <Navigate to="/login" />}
          />
          <Route
            path="/Friends"
            element={user ? <Friends /> : <Navigate to="/login" />}
          />
          <Route
            path="/invite/:id"
            element={user ? <Invite /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* نمایش منوی پایین تنها در صورت لاگین */}
        {user && (
          <nav className="bottom-nav">
            <Link to="/" className="nav-item">
              <span>🏠</span>
              <p>Home</p>
            </Link>
            <Link to="/path" className="nav-item">
              <span>📄</span>
              <p>Path</p>
            </Link>
            <Link to={`/invite/${user.uid}`} className="nav-item">
              <span>👥</span>
              <p>Invite Friends</p>
            </Link>
          </nav>
        )}
      </div>
    </Router>
  );
}

export default App;
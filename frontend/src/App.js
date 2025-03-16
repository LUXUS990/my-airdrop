import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Path from "./pages/Path";
import Friends from "./pages/Friends";
import Invite from "./pages/Invite"; // اضافه کردن صفحه دعوت
import "./App.css";

function App() {
  const userId = "12345"; // مقدار userId به‌صورت داینامیک از سرور یا سیستم احراز هویت دریافت شود

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/path" element={<Path />} />
          <Route path="/Friends" element={<Friends />} />
          <Route path="/invite/:id" element={<Invite />} /> {/* مسیر صفحه دعوت */}
        </Routes>

        {/* منوی پایین */}
        <nav className="bottom-nav">
          <Link to="/" className="nav-item">
            <span>🏠</span>
            <p>Home</p>
          </Link>
          <Link to="/path" className="nav-item">
            <span>📄</span>
            <p>Path</p>
          </Link>
          <Link to={`/invite/${userId}`} className="nav-item">
            <span>👥</span>
            <p>Invite Friends</p>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
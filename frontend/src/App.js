import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import Roadmap from "./pages/Roadmap";
import BuyToken from "./pages/BuyToken";
import "./App.css";

// کامپوننت سفارشی برای NavItem که حالت فعال رو مدیریت می‌کنه
const NavItem = ({ to, emoji, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`nav-item ${isActive ? "active" : ""}`}>
      <span>{emoji}</span>
      <p>{label}</p>
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/roadmap" />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/buy-token" element={<BuyToken />} />
        </Routes>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <NavItem to="/roadmap" emoji="📜" label="Roadmap" />
          <NavItem to="/buy-token" emoji="💎" label="Buy Tokens" />
        </nav>
      </div>
    </Router>
  );
}

export default App;
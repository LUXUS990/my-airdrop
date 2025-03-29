import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import BuyToken from "./pages/BuyToken";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/buy-token" element={<BuyToken />} />
        </Routes>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <Link to="/" className="nav-item">
            <span>🏠</span>
            <p>Home</p>
          </Link>
          <Link to="/roadmap" className="nav-item">
            <span>📄</span>
            <p>Roadmap</p>
          </Link>
          <Link to="/buy-token" className="nav-item">
            <span>💳</span>
            <p>Buy Tokens</p>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
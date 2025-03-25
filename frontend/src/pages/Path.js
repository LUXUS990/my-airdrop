import React from "react";
import "./Path.css"; // ✅ استایل مخصوص صفحه

function Path() {
  return (
    <div className="path-container">
      <div className="path-content">
        <h1>Token Path</h1>
        <p><strong>Total Supply:</strong> 30,000,000</p>
        <p><strong>Airdrop Allocation:</strong> 10,000,000</p>
        <p><strong>Network:</strong> BSC (Binance Smart Chain)</p>
      </div>
    </div>
  );
}

export default Path;
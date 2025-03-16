import React, { useState } from "react";
import "./Friends.css"; // استایل جدا برای این صفحه

function Friends() {
  const [inviteLink, setInviteLink] = useState("");

  // تابع تولید لینک اختصاصی
  const generateInviteLink = () => {
    const userId = Math.random().toString(36).substr(2, 9); // تولید آی‌دی تصادفی
    const link = '${window.location.origin}/invite/${userId}'; // اینجا باید از ` استفاده شود
    setInviteLink(link);
  };

  // کپی لینک به کلیپ‌بورد
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied!");
  };

  return (
    <div className="friends-container">
      <h1>Your Friends</h1>
      <ul>
        <li>Friend 1</li>
        <li>Friend 2</li>
        <li>Friend 3</li>
      </ul>

      <button onClick={generateInviteLink} className="invite-button">
        Generate Invite Link
      </button>

      {inviteLink && (
        <div className="invite-section">
          <p>Invite Link:</p>
          <input type="text" value={inviteLink} readOnly />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default Friends;
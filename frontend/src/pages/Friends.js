import React, { useState } from "react";
import "./Friends.css"; // استایل مخصوص صفحه Friends

function Friends() {
  const [inviteLink, setInviteLink] = useState("");

  const generateInviteLink = () => {
    const referralCode = Math.random().toString(36).substr(2, 8);
    // به جای استفاده از window.location.origin، آدرس آنلاین ثابت استفاده شده است.
    setInviteLink(`https://luxus-society.vercel.app/invite/${referralCode}`);
  };

  return (
    <div className="friends-container">
      <div className="friends-content">
        <h1>Your Friends</h1>
        <p>Invite your friends and earn rewards!</p>

        <button className="invite-button" onClick={generateInviteLink}>
          Generate Invite Link
        </button>

        {inviteLink && (
          <div className="invite-section">
            <input type="text" value={inviteLink} readOnly />
            <button onClick={() => navigator.clipboard.writeText(inviteLink)}>
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
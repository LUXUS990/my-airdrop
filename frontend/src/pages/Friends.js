import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Friends.css";

function Friends() {
  const [inviteLink, setInviteLink] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchFriends(auth.currentUser.uid);
    }
  }, []);

  // تولید لینک دعوت
  const generateInviteLink = async () => {
    if (!auth.currentUser) {
      alert("Please log in first!");
      return;
    }

    const userId = auth.currentUser.uid;
    const link = `https://luxus-society.vercel.app/invite?invite=${userId}`; // هدایت به /invite
    setInviteLink(link);
    localStorage.setItem("inviteLink", link);
    console.log("Generated Invite Link:", link); // برای دیباگ
  };

  // دریافت لیست دوستان دعوت‌شده
  const fetchFriends = async (userId) => {
    try {
      const q = query(collection(db, "invites"), where("inviterId", "==", userId));
      const querySnapshot = await getDocs(q);
      const friendsList = [];
      for (const doc of querySnapshot.docs) {
        const friendId = doc.data().newUserId;
        const userQuery = query(collection(db, "users"), where("uid", "==", friendId));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          friendsList.push({ id: friendId, name: userSnapshot.docs[0].data().name || friendId });
        }
      }
      setFriends(friendsList);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
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
        {friends.length > 0 ? (
          friends.map((friend, index) => <li key={index}>{friend.name}</li>)
        ) : (
          <li>No friends invited yet.</li>
        )}
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

      <div className="reward-info">
        <p>Earn 0.5 tokens per successful invite.</p>
      </div>
    </div>
  );
}

export default Friends;
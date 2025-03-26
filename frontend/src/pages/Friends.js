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

  const generateInviteLink = () => {
    if (!auth.currentUser) {
      alert("Please log in first!");
      return;
    }

    const userId = auth.currentUser.uid;
    const link = `https://luxus-society.vercel.app/login?referralCode=${userId}`;
    setInviteLink(link);
    localStorage.setItem("inviteLink", link);
  };

  const fetchFriends = async (userId) => {
    try {
      const q = query(collection(db, "referrals"), where("inviterId", "==", userId));
      const querySnapshot = await getDocs(q);
      const friendsList = [];
      
      for (const doc of querySnapshot.docs) {
        const friendId = doc.data().newUserId;
        const userQuery = query(collection(db, "users"), where("uid", "==", friendId));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          friendsList.push({
            id: friendId,
            name: userSnapshot.docs[0].data().name || friendId
          });
        }
      }
      setFriends(friendsList);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied!");
  };

  return (
    <div className="friends-container">
      <h1>Your Friends</h1>
      <ul>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend.id}>
              {friend.name} ({friend.id.slice(0, 6)}...)
            </li>
          ))
        ) : (
          <li>No friends invited yet.</li>
        )}
      </ul>

      <button onClick={generateInviteLink} className="invite-button">
        Generate Invite Link
      </button>

      {inviteLink && (
        <div className="invite-section">
          <input 
            type="text" 
            value={inviteLink} 
            readOnly 
            onClick={(e) => e.target.select()}
          />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default Friends;
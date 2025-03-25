import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // افزودن اتصال به دیتابیس
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "./Friends.css";

function Friends() {
  const [inviteLink, setInviteLink] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchFriends(auth.currentUser.uid);
    }
  }, []);

  // تولید لینک دعوت اختصاصی برای کاربر
  const generateInviteLink = async () => {
    if (!auth.currentUser) {
      alert("Please log in first!");
      return;
    }

    const userId = auth.currentUser.uid; // استفاده از UID واقعی کاربر
    const link = `https://luxus-society.vercel.app/?invite=${userId}`;
    setInviteLink(link);

    // ذخیره در localStorage (برای بررسی راحت‌تر)
    localStorage.setItem("inviteLink", link);
  };

  // خواندن پارامتر دعوت از آدرس مرورگر و ذخیره در دیتابیس
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviterId = urlParams.get("invite");

    if (inviterId && auth.currentUser) {
      saveInvite(inviterId, auth.currentUser.uid);
    }
  }, []);

  // ذخیره اطلاعات دعوت در Firestore
  const saveInvite = async (inviterId, newUserId) => {
    try {
      await addDoc(collection(db, "invites"), {
        inviterId,
        newUserId,
        timestamp: new Date(),
      });
      console.log("Invitation saved!");
    } catch (error) {
      console.error("Error saving invite:", error);
    }
  };

  // دریافت لیست دوستان دعوت‌شده
  const fetchFriends = async (userId) => {
    try {
      const q = query(collection(db, "invites"), where("inviterId", "==", userId));
      const querySnapshot = await getDocs(q);
      const friendsList = querySnapshot.docs.map((doc) => doc.data().newUserId);
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
          friends.map((friend, index) => <li key={index}>{friend}</li>)
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
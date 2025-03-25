import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // اتصال به Firebase
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

  // تابع ایجاد لینک دعوت
  const generateInviteLink = async () => {
    if (!auth.currentUser) {
      alert("Please log in first!");
      return;
    }

    const userId = auth.currentUser.uid; // استفاده از UID کاربر به‌عنوان کد رفرال
    const link = `https://luxus-society.vercel.app/invite/${userId}`;
    setInviteLink(link);

    // ذخیره در localStorage برای نگهداری در سشن مرورگر
    localStorage.setItem("inviteLink", link);
  };

  // خواندن مقدار رفرال از URL هنگام ورود کاربر جدید
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

        <h2>Invited Friends</h2>
        <ul>
          {friends.length > 0 ? (
            friends.map((friend, index) => <li key={index}>{friend}</li>)
          ) : (
            <li>No friends invited yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Friends;
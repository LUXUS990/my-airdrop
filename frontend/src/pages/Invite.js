import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Invite() {
  const navigate = useNavigate();

  useEffect(() => {
    const processInvite = async () => {
      const params = new URLSearchParams(window.location.search);
      const referralCode = params.get("referralCode");

      if (!referralCode) {
        navigate("/");
        return;
      }

      localStorage.setItem("referralCode", referralCode);

      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            await addDoc(collection(db, "referrals"), {
              inviterId: referralCode,
              newUserId: user.uid,
              timestamp: serverTimestamp()
            });
            localStorage.removeItem("referralCode");
            navigate("/dashboard?ref=success");
          } catch (error) {
            console.error("Referral save error:", error);
            navigate("/dashboard?ref=error");
          }
        } else {
          navigate("/login");
        }
      });

      return () => unsubscribe();
    };

    processInvite();
  }, [navigate]);

  return (
    <div className="invite-container">
      <div className="loading-spinner"></div>
      <p>Processing your invitation...</p>
    </div>
  );
}

export default Invite;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function Invite() {
  const navigate = useNavigate();

  useEffect(() => {
    // خواندن inviterId از URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviterId = urlParams.get("invite");

    console.log("Inviter ID from URL:", inviterId); // برای دیباگ

    if (inviterId) {
      // ذخیره inviterId تو localStorage برای استفاده بعد از لاگین
      localStorage.setItem("inviterId", inviterId);

      // مانیتور کردن وضعیت لاگین
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // کاربر لاگین کرده، رفرال رو ثبت کن
          try {
            await addDoc(collection(db, "invites"), {
              inviterId,
              newUserId: user.uid,
              timestamp: new Date(),
            });
            console.log("Invitation saved!");
            localStorage.removeItem("inviterId"); // پاک کردن بعد از ثبت
            navigate("/friends"); // هدایت به صفحه دوستان
          } catch (error) {
            console.error("Error saving invite:", error);
          }
        } else {
          // کاربر لاگین نکرده، به صفحه لاگین هدایتش کن
          navigate("/login");
        }
      });

      return () => unsubscribe();
    } else {
      // اگه inviterId تو URL نبود، به صفحه اصلی هدایت کن
      navigate("/");
    }
  }, [navigate]);

  return <div>Processing your invite...</div>;
}

export default Invite;
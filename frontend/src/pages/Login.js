import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import "./Login.css"; // اطمینان حاصل کنید فایل CSS را ایمپورت کرده‌اید

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // رصد تغییرات وضعیت احراز هویت کاربر
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ورود با گوگل
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("ورود موفق با گوگل:", result.user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("خطا در ورود با گوگل:", error);
        setError("خطا در ورود با گوگل: " + error.message);
      });
  };

  // ثبت‌نام یا ورود خودکار با ایمیل و رمزعبور (ابتدا ثبت‌نام، در صورت وجود، ورود)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // تلاش مستقیم برای ثبت‌نام
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("ثبت‌نام و ورود موفق:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("خطا در ثبت‌نام:", error.code, error.message);
      if (error.code === "auth/email-already-in-use") {
        // اگر حساب قبلاً وجود داشته باشد، ورود انجام شود
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          console.log("ورود موفق:", result.user);
          navigate("/dashboard");
        } catch (signInError) {
          console.error("خطا در ورود:", signInError.code, signInError.message);
          setError("خطا در ورود: " + signInError.message);
        }
      } else {
        setError("خطا در ثبت‌نام: " + error.message);
      }
    }
  };

  // خروج از حساب کاربری
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("خروج موفقیت‌آمیز");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("خطا در خروج:", error);
        setError("خطا در خروج: " + error.message);
      });
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>حساب شما فعال است</h2>
          <button className="login-button" onClick={handleLogout}>
            خروج از حساب
          </button>
        </div>
      ) : (
        <div>
          <h2>لطفاً وارد شوید</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="رمز عبور (حداقل ۶ کاراکتر)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              ورود / ثبت‌نام
            </button>
          </form>
          <button onClick={handleGoogleLogin} className="login-button">
            ورود با گوگل
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
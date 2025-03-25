import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import "./Login.css"; 

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return; // جلوگیری از خطای مقدار نال
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ورود با گوگل
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("ورود موفق با گوگل:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("خطا در ورود با گوگل:", error);
      setError("خطا در ورود با گوگل: " + error.message);
    }
  };

  // ثبت‌نام یا ورود خودکار با ایمیل و رمزعبور
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("ثبت‌نام و ورود موفق:", result.user);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          console.log("ورود موفق:", result.user);
          navigate("/dashboard");
        } catch (signInError) {
          console.error("خطا در ورود:", signInError.code, signInError.message);
          setError("خطا در ورود: " + signInError.message);
        }
      } else {
        console.error("خطا در ثبت‌نام:", error.code, error.message);
        setError("خطا در ثبت‌نام: " + error.message);
      }
    }
  };

  // خروج از حساب کاربری
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("خروج موفقیت‌آمیز");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("خطا در خروج:", error);
      setError("خطا در خروج: " + error.message);
    }
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
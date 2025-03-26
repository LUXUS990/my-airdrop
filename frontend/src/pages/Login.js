import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await saveReferral(user.uid);
    } catch (error) {
      setError("Google login failed: " + error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await saveReferral(user.uid);
    } catch (signInError) {
      if (signInError.code === "auth/user-not-found") {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await saveReferral(user.uid);
        } catch (signUpError) {
          setError("Signup failed: " + signUpError.message);
        }
      } else {
        setError("Login failed: " + signInError.message);
      }
    }
  };

  const saveReferral = async (userId) => {
    const referralCode = localStorage.getItem("referralCode");
    if (!referralCode) return;

    try {
      await setDoc(doc(db, "referrals", `${referralCode}_${userId}`), {
        inviterId: referralCode,
        newUserId: userId,
        timestamp: new Date()
      });
      localStorage.removeItem("referralCode");
    } catch (err) {
      console.error("Error saving referral:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login / Signup</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">Continue with Email</button>
      </form>

      <button onClick={handleGoogleLogin} className="google-btn">
        Continue with Google
      </button>
    </div>
  );
}

export default Login;
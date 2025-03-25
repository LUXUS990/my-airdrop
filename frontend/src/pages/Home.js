import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTokens(100);
  }, []);

  // رصد وضعیت احراز هویت
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // تابع اتصال والت (فقط برای نمایش لاگ)
  const connectWallet = (walletType) => {
    console.log(`${walletType} Clicked`);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setShowWalletOptions(false);
  };

  // تابع خروج از حساب
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("خروج موفق");
        setUser(null);
        navigate("/login"); // هدایت به صفحه ورود پس از خروج
      })
      .catch((error) => {
        console.error("خطا در خروج:", error);
      });
  };

  return (
    <div className="home-page">
      {/* نمایش دکمه خروج فقط اگر کاربر وارد شده باشد */}
      {user && (
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            خروج از حساب
          </button>
        </div>
      )}

      <div className="wallet-button-container">
        {/* دکمه اتصال والت */}
        <button
          className="wallet-button"
          onClick={() => setShowWalletOptions(!showWalletOptions)}
        >
          {walletAddress
            ? `Connected: ${walletAddress.slice(0, 6)}...`
            : "Connect Wallet"}
        </button>

        {/* دکمه Disconnect */}
        {walletAddress && (
          <button className="disconnect-button" onClick={disconnectWallet}>
            Disconnect
          </button>
        )}

        {/* منوی پاپ‌آپ انتخاب والت */}
        {showWalletOptions && !walletAddress && (
          <div className="wallet-options-popup">
            {/* گزینه تراست والت */}
            <button
              className="wallet-option trust"
              onClick={() => connectWallet("Trust Wallet")}
            >
              <img
                src="/logo1.png"
                alt="Trust Wallet Logo"
                className="wallet-logo"
              />
              Trust Wallet
            </button>

            {/* گزینه متامسک */}
            <button
              className="wallet-option metamask"
              onClick={() => connectWallet("MetaMask")}
            >
              <img
                src="/logo2.png"
                alt="MetaMask Logo"
                className="wallet-logo"
              />
              MetaMask
            </button>
          </div>
        )}
      </div>

      {/* دکمه Claim */}
      <div className="claim-button-container">
        <button className="claim-button">Claim</button>
      </div>

      {/* لوگو و مقدار توکن */}
      <div className="home-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2 className="token-amount">You received: {tokens} LUX</h2>
      </div>
    </div>
  );
}

export default Home;
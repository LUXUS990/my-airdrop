import React, { useState } from "react";
import Web3 from "web3";
import "./Home.css";

function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokens, setTokens] = useState(100); // مقدار پیش‌فرض توکن‌ها
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  // تابع اتصال والت (اتصال واقعی)
  const connectWallet = async (walletType) => {
    console.log(`${walletType} Clicked`);
    
    if (!window.ethereum) {
      alert("لطفاً MetaMask یا Trust Wallet را نصب کنید.");
      return;
    }

    try {
      // درخواست دسترسی به کیف پول
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // آدرس اولین حساب متصل شده را ذخیره کنید
      const connectedAddress = accounts[0];
      setWalletAddress(connectedAddress);
      setShowWalletOptions(false);
    } catch (error) {
      console.error("اتصال به کیف پول با خطا مواجه شد:", error);
      alert("اتصال به کیف پول با خطا مواجه شد.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setShowWalletOptions(false);
  };

  // تابع Claim توکن‌ها
  const handleClaim = () => {
    setTokens((prev) => prev + 50); // افزایش توکن‌ها پس از Claim
    alert("50 LUX tokens claimed successfully!");
  };

  return (
    <div className="home-page">
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
        <button className="claim-button" onClick={handleClaim}>
          Claim
        </button>
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
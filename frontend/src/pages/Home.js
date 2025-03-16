import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./Home.css";

function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  // پاپ‌آپ راهنمای تراست ولت
  const [showTrustHelp, setShowTrustHelp] = useState(false);

  useEffect(() => {
    setTokens(100);
  }, []);

  // تابع اتصال به والت
  const connectWallet = async (walletType) => {
    try {
      let provider;
      if (walletType === "metamask") {
        if (!window.ethereum) {
          alert("Please install MetaMask extension!");
          return;
        }
        provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (walletType === "trustwallet") {
        provider = new WalletConnectProvider({
          rpc: {
            56: "https://bsc-dataseed.binance.org/"
          }
        });
        await provider.enable();
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setShowWalletOptions(false);
      setShowTrustHelp(false); // اگر باز بود ببندد
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // تابع قطع اتصال والت
  const disconnectWallet = () => {
    setWalletAddress(null);
    setShowWalletOptions(false);
    setShowTrustHelp(false);
  };

  // باز و بسته‌کردن راهنمای تراست ولت
  const toggleTrustHelp = (e) => {
    e.stopPropagation();
    setShowTrustHelp(!showTrustHelp);
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

        {/* دکمه Disconnect، فقط اگر والت وصل باشد */}
        {walletAddress && (
          <button className="disconnect-button" onClick={disconnectWallet}>
            Disconnect
          </button>
        )}

        {/* منوی پاپ‌آپ انتخاب والت */}
        {showWalletOptions && !walletAddress && (
          <div className="wallet-options-popup">
            {/* تراست ولت */}
            <button
              className="wallet-option trust"
              onClick={() => connectWallet("trustwallet")}
            >
              <img
                src="/logo1.png"
                alt="Trust Wallet Logo"
                className="wallet-logo"
              />
              Trust Wallet
              <span className="help-icon" onClick={toggleTrustHelp}>?</span>
            </button>

            {/* پاپ‌آپ راهنمای تراست ولت */}
            {showTrustHelp && (
              <div className="trust-help-popup">
                <p>
                  To connect with Trust Wallet on mobile, please open this site
                  in the <strong>DApp Browser</strong> of Trust Wallet
                  or use <strong>WalletConnect</strong> to scan the QR code.
                </p>
                <button onClick={toggleTrustHelp}>Close</button>
              </div>
            )}

            {/* متامسک */}
            <button
              className="wallet-option metamask"
              onClick={() => connectWallet("metamask")}
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
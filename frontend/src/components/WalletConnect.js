import React from 'react';
import './walletConnect.css';

const WalletConnect = () => {
  return (
    <div className="wallet-connect">
      <h2>Connect Wallet</h2>
      <p>
        If MetaMask doesn't open automatically, please try one of the options below:
      </p>
      <a
        href="metamask://dapp/luxus-society.vercel.app"
        className="connect-button"
      >
        Open MetaMask (Direct Link)
      </a>
      <br />
      <a
        href="https://metamask.app.link/dapp/luxus-society.vercel.app"
        className="connect-button"
      >
        Open MetaMask (Fallback Link)
      </a>
    </div>
  );
};

export default WalletConnect;
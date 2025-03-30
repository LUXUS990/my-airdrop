import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './walletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setError('');
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]);
      } catch (err) {
        setError(err.message);
      }
    } else {
      // هدایت کاربر به اپ MetaMask با استفاده از deep linking
      window.location.href = "https://metamask.app.link/dapp/luxus-society.vercel.app";
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsConnected(true);
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">
            {account ? ${account.substring(0, 6)}...${account.substring(account.length - 4)} : ''}
          </span>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default WalletConnect;
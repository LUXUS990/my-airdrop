import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './walletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  // تابع اتصال به کیف‌پول
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // درخواست برای متصل شدن به کیف‌پول
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]);
      } else {
        setError('MetaMask یا Trust Wallet نصب نیست.');
      }
    } catch (err) {
      setError('خطا در اتصال به کیف‌پول.');
    }
  };

  // چک کردن وضعیت اتصال به کیف‌پول
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount('');
        } else {
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button onClick={connectWallet} className="connect-button">
          اتصال کیف پول
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
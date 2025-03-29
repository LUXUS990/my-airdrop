import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './walletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  // تابعی که واقعاً اتصال را با چندین لایه اعتبارسنجی چک می‌کند
  const verifyRealConnection = async () => {
    if (!window.ethereum) return false;

    try {
      const web3 = new Web3(window.ethereum);
      
      // 1. بررسی حساب‌های فعال
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) return false;

      // 2. بررسی موجودی
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log('موجودی واقعی:', balance);

      // 3. بررسی شبکه (برای اتصال به شبکه‌های خاص مانند Ethereum یا BSC)
      const chainId = await web3.eth.getChainId();
      console.log('شناسه شبکه:', chainId);

      // فرض کنید که می‌خواهید فقط به شبکه Ethereum Mainnet (ID: 1) یا BSC (ID: 56) متصل شوید
      const requiredChainId = 1; // یا تغییر به 56 برای BSC
      if (chainId !== requiredChainId) {
        throw new Error(لطفاً به شبکه صحیح متصل شوید (شناسه شبکه: ${requiredChainId}));
      }

      return true;
    } catch (e) {
      console.error('خطا در اعتبارسنجی:', e);
      return false;
    }
  };

  const connectWallet = async () => {
    setError('');
    try {
      // 1. بررسی وجود کیف پول
      if (!window.ethereum) {
        throw new Error('لطفاً MetaMask یا Trust Wallet را نصب کنید');
      }

      // 2. درخواست دسترسی واقعی
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // 3. اعتبارسنجی چندمرحله‌ای
      const isValidConnection = await verifyRealConnection();
      if (!isValidConnection) {
        throw new Error('اتصال تأیید نشد. لطفاً مجدد تلاش کنید.');
      }

      setIsConnected(true);
      setAccount(accounts[0]);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
      setAccount('');
    }
  };

  useEffect(() => {
    // بررسی اولیه اتصال هنگام لود صفحه
    const checkInitialConnection = async () => {
      const isConnected = await verifyRealConnection();
      if (isConnected && window.ethereum.selectedAddress) {
        setIsConnected(true);
        setAccount(window.ethereum.selectedAddress);
      }
    };

    checkInitialConnection();

    // گوش دادن به تغییر حساب
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
      return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
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
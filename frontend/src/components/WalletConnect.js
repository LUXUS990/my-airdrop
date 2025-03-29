import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './walletConnect.css';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  // تابعی که اتصال واقعی را با اعتبارسنجی بیشتر چک می‌کند
  const verifyRealConnection = async () => {
    if (!window.ethereum) {
      setError('MetaMask یا کیف پول دیگری نصب نیست.');
      return false;
    }

    try {
      const web3 = new Web3(window.ethereum);

      // بررسی حساب‌های متصل
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError('هیچ حسابی متصل نیست.');
        return false;
      }

      const balance = await web3.eth.getBalance(accounts[0]);
      console.log('موجودی:', balance);

      // بررسی شبکه
      const chainId = await web3.eth.getChainId();
      console.log('شناسه شبکه:', chainId);

      // فرض کنیم فقط به Ethereum Mainnet (ID: 1) نیاز داریم
      const requiredChainId = 1;
      if (chainId !== requiredChainId) {
        setError(لطفاً به شبکه Ethereum متصل شوید (شناسه شبکه: ${requiredChainId}));
        return false;
      }

      return true;
    } catch (e) {
      console.error('خطا در اتصال:', e);
      setError('اتصال نامعتبر. لطفاً دوباره تلاش کنید.');
      return false;
    }
  };

  const connectWallet = async () => {
    setError('');
    try {
      // بررسی وجود Ethereum
      if (!window.ethereum) {
        throw new Error('لطفاً MetaMask یا Trust Wallet را نصب کنید.');
      }

      // درخواست دسترسی به کیف پول
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // بررسی اعتبارسنجی چندمرحله‌ای
      const isValidConnection = await verifyRealConnection();
      if (!isValidConnection) {
        throw new Error('اتصال تأیید نشد.');
      }

      setIsConnected(true);
      setAccount(accounts[0]);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
      setAccount('');
    }
  };

  // تابع برای شناسایی اتصال در موبایل
  const handleConnectMobileWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]);
      } else {
        // اگر MetaMask یا Trust Wallet نصب نیست، به لینک deep هدایت می‌شود
        const deepLink = 'metamask://';
        window.location.href = deepLink;
        setError("MetaMask نصب نیست. لطفاً MetaMask را نصب کنید.");
      }
    } catch (error) {
      console.error(error);
      setError("خطا در اتصال به کیف‌پول.");
    }
  };

  useEffect(() => {
    // بررسی وضعیت اولیه اتصال
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
        <button onClick={handleConnectMobileWallet} className="connect-button">
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
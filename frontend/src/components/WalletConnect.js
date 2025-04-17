import React from 'react';
import './WalletConnect.css';

const WalletConnect = () => {
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // درخواست دسترسی به حساب‌ها
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        alert(متصل شدید به MetaMask. آدرس شما: ${accounts[0]});
        // اینجا می‌توانید کد خرید توکن یا تراکنش‌های دیگر را اضافه کنید.
      } catch (error) {
        console.error(error);
        alert('خطا در اتصال به MetaMask');
      }
    } else {
      // هدایت به deep link متامسک در صورت عدم وجود provider
      window.location.href = https://metamask.app.link/dapp/${window.location.host};
    }
  };

  const connectTrustWallet = async () => {
    if (window.ethereum) {
      try {
        // درخواست دسترسی به حساب‌ها
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        alert(متصل شدید به Trust Wallet. آدرس شما: ${accounts[0]});
      } catch (error) {
        console.error(error);
        alert('خطا در اتصال به Trust Wallet');
      }
    } else {
      // هدایت به deep link مخصوص Trust Wallet در صورت عدم وجود provider
      window.location.href = https://link.trustwallet.com/open_url?coin=ethereum&url=${encodeURIComponent(window.location.href)};
    }
  };

  return (
    <div className="wallet-container">
      <h1>اتصال به MetaMask یا Trust Wallet</h1>
      <div className="button-group">
        <button className="wallet-button" onClick={connectMetaMask}>
          اتصال به MetaMask
        </button>
        <button className="wallet-button" onClick={connectTrustWallet}>
          اتصال به Trust Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
import React, { useState, useEffect } from 'react';
import { Client } from '@walletconnect/client';
import { Web3Modal } from '@walletconnect/web3modal';
import Web3 from 'web3';
import './walletConnect.css';

const WalletConnectV2 = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    try {
      // تنظیم Web3Modal با تنظیمات WalletConnect
      const modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: Client, // استفاده از کتابخانه WalletConnect V2
            options: {
              rpc: {
                1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // استفاده از Infura برای اتصالات به Ethereum
              },
              qrcode: true, // فعال‌سازی QR Code برای اتصال
            },
          },
        },
      });

      // اتصال به کیف‌پول
      const instance = await modal.connect();

      // اتصال Web3 به WalletConnect
      const web3 = new Web3(instance);

      // دریافت حساب‌های متصل
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError('هیچ حسابی متصل نیست.');
        return;
      }

      setAccount(accounts[0]);
      setIsConnected(true);

      // ذخیره provider برای استفاده‌های بعدی
      setProvider(instance);

      // گوش دادن به تغییرات حساب
      instance.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount('');
        } else {
          setAccount(accounts[0]);
        }
      });

      // گوش دادن به تغییرات شبکه
      instance.on('chainChanged', (chainId) => {
        console.log('تغییر شبکه:', chainId);
      });
    } catch (err) {
      setError('اتصال به کیف پول با خطا مواجه شد.');
      console.error(err);
    }
  };

  useEffect(() => {
    // بررسی وضعیت اتصال اولیه
    const checkInitialConnection = async () => {
      const provider = modal?.cachedProvider;
      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      }
    };
    checkInitialConnection();
  }, []);

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button onClick={connectWallet} className="connect-button">
          اتصال به کیف پول
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

export default WalletConnectV2;
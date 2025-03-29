import React, { useState, useEffect } from 'react'; import Web3 from 'web3'; import WalletConnectProvider from '@walletconnect/web3-provider'; import './walletConnect.css';

const WalletConnectComponent = () => { const [provider, setProvider] = useState(null); const [web3, setWeb3] = useState(null); const [account, setAccount] = useState(''); const [error, setError] = useState('');

useEffect(() => { const checkConnection = async () => { if (window.ethereum) { const web3Instance = new Web3(window.ethereum); setWeb3(web3Instance); const accounts = await web3Instance.eth.getAccounts(); if (accounts.length > 0) { setAccount(accounts[0]); } } }; checkConnection(); }, []);

const connectWallet = async () => { try { setError(''); let web3Instance;

if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3Instance = new Web3(window.ethereum);
  } else {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: {
        56: 'https://bsc-dataseed.binance.org/', // BSC Mainnet
        1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      },
      chainId: 56, // یا 1 برای اتریوم
    });

    await walletConnectProvider.enable();
    web3Instance = new Web3(walletConnectProvider);
    setProvider(walletConnectProvider);
  }

  setWeb3(web3Instance);
  const accounts = await web3Instance.eth.getAccounts();
  setAccount(accounts[0]);
} catch (err) {
  setError('اتصال ناموفق بود! لطفاً دوباره تلاش کنید.');
  console.error(err);
}

};

const disconnectWallet = async () => { if (provider) { await provider.disconnect(); setProvider(null); } setAccount(''); setWeb3(null); };

return ( <div className="wallet-connect"> {account ? ( <div className="wallet-info"> <span className="wallet-address"> {${account.substring(0, 6)}...${account.substring(account.length - 4)}} </span> <button onClick={disconnectWallet} className="disconnect-button">قطع اتصال</button> </div> ) : ( <button onClick={connectWallet} className="connect-button">اتصال کیف پول</button> )} {error && <div className="error-message">{error}</div>} </div> ); };

export default WalletConnectComponent;
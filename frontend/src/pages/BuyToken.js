import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './BuyToken.css';
/* global BigInt */

function BuyToken() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [metaMaskError, setMetaMaskError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userPurchaseLimit = 2000;
  const TOKEN_PRICE_BNB = 0.00052;

  const presaleContractAddress = "0x42a312228fe44999f625a495f3930cad28b5820c";
  const presaleABI = [
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "buyTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_multisigOwner",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "FailedCall",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "SafeERC20FailedOperation",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "FundsWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bnbSpent",
          "type": "uint256"
        }
      ],
      "name": "TokensPurchased",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "UnsoldTokensWithdrawn",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawUnsoldTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "luxusToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawalAllowedAfterTimestamp",
      "outputs": [
        {
          "internalType": "uint48",
          "name": "",
          "type": "uint48"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setMetaMaskError(null);
          } else {
            setMetaMaskError("No accounts found in MetaMask.");
          }
  
          // گوش دادن به تغییرات اکانت
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);  // اکانت جدید رو به state اضافه کن
            } else {
              setAccount(null);  // اگر هیچ اکانتی نبود، null بذار
            }
          });
  
        } catch (err) {
          setMetaMaskError("Failed to connect to MetaMask. Please try again.");
        }
      } else {
        setMetaMaskError("MetaMask is not installed. Please install MetaMask to proceed.");
      }
    };
  
    connectToMetaMask();
  
    // پاکسازی listener
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const handleIncrement = () => {
    setTokenAmount(prev => Math.min(prev + 1, userPurchaseLimit));
  };

  const handleDecrement = () => {
    setTokenAmount(prev => Math.max(prev - 1, 0));
  };

  const handleTokenAmountChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= userPurchaseLimit) {
      setTokenAmount(value);
    }
  };

  const handleMaxPurchase = () => {
    setTokenAmount(userPurchaseLimit);
  };

  const handleSliderChange = (e) => {
    setTokenAmount(Number(e.target.value));
  };

  const handleBuyToken = async () => {
    if (!web3 || !account) {
      setMetaMaskError("Please connect to MetaMask first.");
      return;
    }

    setIsLoading(true);
    try {
      const presaleContract = new web3.eth.Contract(presaleABI, presaleContractAddress);
      const priceInWei = web3.utils.toWei(TOKEN_PRICE_BNB.toString(), 'ether');
      const totalPrice = BigInt(priceInWei) * BigInt(tokenAmount);
      const tokenAmountInWei = BigInt(tokenAmount) * 10n ** 18n;

      await presaleContract.methods.buyTokens(tokenAmountInWei.toString()).send({
        from: account,
        value: totalPrice.toString(),
      });

      alert("Tokens purchased successfully!");

      if (window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0xcd00d192d95c4e8e45286afbbc5d5bb40711a40b',
              symbol: 'LUX',
              decimals: 18,
              image: 'https://luxus-society.vercel.app/logo.png',
            },
          },
        });
      }
    } catch (error) {
      console.error("Error buying tokens:", error);
      alert("Error buying tokens: " + (error.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="token-purchase-container">
      <h2 className="section-title">Buy LUXUS Tokens</h2>

      {metaMaskError && <div className="error-message">{metaMaskError}</div>}

      <div className="progress-ring-container">
        <svg className="progress-ring" width="100%" height="100%" viewBox="0 0 200 200">
          <circle
            className="progress-ring-circle progress-ring-fill"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="transparent"
            r="80"
            cx="100"
            cy="100"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00b09b" />
              <stop offset="100%" stopColor="#96c93d" />
            </linearGradient>
          </defs>
        </svg>
        <div className="progress-content">
          <div className="luxus-text">
            LUXUS: As rare as you.<br />Grab yours now!
          </div>
        </div>
      </div>

      <div className="token-controls">
        <button className="control-btn" onClick={handleDecrement}>-</button>
        <div className="token-amount-display">
          <input
            type="number"
            value={tokenAmount}
            onChange={handleTokenAmountChange}
            min="0"
            max={userPurchaseLimit}
            step="1"
          />
          <span>Tokens</span>
        </div>
        <button className="control-btn" onClick={handleIncrement}>+</button>
        <button className="max-btn" onClick={handleMaxPurchase}>Max</button>
      </div>

      <div className="slider-container">
        <label>Select Token Amount:</label>
        <input
          type="range"
          min="0"
          max={userPurchaseLimit}
          step="1"
          value={tokenAmount}
          onChange={handleSliderChange}
          className="token-slider"
        />
        <div className="slider-value">
          <img
            src="/logo.png"
            alt="Luxus Logo"
            className="slider-value-logo"
          />
          {tokenAmount} Tokens
        </div>
      </div>

      <div className="payment-details">
        <div className="detail-row">
          <span>Token Price (BNB):</span>
          <span>{TOKEN_PRICE_BNB} BNB</span>
        </div>
        <div className="detail-row">
          <span>Total Amount (BNB):</span>
          <span>{(tokenAmount * TOKEN_PRICE_BNB).toFixed(6)} BNB</span>
        </div>
        <div className="detail-row">
          <span>Remaining Purchase Limit:</span>
          <span>{userPurchaseLimit - tokenAmount} Tokens</span>
        </div>
      </div>

      <button
        className="purchase-btn"
        disabled={tokenAmount <= 0 || !web3 || !account || isLoading}
        onClick={handleBuyToken}
      >
        {isLoading ? "Processing..." : "Buy Token"}
      </button>

      <button
        className="add-token-btn"
        onClick={async () => {
          try {
            await window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: '0xc4bfe74dd0d47d82d072feeb237a1d9375fa4b2d',
                  symbol: 'LUX',
                  decimals: 18,
                  image: 'https://luxus-society.vercel.app/logo.png',
                },
              },
            });
            alert('Token added to MetaMask!');
          } catch (error) {
            console.error('Error adding token:', error);
            alert('Failed to add token to MetaMask.');
          }
        }}
      >
        Add LUX to MetaMask
      </button>
    </div>
  );
}

export default BuyToken;
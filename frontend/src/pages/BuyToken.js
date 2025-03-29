import React, { useState, useEffect } from 'react';
import './BuyToken.css';

function BuyToken() {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [maxTokens] = useState(30000000); // Total tokens available (30 million)
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [tokenPrice] = useState(0.01); // Price per token in BNB

  // Calculate progress and total amount
  useEffect(() => {
    const calculatedProgress = (tokenAmount / maxTokens) * 100;
    setProgress(Math.min(calculatedProgress, 100));
  }, [tokenAmount, maxTokens]);

  const handleIncrement = () => {
    if (tokenAmount < maxTokens) {
      setTokenAmount(prev => Math.min(prev + 100, maxTokens)); // Increment by 100 tokens
    }
  };

  const handleDecrement = () => {
    if (tokenAmount > 0) {
      setTokenAmount(prev => Math.max(prev - 100, 0)); // Decrement by 100 tokens
    }
  };

  return (
    <div className="token-purchase-container">
      <h2 className="section-title">Buy Token</h2>
      
      {/* Interactive progress ring */}
      <div 
        className="progress-ring-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring-circle"
            stroke="#f3f3f3"
            strokeWidth="12"
            fill="transparent"
            r="80"
            cx="100"
            cy="100"
          />
          <circle
            className="progress-ring-circle"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="transparent"
            r="80"
            cx="100"
            cy="100"
            strokeDasharray={`${progress * 5.02} 502`}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00b09b" />
              <stop offset="100%" stopColor="#96c93d" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="progress-content">
          {isHovering ? (
            <>
              <div className="progress-value">{tokenAmount} Tokens</div>
              <div className="progress-text">{(tokenPrice * tokenAmount).toFixed(2)} BNB</div>
            </>
          ) : (
            <>
              <div className="progress-value">{Math.round(progress)}%</div>
              <div className="progress-text">Purchase Progress</div>
            </>
          )}
        </div>
      </div>

      {/* Purchase controls */}
      <div className="token-controls">
        <button className="control-btn" onClick={handleDecrement}>
          -
        </button>
        
        <div className="token-amount-display">
          <input
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Math.min(Number(e.target.value), maxTokens))}
            min="0"
            max={maxTokens}
          />
          <span>Tokens</span>
        </div>
        
        <button className="control-btn" onClick={handleIncrement}>
          +
        </button>
      </div>

      {/* Payment details */}
      <div className="payment-details">
        <div className="detail-row">
          <span>Price per Token:</span>
          <span>{tokenPrice} BNB</span>
        </div>
        <div className="detail-row">
          <span>Total Amount:</span>
          <span>{(tokenPrice * tokenAmount).toFixed(6)} BNB</span>
        </div>
        <div className="detail-row">
          <span>Remaining Tokens:</span>
          <span>{maxTokens - tokenAmount}</span>
        </div>
      </div>

      <button className="purchase-btn" disabled={tokenAmount <= 0}>
        Buy Token
      </button>
    </div>
  );
}

export default BuyToken;
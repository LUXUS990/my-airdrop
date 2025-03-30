import React, { useState, useEffect } from 'react';
import './BuyToken.css';

function BuyToken() {
  // حداکثر توکن قابل خرید توسط کاربر
  const userPurchaseLimit = 500;
  // کل توکن‌های موجود در فروش (مثلاً 30 میلیون)
  const totalSupply = 30000000;
  // تعداد توکن‌های فروخته شده تا کنون (برای مثال، باید از قرارداد هوشمند یا API دریافت شود)
  const overallSold = 1234567; // این مقدار نمونه است

  const [tokenAmount, setTokenAmount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const tokenPrice = 0.01; // قیمت هر توکن به BNB

  // محاسبه درصد فروش کل
  useEffect(() => {
    const calculatedProgress = (overallSold / totalSupply) * 100;
    setProgress(Math.min(calculatedProgress, 100));
  }, [overallSold, totalSupply]);

  const handleIncrement = () => {
    if (tokenAmount < userPurchaseLimit) {
      setTokenAmount(prev => Math.min(prev + 1, userPurchaseLimit));
    }
  };

  const handleDecrement = () => {
    if (tokenAmount > 0) {
      setTokenAmount(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="token-purchase-container">
      {/* Top bar */}
      <div className="top-bar">
        <h2>Buy LUXUS Tokens</h2>
      </div>
      
      {/* Interactive progress ring showing overall sale progress */}
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
            strokeDasharray={`${progress * 5.02} 502}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }`}
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
              <div className="progress-value">{overallSold} Sold</div>
              <div className="progress-text">{(tokenPrice * overallSold).toFixed(2)} BNB</div>
            </>
          ) : (
            <>
              <div className="progress-value">{Math.round(progress)}%</div>
              <div className="progress-text">Total Sale Progress</div>
            </>
          )}
        </div>
      </div>

      {/* Purchase controls for user */}
      <div className="token-controls">
        <button className="control-btn" onClick={handleDecrement}>-</button>
        
        <div className="token-amount-display">
          <input
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Math.min(Number(e.target.value), userPurchaseLimit))}
            min="0"
            max={userPurchaseLimit}
          />
          <span>Tokens</span>
        </div>
        
        <button className="control-btn" onClick={handleIncrement}>+</button>
      </div>

      {/* Payment details for user's purchase */}
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
          <span>Remaining Purchase Limit:</span>
          <span>{userPurchaseLimit - tokenAmount}</span>
        </div>
      </div>

      <button className="purchase-btn" disabled={tokenAmount <= 0}>
        Buy Token
      </button>
    </div>
  );
}

export default BuyToken;
import React, { useState, useEffect } from 'react';
import './BuyToken.css';

function BuyToken() {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [maxTokens] = useState(1000);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [tokenPrice] = useState(0.01); // قیمت هر توکن بر حسب BNB

  // محاسبه پیشرفت و مبلغ
  useEffect(() => {
    const calculatedProgress = (tokenAmount / maxTokens) * 100;
    setProgress(Math.min(calculatedProgress, 100));
  }, [tokenAmount, maxTokens]);

  const handleIncrement = () => {
    if (tokenAmount < maxTokens) {
      setTokenAmount(prev => Math.min(prev + 100, maxTokens));
    }
  };

  const handleDecrement = () => {
    if (tokenAmount > 0) {
      setTokenAmount(prev => Math.max(prev - 100, 0));
    }
  };

  return (
    <div className="token-purchase-container">
      <h2 className="section-title">خرید توکن اختصاصی</h2>
      
      {/* نمودار دایره‌ای تعاملی */}
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
              <div className="progress-value">{tokenAmount} توکن</div>
              <div className="progress-text">{(tokenPrice * tokenAmount).toFixed(2)} BNB</div>
            </>
          ) : (
            <>
              <div className="progress-value">{Math.round(progress)}%</div>
              <div className="progress-text">پیشرفت خرید</div>
            </>
          )}
        </div>
      </div>

      {/* کنترل‌های خرید */}
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
          <span>توکن</span>
        </div>
        
        <button className="control-btn" onClick={handleIncrement}>
          +
        </button>
      </div>

      {/* اطلاعات پرداخت */}
      <div className="payment-details">
        <div className="detail-row">
          <span>قیمت هر توکن:</span>
          <span>{tokenPrice} BNB</span>
        </div>
        <div className="detail-row">
          <span>مبلغ کل:</span>
          <span>{(tokenPrice * tokenAmount).toFixed(6)} BNB</span>
        </div>
        <div className="detail-row">
          <span>توکن باقیمانده:</span>
          <span>{maxTokens - tokenAmount}</span>
        </div>
      </div>

      <button className="purchase-btn" disabled={tokenAmount <= 0}>
        خرید توکن
      </button>
    </div>
  );
}

export default BuyToken;
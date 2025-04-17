import React, { useRef } from 'react';
import './Roadmap.css';

function Roadmap() {
  const roadmapRef = useRef(null);

  // مایلستون‌های حرفه‌ای بر اساس برنامه مالی و توسعه
  const milestones = [
    { title: "Smart Contract Development and Security Audit" },
    { title: "Launch of Pre-Sale Platform for 17M Tokens" },
    { title: "Official Website and Community Hub Deployment" },
    { title: "Initiation of Marketing and Investor Outreach" },
    { title: "Allocation of 3M Tokens to Liquidity Pool" },
    { title: "Utilization of Pre-Sale Funds for Development" },
    { title: "Strategic Partnerships with DeFi Ecosystems" },
    { title: "Community Reward Program Rollout" },
    { title: "Token Holder Incentive System Activation" },
    { title: "Public Beta of Decentralized Platform" },
    { title: "Integration with Scalable Layer 2 Solutions" },
    { title: "Staking Mechanism with Flexible Rewards" },
    { title: "Listing on Top-Tier Centralized Exchanges" },
    { title: "Implementation of Community Governance" },
    { title: "Cross-Chain Functionality Deployment" },
    { title: "Launch of Advanced Financial Features" },
    { title: "Long-Term Ecosystem Sustainability" },
  ];

  return (
    <div className="roadmap-container" ref={roadmapRef}>
      <h1 className="roadmap-title">Project Roadmap</h1>

      <div className="roadmap-content">
        <div className="token-info">
          <h2>Token Details</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Token Name:</span>
              <span className="info-value">LUXUS</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Supply:</span>
              <span className="info-value">30,000,000 LUX</span>
            </div>
            <div className="info-item">
              <span className="info-label">Pre-Sale Allocation:</span>
              <span className="info-value">17,000,000 LUX</span>
            </div>
            <div className="info-item">
              <span className="info-label">Liquidity Pool:</span>
              <span className="info-value">3,000,000 LUX</span>
            </div>
            <div className="info-item">
              <span className="info-label">Team & Future Dev:</span>
              <span className="info-value">10,000,000 LUX (Locked)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Blockchain:</span>
              <span className="info-value">BNB Smart Chain</span>
            </div>
          </div>
        </div>

        <div className="timeline-scroll-container">
          <div className="timeline">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="timeline-item">
                <div className="timeline-item-content">
                  <span className="pending-icon">•</span>
                  {milestone.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
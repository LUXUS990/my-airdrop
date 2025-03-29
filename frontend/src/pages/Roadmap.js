import React, { useRef } from 'react'; 
import './Roadmap.css';

function Roadmap() {
  const roadmapRef = useRef(null);

  // اطلاعات مایلستون‌ها و توضیحات هر فاز
  const milestones = [
    { title: "Development of the smart contract and test network", description: "Building the smart contract and testing it on the test network." },
    { title: "Token Generation Event (TGE)", description: "Token distribution event for early investors and partners." },
    { title: "Official website launch", description: "Launching the official website for the project." },
    { title: "Attracting initial investors and strategic partners", description: "Building relationships and attracting investors for the project." },
    { title: "Liquidity pool setup on DEX exchanges", description: "Setting up liquidity pools on decentralized exchanges for token trading." },
    { title: "Collaborations with strategic ecosystem projects", description: "Partnering with other projects in the ecosystem for mutual growth." },
    { title: "Airdrop campaign for the community", description: "Airdrop of tokens to the community to increase awareness and engagement." },
    { title: "Implementation of a reward system for holders", description: "Reward system for token holders to incentivize long-term holding." },
    { title: "Initial launch of the decentralized exchange (DEX)", description: "Launching the first version of the decentralized exchange (DEX)." },
    { title: "Integration with Layer 2 networks for lower transaction fees", description: "Reducing transaction fees by integrating with Layer 2 solutions." },
    { title: "Deployment of staking system with daily rewards", description: "Implementing a staking system with rewards for stakers." },
    { title: "Listing on major centralized exchanges (CEX)", description: "Listing the token on major centralized exchanges for wider access." },
    { title: "Launch of DAO governance system", description: "Launching the DAO system to allow token holders to participate in decision-making." },
    { title: "Expansion to multi-chain networks", description: "Expanding the project to support multiple blockchain networks." },
    { title: "Implementation of decentralized lending system", description: "Implementing a decentralized lending platform for users to borrow and lend tokens." },
    { title: "Achieving profitability and sustainable revenue", description: "The project reaches profitability and sustainable revenue streams." }
  ];

  return (
    <div className="roadmap-container" ref={roadmapRef}>
      <h1 className="roadmap-title">Project Roadmap</h1>

      <div className="timeline-scroll-container">
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-item-content">
                <span className="pending-icon">•</span>
                {milestone.title}
                <div className="phase-description">{milestone.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="token-info">
        <h2>Token Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Token Name:</span>
            <span className="info-value">LUXUS</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Supply:</span>
            <span className="info-value">30,000,000</span>
          </div>
          <div className="info-item">
            <span className="info-label">Network:</span>
            <span className="info-value">BSC</span>
          </div>
          <div className="info-item">
            <span className="info-label">Contract Address:</span>
            <span className="info-value">0x12...3456</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
import React, { useRef } from 'react';
import './Roadmap.css';

function Roadmap() {
  const roadmapRef = useRef(null);
  
  const phases = [
    {
      title: "فاز اول - راه‌اندازی",
      date: "سه‌ماهه اول ۱۴۰۳",
      completed: true,
      milestones: [
        "توسعه قرارداد هوشمند و تست نتورک",
        "عرضه اولیه توکن (Token Generation Event)",
        "راه‌اندازی وبسایت رسمی پروژه",
        "جذب سرمایه‌گذاران اولیه و شرکای استراتژیک"
      ]
    },
    {
      title: "فاز دوم - توسعه",
      date: "سه‌ماهه دوم ۱۴۰۳",
      completed: true,
      milestones: [
        "راه‌اندازی استخر نقدینگی در صرافی‌های DEX",
        "همکاری با پروژه‌های استراتژیک در اکوسیستم",
        "برگزاری کمپین ایردراپ برای جامعه کاربری",
        "پیاده‌سازی سیستم پاداش برای هولدرها"
      ]
    },
    {
      title: "فاز سوم - گسترش",
      date: "سه‌ماهه سوم ۱۴۰۳",
      completed: false,
      milestones: [
        "راه‌اندازی نسخه اولیه صرافی غیرمتمرکز پروژه",
        "ادغام با شبکه‌های لایه ۲ برای کاهش کارمزدها",
        "راه‌اندیمی سیستم استیکینگ با سود روزانه",
        "اضافه شدن به صرافی‌های متمرکز بزرگ"
      ]
    },
    {
      title: "فاز چهارم - بلوغ",
      date: "سه‌ماهه چهارم ۱۴۰۳",
      completed: false,
      milestones: [
        "راه‌اندازی سیستم DAO برای حکومت‌دهی غیرمتمرکز",
        "گسترش به شبکه‌های چندزنجیره‌ای",
        "پیاده‌سازی سیستم وام‌دهی غیرمتمرکز",
        "رسیدن به مرحله سوددهی و درآمدزایی پایدار"
      ]
    }
  ];

  return (
    <div className="roadmap-container" ref={roadmapRef}>
      <h1 className="roadmap-title">نقشه راه پروژه</h1>
      
      <div className="timeline-scroll-container">
        <div className="timeline">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className={`timeline-item ${phase.completed ? 'completed' : ''} ${index === 2 ? 'current' : ''}`}
            >
              <div className="timeline-item-content">
                <div className="phase-header">
                  <h3>{phase.title}</h3>
                  <span className="phase-date">{phase.date}</span>
                </div>
                <ul className="milestones">
                  {phase.milestones.map((milestone, i) => (
                    <li key={i}>
                      {phase.completed ? (
                        <span className="completed-icon">✓</span>
                      ) : (
                        <span className="pending-icon">•</span>
                      )}
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="token-info">
        <h2>اطلاعات فنی توکن</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">نام توکن:</span>
            <span className="info-value">LUXUS</span>
          </div>
          <div className="info-item">
            <span className="info-label">تعداد کل:</span>
            <span className="info-value">30,000,000</span>
          </div>
          <div className="info-item">
            <span className="info-label">شبکه:</span>
            <span className="info-value">BSC</span>
          </div>
          <div className="info-item">
            <span className="info-label">قرارداد:</span>
            <span className="info-value">0x12...3456</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
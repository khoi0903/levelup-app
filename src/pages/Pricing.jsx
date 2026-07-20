import React from 'react';
import { Check, Star, Users, HelpCircle, ArrowLeft } from 'lucide-react';

export default function Pricing({ onSelectPlan, currentPlan = 'free', fromProfile = false, onBack }) {
  const plans = [
    {
      id: 'free',
      name: 'LevelUp Free',
      price: '0VNĐ',
      period: 'tháng',
      features: [
        'Chat cơ bản với AI Coach (giới hạn)',
        '3 giáo án tập luyện cơ bản',
        'Tham gia nhóm cộng đồng chung'
      ],
      icon: HelpCircle,
      recommended: false,
      buttonText: 'Bắt đầu miễn phí'
    },
    {
      id: 'pro',
      name: 'LevelUp Pro',
      price: '49.000VNĐ',
      period: 'tháng',
      badge: 'MOST POPULAR',
      badgeColor: 'orange',
      features: [
        'Unlimited AI coaching (Aura)',
        'Personalized adaptive plans',
        'Advanced analytics',
        'Exclusive challenges',
        'No ads'
      ],
      icon: Star,
      recommended: true,
      buttonText: 'Nâng cấp ngay'
    },
    {
      id: 'squad',
      name: 'LevelUp Squad',
      price: '399.000VNĐ',
      period: 'năm',
      badge: 'Save 30%',
      badgeColor: 'green',
      features: [
        'All Pro features for you and a friend.'
      ],
      icon: Users,
      recommended: false,
      buttonText: 'Chọn nhóm'
    }
  ];

  return (
    <div className="pricing-screen fade-in">
      <div className="pricing-header-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="step-indicator-text">BƯỚC 2/2</span>
        <div style={{ width: 28 }}></div>
      </div>

      <div className="pricing-intro">
        <h2 className="pricing-title">Chọn gói dịch vụ của bạn</h2>
        <p className="pricing-subtitle">
          Mở khóa toàn bộ tiềm năng tập luyện với gói dịch vụ phù hợp nhất.
        </p>
      </div>

      <div className="plans-list">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`plan-card ${isCurrent ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}`}
            >
              {plan.badge && (
                <div className={`plan-badge-figma ${plan.badgeColor === 'orange' ? 'badge-orange' : 'badge-green'}`}>
                  {plan.badge}
                </div>
              )}
              
              <div className="plan-card-top">
                <h3 className="plan-name-figma">{plan.name}</h3>
                <div className="plan-price-figma">
                  <span className="price-num">{plan.price}</span>
                  <span className="price-sub">/{plan.period}</span>
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <Check size={14} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline'} plan-card-btn w-full`}
                onClick={() => onSelectPlan(plan.id)}
              >
                {fromProfile && isCurrent ? 'Gói hiện tại' : plan.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

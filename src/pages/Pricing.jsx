import React from 'react';
import { Check, Star, Users, HelpCircle, ArrowLeft } from 'lucide-react';

export default function Pricing({ onSelectPlan, currentPlan = 'free', fromProfile = false, onBack }) {
  const plans = [
    {
      id: 'free',
      name: 'LevelUp Free',
      price: '0 VND',
      period: 'trọn đời',
      features: [
        '3 giáo án tập luyện cơ bản',
        'Chat cơ bản với AI Coach (giới hạn)',
        'Tham gia nhóm cộng đồng chung'
      ],
      icon: HelpCircle,
      recommended: false,
      color: 'gray'
    },
    {
      id: 'pro',
      name: 'LevelUp Pro',
      price: '49.000 VND',
      period: 'tháng',
      features: [
        'Không giới hạn giáo án tập luyện',
        'Huấn luyện viên AI Aura 24/7',
        'Lịch theo dõi kỷ luật đầy đủ',
        'Tùy chỉnh giọng nói Coach Aura',
        'Báo cáo phân tích tiến trình nâng cao'
      ],
      icon: Star,
      recommended: true,
      color: 'blue'
    },
    {
      id: 'squad',
      name: 'LevelUp Squad',
      price: '399.000 VND',
      period: 'năm',
      features: [
        'Tất cả tính năng của bản Pro',
        'Hỗ trợ nhóm lên tới 5 thành viên',
        'Thử thách nhóm & BXH riêng biệt',
        'Phân tích & phản hồi nhóm hàng tuần'
      ],
      icon: Users,
      recommended: false,
      color: 'purple'
    }
  ];

  return (
    <div className="pricing-screen fade-in">
      <div className="pricing-header-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={20} />
        </button>
        <span className="pricing-logo-text">LevelUp</span>
        <div style={{ width: 28 }}></div> {/* Spacer for center alignment */}
      </div>

      {!fromProfile && (
        <div className="onboarding-progress">
          <div className="progress-step-text">BƯỚC 2 / 2</div>
          <div className="progress-track-full">
            <div className="progress-bar-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
      )}

      <div className="pricing-intro">
        <h2 className="pricing-title">Chọn gói dịch vụ của bạn</h2>
        <p className="pricing-subtitle">
          Mở khóa toàn bộ tiềm năng tập luyện với gói dịch vụ phù hợp nhất.
        </p>
      </div>

      <div className="plans-list">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`plan-card ${isCurrent ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''} ${plan.id === 'squad' ? 'squad-card' : ''}`}
            >
              {plan.recommended && (
                <div className="recommended-badge">
                  <Star size={12} fill="currentColor" /> PHỔ BIẾN NHẤT
                </div>
              )}
              {plan.id === 'squad' && (
                <div className="squad-badge">
                  TIẾT KIỆM 30%
                </div>
              )}
              
              <div className="plan-header-info">
                <div className="plan-name-wrapper">
                  <Icon size={18} className="plan-icon" />
                  <span className="plan-name">{plan.name}</span>
                </div>
                <div className="plan-price-block">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">/{plan.period}</span>
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
                className={`btn ${isCurrent ? 'btn-outline' : 'btn-primary'} plan-card-btn`}
                onClick={() => onSelectPlan(plan.id)}
                disabled={isCurrent}
              >
                {isCurrent ? 'Gói hiện tại' : (plan.id === 'free' ? 'Chọn gói này' : 'Nâng cấp ngay')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

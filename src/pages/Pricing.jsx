import React from 'react';
import { ArrowLeft, Check, Users, Lock, CheckCircle2 } from 'lucide-react';

export default function Pricing({ onSelectPlan, currentPlan = 'free', fromProfile = false, onBack }) {
  // Mouse drag-to-scroll hooks for easy horizontal swipe of pricing cards
  const scrollRef = React.useRef(null);
  const [isDown, setIsDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeftState, setScrollLeftState] = React.useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className="pricing-screen fade-in">
      {/* Header Navigation */}
      <div className="pricing-header-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="step-indicator-text">BƯỚC 2/4</span>
        <div style={{ width: 28 }}></div>
      </div>

      {/* Intro */}
      <div className="pricing-intro text-center">
        <h2 className="pricing-title">Chọn gói dịch vụ của bạn</h2>
        <p className="pricing-subtitle">
          Mở khóa toàn bộ tiềm năng tập luyện với gói dịch vụ phù hợp nhất.
        </p>
      </div>

      {/* Plans Stack */}
      <div 
        ref={scrollRef}
        className="figma-plans-stack"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDown ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        {/* Card 1: LevelUp Free */}
        <div className="figma-plan-card free-card">
          <h3 className="figma-plan-title">LevelUp Free</h3>
          <div className="figma-plan-price-row">
            <span className="figma-price-amount">0VNĐ</span>
            <span className="figma-price-period">/tháng</span>
          </div>

          <ul className="figma-plan-features">
            <li>
              <CheckCircle2 size={16} color="#64748B" className="feature-check" />
              <span>Chat cơ bản với AI Coach (giới hạn)</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#64748B" className="feature-check" />
              <span>3 giáo án tập luyện cơ bản</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#64748B" className="feature-check" />
              <span>Tham gia nhóm cộng đồng chung</span>
            </li>
          </ul>

          <button
            className="figma-plan-btn outline-btn w-full"
            onClick={() => onSelectPlan('free')}
          >
            {fromProfile && currentPlan === 'free' ? 'Gói hiện tại' : 'Bắt đầu miễn phí'}
          </button>
        </div>

        {/* Card 2: LevelUp Pro (Blue Hero Card) */}
        <div className="figma-plan-card pro-hero-card">
          <div className="pro-card-header">
            <h3 className="figma-plan-title text-white">LevelUp Pro</h3>
            <span className="figma-badge-orange">PHỔ BIẾN NHẤT</span>
          </div>

          <div className="figma-plan-price-row text-white">
            <span className="figma-price-amount">49.000VNĐ</span>
            <span className="figma-price-period text-white-70">/tháng</span>
          </div>

          <ul className="figma-plan-features text-white">
            <li>
              <CheckCircle2 size={16} color="#FFFFFF" className="feature-check" />
              <span>Không giới hạn chat AI Coach (Aura)</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#FFFFFF" className="feature-check" />
              <span>Lộ trình tập luyện cá nhân hóa</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#FFFFFF" className="feature-check" />
              <span>Phân tích tiến trình nâng cao</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#FFFFFF" className="feature-check" />
              <span>Thử thách đặc quyền hàng tuần</span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#FFFFFF" className="feature-check" />
              <span>Không bị gián đoạn bởi quảng cáo</span>
            </li>
          </ul>

          <button
            className="figma-plan-btn solid-white-btn w-full"
            onClick={() => onSelectPlan('pro')}
          >
            {fromProfile && currentPlan === 'pro' ? 'Gói hiện tại' : 'Nâng cấp ngay'}
          </button>
        </div>

        {/* Card 3: LevelUp Squad */}
        <div className="figma-plan-card squad-card">
          <div className="squad-card-header">
            <h3 className="figma-plan-title">LevelUp Squad</h3>
            <span className="figma-badge-green">TIẾT KIỆM 30%</span>
          </div>

          <div className="figma-plan-price-row">
            <span className="figma-price-amount">399.000VNĐ</span>
            <span className="figma-price-period">/năm</span>
          </div>

          <ul className="figma-plan-features">
            <li className="squad-feature-item">
              <Users size={18} color="#059669" className="feature-check" />
              <span>Toàn bộ tính năng bản Pro dành cho bạn & đồng đội.</span>
            </li>
          </ul>

          <button
            className="figma-plan-btn outline-btn w-full"
            onClick={() => onSelectPlan('squad')}
          >
            {fromProfile && currentPlan === 'squad' ? 'Gói hiện tại' : 'Chọn nhóm'}
          </button>
        </div>
      </div>

      {/* Bottom Secure Disclaimer */}
      <div className="figma-pricing-secure-footer">
        <Lock size={13} color="#64748B" />
        <span>Hủy bất cứ lúc nào. Thanh toán bảo mật.</span>
      </div>
    </div>
  );
}

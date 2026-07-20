import React, { useState } from 'react';
import { 
  Award, Flame, Zap, Shield, BookOpen, Target, LogOut, Lock, 
  ChevronRight, Swords, Dna, Settings, ArrowLeft, Volume2, Sparkles, X, Check,
  Calendar, Moon, Bell, RefreshCw, CreditCard, TrendingUp
} from 'lucide-react';

export default function Profile({
  userName = 'Nguyễn Chu Thiện Tâm',
  userGoal = 'consistency',
  currentPlan = 'pro',
  xp = 850,
  level = 4,
  onResetOnboarding,
  onLogout,
  setActivePage,
  onUpdateSettings,
  reminderTime = '17:30',
  coachVoice = 'empathetic',
  isDark = false,
  notificationsEnabled = true,
  soundsEnabled = false
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [tempGoal, setTempGoal] = useState(userGoal);

  const goalNames = {
    consistency: 'Xây dựng kỉ luật',
    energy: 'Tăng cường năng lượng',
    strength: 'Cải thiện sức mạnh',
    better_feel: 'Sức khỏe & Tinh thần'
  };

  const planNames = {
    free: 'LevelUp Free',
    pro: 'LevelUp Pro',
    squad: 'LevelUp Squad'
  };

  const figmaBadges = [
    { id: 'newbie', name: 'Người mới', icon: Dna, colorClass: 'blue-circle' },
    { id: 'patient', name: 'Kiên trì', icon: BookOpen, colorClass: 'yellow-circle' },
    { id: 'warrior', name: 'Chiến binh', icon: Swords, colorClass: 'green-circle' },
    { id: 'upcoming', name: 'Sắp tới', icon: Lock, colorClass: 'locked-circle', locked: true }
  ];

  const handleSaveGoal = () => {
    if (onUpdateSettings) {
      onUpdateSettings('userGoal', tempGoal);
    }
    setShowGoalModal(false);
  };

  // ================= VIEW 1: SETTINGS WINDOW (OLD INTEGRATION IN V2 AESTHETICS) =================
  if (showSettings) {
    return (
      <div className="profile-page-v2 settings-view fade-in">
        {/* Header */}
        <div className="settings-header-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <button className="back-btn-icon" onClick={() => setShowSettings(false)} aria-label="Quay lại" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <h2 className="settings-page-title" style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Cài đặt & Hồ sơ</h2>
        </div>

        {/* User Profile Card */}
        <div className="sub-card-v2" style={{ cursor: 'default', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', marginBottom: '20px' }}>
          <div className="profile-avatar-large" style={{ width: '56px', height: '56px', fontSize: '18px', margin: 0 }}>
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <input
              type="text"
              className="profile-name-edit-input-v2"
              value={userName}
              onChange={(e) => onUpdateSettings && onUpdateSettings('userName', e.target.value)}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '14px',
                fontWeight: '800',
                color: '#0f172a',
                outline: 'none',
                width: '100%'
              }}
            />
            <span className="profile-user-role" style={{ fontSize: '11px', color: '#64748B', fontWeight: '750', paddingLeft: '4px' }}>Thành viên {planNames[currentPlan]}</span>
          </div>
        </div>

        {/* Section 1: Hành trình của tôi */}
        <div className="goal-section-v2" style={{ marginBottom: '20px' }}>
          <h4 className="goal-title-v2" style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Hành trình của tôi</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Goal selection */}
            <div className="goal-card-box-v2" onClick={() => { setTempGoal(userGoal); setShowGoalModal(true); }} style={{ cursor: 'pointer' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <Sparkles size={16} color="#0056C6" />
                </div>
                <div>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px' }}>MỤC TIÊU HIỆN TẠI</span>
                  <span className="goal-name-text-v2" style={{ fontSize: '13px' }}>{goalNames[userGoal] || 'Tập luyện'}</span>
                </div>
              </div>
              <span style={{ fontSize: '11.5px', color: '#0056C6', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
                Đổi <ChevronRight size={14} />
              </span>
            </div>

            {/* Reminder Time */}
            <div className="goal-card-box-v2" style={{ cursor: 'default' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <Calendar size={16} color="#0056C6" />
                </div>
                <div>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px' }}>NHẮC NHỜ HÀNG NGÀY</span>
                  <input
                    type="time"
                    className="reminder-time-input"
                    value={reminderTime}
                    onChange={(e) => onUpdateSettings && onUpdateSettings('reminderTime', e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '13px',
                      fontWeight: '800',
                      color: '#0f172a',
                      outline: 'none',
                      padding: 0
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Coach Voice */}
            <div className="goal-card-box-v2" style={{ cursor: 'default' }}>
              <div className="goal-card-left-v2" style={{ width: '100%' }}>
                <div className="goal-icon-circle-v2">
                  <Volume2 size={16} color="#0056C6" />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px' }}>GIỌNG NÓI AI COACH</span>
                  <select
                    className="coach-voice-select"
                    value={coachVoice}
                    onChange={(e) => onUpdateSettings && onUpdateSettings('coachVoice', e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '13px',
                      fontWeight: '800',
                      color: '#0f172a',
                      outline: 'none',
                      width: '100%',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="empathetic">Aura (Đồng cảm & Nhẹ nhàng)</option>
                    <option value="tough_love">Aura (Kỷ luật & Nghiêm khắc)</option>
                    <option value="technical">Aura (Kỹ thuật & Chi tiết)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Đăng ký & Tài chính */}
        <div className="goal-section-v2" style={{ marginBottom: '20px' }}>
          <h4 className="goal-title-v2" style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Đăng ký & Tài chính</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Subscription packages */}
            <div className="goal-card-box-v2" onClick={() => { setShowSettings(false); setActivePage('pricing'); }} style={{ cursor: 'pointer' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <CreditCard size={16} color="#d97706" />
                </div>
                <div>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px' }}>GÓI DỊCH VỤ</span>
                  <span className="goal-name-text-v2" style={{ fontSize: '13px' }}>{planNames[currentPlan]}</span>
                </div>
              </div>
              <span style={{ fontSize: '11.5px', color: '#d97706', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
                Nâng cấp <ChevronRight size={14} />
              </span>
            </div>

            {/* Financial Report P&L */}
            <div className="goal-card-box-v2" onClick={() => setShowFinanceModal(true)} style={{ cursor: 'pointer' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2" style={{ background: '#d1fae5' }}>
                  <TrendingUp size={16} color="#059669" />
                </div>
                <div>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px', color: '#059669' }}>BÁO CÁO TÀI CHÍNH</span>
                  <span className="goal-name-text-v2" style={{ fontSize: '13px', color: '#059669' }}>Dự phóng 2026 - 2028</span>
                </div>
              </div>
              <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
                Xem <ChevronRight size={14} />
              </span>
            </div>

          </div>
        </div>

        {/* Section 3: Cài đặt ứng dụng */}
        <div className="goal-section-v2" style={{ marginBottom: '20px' }}>
          <h4 className="goal-title-v2" style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Cài đặt hệ thống</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Dark Mode toggle */}
            <div className="goal-card-box-v2" style={{ cursor: 'default' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <Moon size={16} color="#475569" />
                </div>
                <span className="goal-name-text-v2" style={{ fontSize: '13px' }}>Giao diện tối (Dark Mode)</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={() => onUpdateSettings && onUpdateSettings('isDark', !isDark)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Push Notifications toggle */}
            <div className="goal-card-box-v2" style={{ cursor: 'default' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <Bell size={16} color="#ef4444" />
                </div>
                <span className="goal-name-text-v2" style={{ fontSize: '13px' }}>Thông báo đẩy (Push)</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() => onUpdateSettings && onUpdateSettings('notificationsEnabled', !notificationsEnabled)}
                />
                <span className="slider"></span>
              </label>
            </div>

          </div>
        </div>

        {/* Reset journey button */}
        <button 
          className="logout-btn-v2" 
          onClick={onResetOnboarding}
          style={{ background: '#f8fafc', borderColor: '#cbd5e1', color: '#64748b', marginTop: '24px' }}
        >
          <RefreshCw size={14} />
          <span>Thiết lập lại Onboarding từ đầu</span>
        </button>

        {/* Finance Forecast Modal Overlay */}
        {showFinanceModal && (
          <div className="modal-overlay fade-in" style={{ zIndex: 2000 }} onClick={() => setShowFinanceModal(false)}>
            <div className="modal-content-card" style={{ padding: '20px' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div className="modal-title-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={20} color="#10B981" />
                  <h3 className="modal-title-text" style={{ fontSize: '16px', fontWeight: '850', margin: 0 }}>Finance Level Up</h3>
                </div>
                <button className="close-btn-icon" onClick={() => setShowFinanceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body-scroll" style={{ maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
                <p className="modal-subtext" style={{ fontSize: '12px', color: '#64748B', margin: '0 0 16px 0' }}>Báo cáo Dự phóng Tài chính 3 năm (2026 - 2028) theo mô hình kinh doanh cập nhật.</p>

                {/* Years Summary Row */}
                <div className="years-summary-grid" style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {[{ y: '2026', r: '833.6M', p: '449.3M' }, { y: '2027', r: '1.00B', p: '554.2M', highlight: true }, { y: '2028', r: '1.20B', p: '692.6M' }].map((yr) => (
                    <div key={yr.y} style={{
                      flex: 1,
                      background: yr.highlight ? '#ebf3ff' : '#f8fafc',
                      border: yr.highlight ? '1.5px solid #0056C6' : '1.5px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '8px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}>
                      <span style={{ fontSize: '8.5px', fontWeight: '800', color: '#64748B' }}>NĂM {yr.y}</span>
                      <strong style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>{yr.r}</strong>
                      <span style={{ fontSize: '8px', fontWeight: '750', color: '#059669' }}>LN: {yr.p}</span>
                    </div>
                  ))}
                </div>

                {/* Financial Table */}
                <div className="financial-table-block" style={{ marginBottom: '16px' }}>
                  <h4 className="table-heading" style={{ fontSize: '12px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>Báo Cáo P&L Dự Phóng (VND)</h4>
                  <table className="pnl-table" style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                        <th style={{ padding: '6px 4px' }}>Chỉ số</th>
                        <th style={{ padding: '6px 4px' }}>2026</th>
                        <th style={{ padding: '6px 4px' }}>2027</th>
                        <th style={{ padding: '6px 4px' }}>2028</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 4px', fontWeight: 800 }}>Tổng Doanh Thu</td>
                        <td style={{ padding: '6px 4px' }}>833.6M</td>
                        <td style={{ padding: '6px 4px' }}>1.00B</td>
                        <td style={{ padding: '6px 4px' }}>1.20B</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 4px', color: '#ef4444' }}>Giá vốn (COGS)</td>
                        <td style={{ padding: '6px 4px' }}>113.0M</td>
                        <td style={{ padding: '6px 4px' }}>135.6M</td>
                        <td style={{ padding: '6px 4px' }}>162.7M</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f0fdf4' }}>
                        <td style={{ padding: '6px 4px', fontWeight: 800, color: '#059669' }}>Lợi Gộp (Gross)</td>
                        <td style={{ padding: '6px 4px' }}>720.6M</td>
                        <td style={{ padding: '6px 4px' }}>864.7M</td>
                        <td style={{ padding: '6px 4px' }}>1.03B</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 4px' }}>Marketing</td>
                        <td style={{ padding: '6px 4px' }}>172.0M</td>
                        <td style={{ padding: '6px 4px' }}>172.0M</td>
                        <td style={{ padding: '6px 4px' }}>172.0M</td>
                      </tr>
                      <tr style={{ borderBottom: '1.5px solid #cbd5e1', background: '#ebf3ff' }}>
                        <td style={{ padding: '6px 4px', fontWeight: 900, color: '#0056C6' }}>LN Ròng (Net)</td>
                        <td style={{ padding: '6px 4px' }}>449.3M</td>
                        <td style={{ padding: '6px 4px' }}>554.2M</td>
                        <td style={{ padding: '6px 4px' }}>692.6M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Streams Info */}
                <div className="streams-info-card" style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>3 Dòng Doanh Thu (Revenue Streams)</h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', color: '#64748B', lineHeight: '1.4' }}>
                    <li><strong>E-commerce Affiliate:</strong> Bán phụ kiện & thực phẩm bổ sung.</li>
                    <li><strong>Ads & Surveys:</strong> Quảng cáo thương hiệu tài trợ trong app.</li>
                    <li><strong>Subscriptions:</strong> Gói đăng ký LevelUp Pro & Squad.</li>
                  </ul>
                </div>
              </div>

              <button className="btn btn-primary w-full mt-3" onClick={() => setShowFinanceModal(false)}>
                Đóng Báo Cáo
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= VIEW 2: MAIN ACHIEVEMENTS VIEW =================
  return (
    <div className="profile-page-v2 fade-in">
      
      {/* 1. Header Title with Settings gear */}
      <div className="profile-header-v2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="profile-brand-title">LevelUp</h2>
        <button 
          className="settings-gear-btn-v2" 
          onClick={() => setShowSettings(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          aria-label="Cài đặt"
        >
          <Settings size={20} color="#0056C6" />
        </button>
      </div>

      {/* 2. User Profile Info */}
      <div className="profile-user-card-v2">
        <div className="avatar-container-v2">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
            alt="Profile Avatar" 
            className="avatar-img-v2"
          />
          <div className="avatar-edit-badge">
            <span className="pencil-icon">✎</span>
          </div>
        </div>
        <h3 className="profile-name-v2">{userName}</h3>
        <span className="profile-join-date">Thành viên từ tháng 01, 2024</span>
      </div>

      {/* 3. Rank Card (Hạng Vàng) */}
      <div className="rank-card-v2" onClick={() => setActivePage('progress')}>
        <div className="rank-left-v2">
          <div className="rank-icon-bg-v2">
            <Award size={20} color="#ffffff" />
          </div>
          <div className="rank-info-v2">
            <span className="rank-lbl-v2">XẾP HẠNG HIỆN TẠI</span>
            <span className="rank-name-v2">Hạng Vàng</span>
          </div>
        </div>
        <ChevronRight size={18} color="#ffffff" opacity={0.8} />
      </div>

      {/* 4. Subscription Card (LevelUp Pro) */}
      <div className="sub-card-v2" onClick={() => setActivePage('pricing')}>
        <div className="sub-left-v2">
          <div className="sub-icon-bg-v2">
            <Shield size={18} color="#0056C6" />
          </div>
          <div className="sub-info-v2">
            <span className="sub-lbl-v2">GÓI HIỆN TẠI</span>
            <span className="sub-name-v2">{planNames[currentPlan]}</span>
          </div>
        </div>
        <div className="sub-price-v2">
          <span className="price-val">
            {currentPlan === 'free' ? '0 VNĐ' : currentPlan === 'pro' ? '49.000 VNĐ' : '399.000 VNĐ'}
          </span>
          <span className="price-lbl">
            {currentPlan === 'squad' ? '/năm' : '/tháng'}
          </span>
        </div>
      </div>

      {/* 5. Metrics Grid (12,500 kcal & 12 ngày) */}
      <div className="profile-stats-grid-v2">
        {/* Kcal Card */}
        <div className="stat-card-item-v2">
          <div className="stat-icon-wrapper-v2 kcal-bg">
            <Flame size={16} color="#EF4444" fill="#EF4444" />
          </div>
          <div className="stat-text-wrapper-v2">
            <span className="stat-value-v2">12,500</span>
            <span className="stat-label-v2">Kcal tiêu thụ</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="stat-card-item-v2">
          <div className="stat-icon-wrapper-v2 streak-bg">
            <Zap size={16} color="#10B981" fill="#10B981" />
          </div>
          <div className="stat-text-wrapper-v2">
            <span className="stat-value-v2">12 ngày</span>
            <span className="stat-label-v2">Chuỗi hiện tại</span>
          </div>
        </div>
      </div>

      {/* 6. Badges Row */}
      <div className="badges-section-v2">
        <div className="badges-header-v2">
          <h4 className="badges-title-v2">Huy hiệu đạt được</h4>
          <button className="badges-link-v2" onClick={() => setActivePage('progress')}>Xem tất cả</button>
        </div>

        <div className="badges-row-v2">
          {figmaBadges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div key={badge.id} className="badge-pill-item-v2">
                <div className={`badge-circle-v2 ${badge.colorClass}`}>
                  <IconComponent size={20} />
                </div>
                <span className="badge-name-v2">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Rank Progress Tracker */}
      <div className="rank-progress-card-v2">
        <div className="progress-top-row-v2">
          <span className="progress-lbl-v2">Tiến trình lên hạng</span>
          <span className="progress-val-v2">{xp} / 1,200 XP</span>
        </div>
        <div className="progress-track-v2">
          <div className="progress-fill-v2" style={{ width: `${(xp / 1200) * 100}%` }}></div>
        </div>
        <p className="progress-subtext-v2">Còn 350 XP nữa để đạt hạng Bạch Kim</p>
      </div>

      {/* 8. Goal Box */}
      <div className="goal-section-v2">
        <h4 className="goal-title-v2">Mục tiêu hiện tại</h4>
        <div className="goal-card-box-v2">
          <div className="goal-card-left-v2">
            <div className="goal-icon-circle-v2">
              <Target size={18} color="#0056C6" />
            </div>
            <span className="goal-name-text-v2">{goalNames[userGoal] || 'Xây dựng kỉ luật'}</span>
          </div>
          <button className="goal-change-btn-v2" onClick={() => { setTempGoal(userGoal); setShowGoalModal(true); }}>
            Thay đổi mục tiêu
          </button>
        </div>
      </div>

      {/* 9. Logout Button */}
      <button className="logout-btn-v2" onClick={onLogout}>
        <LogOut size={16} />
        <span>Đăng xuất</span>
      </button>

      {/* ================= GOAL CHANGE MODAL OVERLAY ================= */}
      {showGoalModal && (
        <div className="modal-overlay fade-in" style={{ zIndex: 1000 }} onClick={() => setShowGoalModal(false)}>
          <div className="modal-content-card" style={{ padding: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="modal-title-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={20} color="#0056C6" />
                <h3 className="modal-title-text" style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>Đổi mục tiêu tập luyện</h3>
              </div>
              <button className="close-btn-icon" onClick={() => setShowGoalModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {Object.entries(goalNames).map(([key, name]) => {
                const isSelected = tempGoal === key;
                return (
                  <div 
                    key={key} 
                    className={`goal-card-box-v2 ${isSelected ? 'selected' : ''}`}
                    onClick={() => setTempGoal(key)}
                    style={{ 
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #0056C6' : '1.5px solid #e2e8f0',
                      background: isSelected ? '#ebf3ff' : '#ffffff'
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: '800', color: isSelected ? '#0056C6' : '#0f172a' }}>{name}</span>
                    {isSelected && <Check size={16} color="#0056C6" />}
                  </div>
                );
              })}
            </div>

            <button className="btn btn-primary w-full" onClick={handleSaveGoal}>
              Lưu mục tiêu
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

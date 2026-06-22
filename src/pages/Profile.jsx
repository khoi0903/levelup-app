import React, { useState } from 'react';
import { 
  Settings, ArrowLeft, Award, Flame, MapPin, Zap, Sun, Trophy, 
  Lock, RefreshCw, Sparkles, CreditCard, Moon, Bell, Volume2, 
  ChevronRight, Calendar, Activity
} from 'lucide-react';

export default function Profile({
  userName = 'Alex',
  userGoal = 'consistency',
  reminderTime = '06:00',
  coachVoice = 'empathetic',
  currentPlan = 'free',
  isDark = false,
  notificationsEnabled = true,
  soundsEnabled = false,
  onUpdateSettings,
  onResetOnboarding,
  setActivePage,
  xp = 1680,
  level = 4
}) {
  const [showSettings, setShowSettings] = useState(false);

  const goalNames = {
    consistency: 'Xây dựng sự Kỷ luật',
    energy: 'Tăng cường Năng lượng',
    strength: 'Cải thiện Sức mạnh',
    better_feel: 'Sức khỏe & Tinh thần'
  };

  const voiceNames = {
    empathetic: 'Aura (Đồng cảm & Nhẹ nhàng)',
    tough_love: 'Aura (Nghiêm khắc & Thử thách)',
    technical: 'Aura (Chuyên nghiệp & Kỹ thuật)'
  };

  const planNames = {
    free: 'LevelUp Free (Miễn phí)',
    pro: 'LevelUp Pro (Cao cấp)',
    squad: 'LevelUp Squad (Đồng đội)'
  };

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  const currentMonthName = monthNames[new Date().getMonth()];

  const badges = [
    { id: 'early_bird', name: 'Sáng Sớm', desc: 'Tập trước 7 AM', icon: Sun, color: 'gold', locked: false },
    { id: 'speedy', name: 'Siêu Tốc', desc: 'Hoàn thành nhanh', icon: Zap, color: 'blue', locked: false },
    { id: 'iron_will', name: 'Kiên Trì', desc: 'Tập 5 ngày liền', icon: Trophy, color: 'purple', locked: false },
    { id: 'hiker', name: 'Leo Núi', desc: 'Bài tập sức bền', icon: Flame, color: 'orange', locked: true },
    { id: 'swimmer', name: 'Kính Ngư', desc: 'Bài tập dưới nước', icon: Activity, color: 'cyan', locked: true },
    { id: 'sprinter', name: 'Thần Tốc', desc: 'Hoàn thành 10 bài', icon: Zap, color: 'green', locked: true }
  ];

  // 1. Settings View
  if (showSettings) {
    return (
      <div className="profile-page settings-view fade-in">
        <div className="settings-header-row">
          <button className="back-btn-icon" onClick={() => setShowSettings(false)} aria-label="Quay lại">
            <ArrowLeft size={18} />
          </button>
          <h2 className="settings-page-title">Cài đặt & Hồ sơ</h2>
        </div>

        {/* User Profile Card */}
        <div className="user-profile-header-card card" style={{ marginBottom: '20px' }}>
          <div className="profile-avatar-large">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div className="profile-user-text">
            <h3 className="profile-user-name" style={{ fontSize: '16px' }}>{userName}</h3>
            <span className="profile-user-role">Người đam mê tập luyện</span>
          </div>
        </div>

        {/* Settings Cards list */}
        <div className="settings-section-container">
          <h4 className="settings-section-title">Hành trình của tôi</h4>
          <div className="settings-cards-list">
            {/* Active Goal */}
            <div className="setting-card card" onClick={() => onResetOnboarding()}>
              <div className="setting-card-left">
                <div className="setting-icon-wrapper goal">
                  <Sparkles size={16} />
                </div>
                <div className="setting-details">
                  <span className="setting-label">Mục tiêu hiện tại</span>
                  <span className="setting-value">{goalNames[userGoal] || 'Tập luyện'}</span>
                </div>
              </div>
              <span className="setting-edit-text">Đổi mục tiêu <ChevronRight size={14} /></span>
            </div>

            {/* Reminders */}
            <div className="setting-card card">
              <div className="setting-card-left">
                <div className="setting-icon-wrapper reminder">
                  <Calendar size={16} />
                </div>
                <div className="setting-details">
                  <span className="setting-label">Nhắc nhở hàng ngày</span>
                  <input
                    type="time"
                    className="reminder-time-input"
                    value={reminderTime}
                    onChange={(e) => onUpdateSettings('reminderTime', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Coach Voice */}
            <div className="setting-card card">
              <div className="setting-card-left">
                <div className="setting-icon-wrapper voice">
                  <Volume2 size={16} />
                </div>
                <div className="setting-details">
                  <span className="setting-label">Giọng nói AI Coach</span>
                  <select
                    className="coach-voice-select"
                    value={coachVoice}
                    onChange={(e) => onUpdateSettings('coachVoice', e.target.value)}
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

        {/* Subscription */}
        <div className="settings-section-container">
          <h4 className="settings-section-title">Đăng ký & Thanh toán</h4>
          <div className="settings-cards-list">
            <div className="setting-card card" onClick={() => setActivePage('pricing')}>
              <div className="setting-card-left">
                <div className="setting-icon-wrapper subscription">
                  <CreditCard size={16} />
                </div>
                <div className="setting-details">
                  <span className="setting-label">Gói dịch vụ</span>
                  <span className="setting-value plan-tag-text">{planNames[currentPlan]}</span>
                </div>
              </div>
              <span className="setting-edit-text subscription">Nâng cấp <ChevronRight size={14} /></span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-section-container">
          <h4 className="settings-section-title">Cài đặt ứng dụng</h4>
          <div className="settings-cards-list">
            <div className="setting-card card toggle-type">
              <div className="setting-card-left">
                <div className="setting-icon-wrapper darkmode">
                  <Moon size={16} />
                </div>
                <div className="setting-details">
                  <span className="setting-label">Giao diện tối (Dark Mode)</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={() => onUpdateSettings('isDark', !isDark)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-card card toggle-type">
              <div className="setting-card-left">
                <div className="setting-icon-wrapper notifications">
                  <Bell size={16} />
                </div>
                <div className="setting-details">
                  <span className="setting-label">Thông báo đẩy (Push)</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() => onUpdateSettings('notificationsEnabled', !notificationsEnabled)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="profile-actions-bottom" style={{ marginTop: '24px' }}>
          <button className="btn btn-outline reset-btn" onClick={onResetOnboarding}>
            <RefreshCw size={14} />
            <span>Thiết lập lại từ đầu</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Achievements View (Main Profile screen)
  return (
    <div className="profile-page achievements-view fade-in">
      {/* Achievements Header */}
      <div className="achievements-header">
        <div className="achievements-user-info">
          <div className="profile-avatar-large">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div className="achievements-user-text">
            <h3 className="achievements-user-name">{userName}</h3>
            <span className="achievements-user-role">Người đam mê tập luyện</span>
          </div>
        </div>
        <button 
          className="settings-gear-btn" 
          onClick={() => setShowSettings(true)}
          aria-label="Cài đặt"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Rank Card */}
      <div className="rank-card card">
        <span className="rank-card-label">Hạng hiện tại</span>
        <div className="rank-card-title-row">
          <h3 className="rank-name-badge">Kim Cương I</h3>
          <span className="rank-badge-percent">Top 3% Cộng đồng</span>
        </div>
        <div className="rank-card-footer">
          🏆 Cấp độ {level} • {xp} XP • 42 Huy hiệu đã mở khóa
        </div>
      </div>

      {/* Monthly Stats */}
      <h4 className="section-title-sm">Thành tích {currentMonthName}</h4>
      <div className="achievements-monthly-row">
        <div className="monthly-stat-card card">
          <div className="stat-icon-wrapper-circle distance">
            <MapPin size={18} />
          </div>
          <div className="monthly-stat-info">
            <span className="monthly-stat-label">Quãng đường</span>
            <span className="monthly-stat-val">128.4 km</span>
          </div>
        </div>

        <div className="monthly-stat-card card">
          <div className="stat-icon-wrapper-circle energy">
            <Flame size={18} />
          </div>
          <div className="monthly-stat-info">
            <span className="monthly-stat-label">Năng lượng</span>
            <span className="monthly-stat-val">12.450 kcal</span>
          </div>
        </div>
      </div>

      {/* Important Milestones */}
      <h4 className="section-title-sm">Cột mốc quan trọng</h4>
      <div className="setting-card card" style={{ padding: '12px 14px', marginBottom: '20px' }}>
        <div className="setting-card-left" style={{ width: '100%' }}>
          <div className="stat-icon-wrapper-circle distance" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
            <Award size={18} />
          </div>
          <div className="setting-details" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="setting-label" style={{ fontWeight: 800 }}>Chiến binh 100 ngày</span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>100%</span>
            </div>
            <div className="stat-progress-bar" style={{ marginTop: '6px', height: '5px' }}>
              <div className="stat-progress-fill steps" style={{ width: '100%', backgroundColor: '#10b981' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid Collection */}
      <div className="badges-collection-section">
        <div className="section-header-row-link">
          <h4 className="section-title-sm" style={{ marginBottom: 0 }}>Bộ sưu tập Huy hiệu</h4>
          <button className="section-link">Xem tất cả</button>
        </div>

        <div className="badges-grid">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className="badge-item-card card">
                <div className={`badge-icon-circle ${badge.locked ? 'locked' : badge.color}`}>
                  <Icon size={18} />
                  {badge.locked && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: -2, 
                      right: -2, 
                      backgroundColor: '#64748b', 
                      borderRadius: '50%', 
                      padding: 2, 
                      color: 'white',
                      border: '2px solid white' 
                    }}>
                      <Lock size={8} />
                    </div>
                  )}
                </div>
                <span className="badge-name-label">{badge.name}</span>
                <span className="badge-desc-label">{badge.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { User, Bell, Volume2, Moon, Calendar, Sparkles, CreditCard, RefreshCw, ChevronRight } from 'lucide-react';

export default function Profile({
  userName = 'Alex Johnson',
  userGoal = 'consistency',
  reminderTime = '06:00',
  coachVoice = 'empathetic',
  currentPlan = 'free',
  isDark = false,
  notificationsEnabled = true,
  soundsEnabled = false,
  onUpdateSettings,
  onResetOnboarding,
  setActivePage
}) {
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

  return (
    <div className="profile-page fade-in">
      <div className="page-title-section">
        <h2 className="page-title">Profile & Settings</h2>
        <p className="page-subtitle">Quản lý hồ sơ và tùy chỉnh ứng dụng của bạn.</p>
      </div>

      {/* User Header Info Card */}
      <div className="user-profile-header-card card">
        <div className="profile-avatar-large">
          AJ
        </div>
        <div className="profile-user-text">
          <h3 className="profile-user-name">{userName}</h3>
          <span className="profile-user-role">Người đam mê tập luyện</span>
        </div>
      </div>

      {/* Journey Settings Section */}
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

      {/* Subscription Settings */}
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

      {/* App Preference Toggles */}
      <div className="settings-section-container">
        <h4 className="settings-section-title">Cài đặt ứng dụng</h4>
        
        <div className="settings-cards-list">
          {/* Dark Mode toggle */}
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

          {/* Notifications toggle */}
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

      {/* Reset System Actions */}
      <div className="profile-actions-bottom">
        <button className="btn btn-outline reset-btn" onClick={onResetOnboarding}>
          <RefreshCw size={14} />
          <span>Thiết lập lại từ đầu</span>
        </button>
      </div>
    </div>
  );
}

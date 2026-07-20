import React, { useState } from 'react';
import { 
  Award, Flame, Zap, Shield, BookOpen, Target, LogOut, Lock, 
  ChevronRight, Swords, Dna, Settings, ArrowLeft, Volume2, Sparkles, X, Check
} from 'lucide-react';

export default function Profile({
  userName = 'Nguyễn Chu Thiện Tâm',
  userGoal = 'consistency',
  currentPlan = 'pro',
  xp = 850,
  level = 4,
  onResetOnboarding,
  setActivePage,
  onUpdateSettings
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
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

  // ================= VIEW 1: SETTINGS WINDOW =================
  if (showSettings) {
    return (
      <div className="profile-page-v2 settings-view fade-in">
        <div className="settings-header-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <button className="back-btn-icon" onClick={() => setShowSettings(false)} aria-label="Quay lại" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <h2 className="settings-page-title" style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Cài đặt hồ sơ</h2>
        </div>

        {/* User Info Card */}
        <div className="sub-card-v2" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
          <span className="sub-lbl-v2">THÔNG TIN CÁ NHÂN</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="avatar-container-v2" style={{ width: '48px', height: '48px', margin: 0 }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt="Profile Avatar" 
                className="avatar-img-v2"
              />
            </div>
            <div style={{ flex: 1 }}>
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
                  width: '100%',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Configurations Section */}
        <div className="goal-section-v2">
          <h4 className="goal-title-v2" style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748B' }}>Tùy chọn huấn luyện</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="goal-card-box-v2" onClick={() => { setTempGoal(userGoal); setShowGoalModal(true); }} style={{ cursor: 'pointer' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <Sparkles size={16} color="#0056C6" />
                </div>
                <div>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px' }}>MỤC TIÊU LUYỆN TẬP</span>
                  <span className="goal-name-text-v2" style={{ fontSize: '13px' }}>{goalNames[userGoal]}</span>
                </div>
              </div>
              <ChevronRight size={16} color="#64748B" />
            </div>

            <div className="goal-card-box-v2" style={{ cursor: 'default' }}>
              <div className="goal-card-left-v2">
                <div className="goal-icon-circle-v2">
                  <Volume2 size={16} color="#0056C6" />
                </div>
                <div>
                  <span className="sub-lbl-v2" style={{ display: 'block', fontSize: '9px' }}>GIỌNG NÓI COACH</span>
                  <span className="goal-name-text-v2" style={{ fontSize: '13px' }}>Aura (Đồng cảm, nâng đỡ)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Reset actions */}
        <button 
          className="logout-btn-v2" 
          onClick={onResetOnboarding}
          style={{ background: '#f8fafc', borderColor: '#cbd5e1', color: '#64748b', marginTop: '24px' }}
        >
          <span>Thiết lập lại Onboarding từ đầu</span>
        </button>
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
          <span className="price-val">49.000 VNĐ</span>
          <span className="price-lbl">/tháng</span>
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
      <button className="logout-btn-v2" onClick={onResetOnboarding}>
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

import React, { useState } from 'react';
import { 
  Award, Flame, Zap, Shield, BookOpen, Target, LogOut, Lock, 
  ChevronRight, Award as BadgeIcon, Swords, Dna
} from 'lucide-react';

export default function Profile({
  userName = 'Nguyễn Chu Thiện Tâm',
  userGoal = 'consistency',
  currentPlan = 'pro',
  xp = 850,
  level = 4,
  onResetOnboarding,
  setActivePage
}) {
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

  // Static badge assets matching Figma V2 screenshot
  const figmaBadges = [
    { id: 'newbie', name: 'Người mới', icon: Dna, colorClass: 'blue-circle' },
    { id: 'patient', name: 'Kiên trì', icon: BookOpen, colorClass: 'yellow-circle' },
    { id: 'warrior', name: 'Chiến binh', icon: Swords, colorClass: 'green-circle' },
    { id: 'upcoming', name: 'Sắp tới', icon: Lock, colorClass: 'locked-circle', locked: true }
  ];

  return (
    <div className="profile-page-v2 fade-in">
      
      {/* 1. Header Title */}
      <div className="profile-header-v2">
        <h2 className="profile-brand-title">LevelUp</h2>
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
          <button className="goal-change-btn-v2" onClick={onResetOnboarding}>
            Thay đổi mục tiêu
          </button>
        </div>
      </div>

      {/* 9. Logout Button */}
      <button className="logout-btn-v2" onClick={onResetOnboarding}>
        <LogOut size={16} />
        <span>Đăng xuất</span>
      </button>

    </div>
  );
}

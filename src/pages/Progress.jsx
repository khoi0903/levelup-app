import React from 'react';
import { Calendar, Award, Flame, Sun, Trophy, Lock } from 'lucide-react';

export default function Progress({ 
  xp = 1680, 
  maxXp = 2000, 
  level = 4, 
  checkInHistory = [], 
  onToggleCheckIn,
  activeStreak = 5
}) {
  const xpPercentage = (xp / maxXp) * 100;

  // Generate 28 days for the calendar grid
  const totalDays = 28;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const milestones = [
    {
      id: 'streak_5',
      title: '5-Day Streak',
      desc: 'Tập luyện 5 ngày liên tiếp.',
      status: 'completed',
      progress: '5/5',
      icon: Flame,
      color: 'orange'
    },
    {
      id: 'early_bird',
      title: 'Early Bird',
      desc: 'Hoàn thành bài tập trước 7 AM.',
      status: 'completed',
      progress: '1/1',
      icon: Sun,
      color: 'blue'
    },
    {
      id: 'consistency_king',
      title: 'Kỷ Luật Thép',
      desc: 'Điểm danh 30 ngày tập luyện.',
      status: 'progress',
      progress: `${checkInHistory.length}/30`,
      icon: Trophy,
      color: 'purple'
    },
    {
      id: 'heavy_lifter',
      title: 'Cực Hạn Sức Mạnh',
      desc: 'Hoàn thành 15 bài tập tạ.',
      status: 'locked',
      progress: '0/15',
      icon: Lock,
      color: 'gray'
    }
  ];

  return (
    <div className="progress-page fade-in">
      <div className="page-title-section">
        <h2 className="page-title">Your Journey</h2>
        <p className="page-subtitle">Theo dõi sự kỷ luật và thành quả của bạn.</p>
      </div>

      {/* Level Summary Dashboard */}
      <div className="level-summary-card card">
        <div className="level-gauge-row">
          <div className="level-gauge-text-block">
            <span className="level-label-large">Cấp độ hiện tại</span>
            <h3 className="level-number-large">Cấp {level}</h3>
            <span className="xp-fraction">{xp} / {maxXp} XP</span>
          </div>
          <div className="level-circle-progress">
            <svg width="70" height="70" viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle-fill"
                strokeDasharray={`${xpPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="circle-percentage-text">{Math.round(xpPercentage)}%</div>
          </div>
        </div>
        <div className="level-progress-bar-details">
          <div className="xp-details-track">
            <div className="xp-details-bar" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Consistency Grid */}
      <div className="consistency-grid-section card">
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <Calendar size={16} className="text-primary" />
            <h3 className="section-title">Consistency Grid</h3>
          </div>
          <div className="grid-streak-text">
            🔥 {activeStreak} ngày liên tiếp
          </div>
        </div>
        <p className="grid-instruction">Chạm vào ô ngày để đánh dấu điểm danh tập luyện.</p>

        <div className="calendar-grid">
          {days.map((day) => {
            const isCompleted = checkInHistory.includes(day);
            return (
              <button
                key={day}
                className={`grid-day-cell ${isCompleted ? 'completed animate-pop' : ''}`}
                onClick={() => onToggleCheckIn(day)}
                aria-label={`Day ${day}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestones / Badges List */}
      <div className="milestones-section">
        <h3 className="section-title-standard">Milestones & Achievements</h3>
        <div className="milestones-grid">
          {milestones.map((ms) => {
            const Icon = ms.icon;
            return (
              <div key={ms.id} className={`milestone-card card ${ms.status}`}>
                <div className={`milestone-icon-wrapper ${ms.color}`}>
                  <Icon size={18} />
                </div>
                <div className="milestone-details">
                  <h4 className="milestone-title">{ms.title}</h4>
                  <p className="milestone-desc">{ms.desc}</p>
                </div>
                <div className="milestone-status-badge">
                  <span className="milestone-progress-text">{ms.progress}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

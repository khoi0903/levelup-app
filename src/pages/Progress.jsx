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

  // Real calendar generation for the current month
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  
  const currentMonthName = `${monthNames[currentMonth]} ${currentYear}`;
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  // Map JS getDay (0=Sun, 1=Mon, ..., 6=Sat) to (Mon=0, ..., Sun=6)
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const emptySpacers = Array.from({ length: startOffset });

  const milestones = [
    {
      id: 'streak_5',
      title: 'Chuỗi 5 ngày',
      desc: 'Tập luyện 5 ngày liên tiếp.',
      status: 'completed',
      progress: '5/5',
      icon: Flame,
      color: 'orange'
    },
    {
      id: 'early_bird',
      title: 'Tập sớm',
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
        <h2 className="page-title">Hành trình của bạn</h2>
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
          <div className="section-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <Calendar size={16} className="text-primary" />
            <h3 className="section-title" style={{ margin: 0 }}>Lịch kỷ luật</h3>
            <span className="current-month-label" style={{ fontSize: '12px', opacity: 0.75 }}>({currentMonthName})</span>
          </div>
          <div className="grid-streak-text">
            🔥 {activeStreak} ngày liên tiếp
          </div>
        </div>
        <p className="grid-instruction">Chạm vào ô ngày để đánh dấu điểm danh tập luyện.</p>

        <div className="calendar-grid">
          {/* Weekday headers */}
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((wDay) => (
            <div key={wDay} className="grid-weekday-header">{wDay}</div>
          ))}
          
          {/* Empty cells for offset */}
          {emptySpacers.map((_, idx) => (
            <div key={`empty-${idx}`} className="grid-day-cell-empty"></div>
          ))}
          
          {/* Real day cells */}
          {days.map((day) => {
            const isCompleted = checkInHistory.includes(day);
            const isToday = day === today.getDate();
            return (
              <button
                key={day}
                className={`grid-day-cell ${isCompleted ? 'completed animate-pop' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => onToggleCheckIn(day)}
                aria-label={`Ngày ${day}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestones / Badges List */}
      <div className="milestones-section">
        <h3 className="section-title-standard">Cột mốc & Thành tích</h3>
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

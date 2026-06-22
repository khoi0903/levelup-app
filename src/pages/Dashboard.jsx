import React, { useState } from 'react';
import { Flame, Play, ChevronRight, Activity, Zap, TrendingUp } from 'lucide-react';

export default function Dashboard({ userName = 'Alex', activeStreak = 5, onStartWorkout, setActivePage }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  const weeklyData = [
    { day: 'T2', mins: 25, kcal: 180 },
    { day: 'T3', mins: 45, kcal: 320 },
    { day: 'T4', mins: 15, kcal: 110 },
    { day: 'T5', mins: 50, kcal: 410 },
    { day: 'T6', mins: 30, kcal: 220 },
    { day: 'T7', mins: 60, kcal: 500 },
    { day: 'CN', mins: 0, kcal: 0 }
  ];

  const maxMins = Math.max(...weeklyData.map(d => d.mins));

  return (
    <div className="dashboard-page fade-in">
      {/* Greeting Header */}
      <div className="dashboard-greeting-row">
        <div>
          <h2 className="greeting-text">Chào buổi sáng, {userName}!</h2>
          <p className="greeting-sub">Kỷ luật là siêu năng lực của bạn.</p>
        </div>
        <div className="streak-badge-container" onClick={() => setActivePage('progress')}>
          <Flame className="streak-fire-icon" size={18} fill="currentColor" />
          <span>{activeStreak} ngày</span>
        </div>
      </div>

      {/* Hero Recommendation Card */}
      <div className="hero-workout-card card">
        <div className="hero-card-tag">GỢI Ý HÔM NAY</div>
        <div className="hero-workout-content">
          <div className="hero-workout-details">
            <h3 className="hero-workout-title">Full Body Flow</h3>
            <p className="hero-workout-info">15 phút • Trung bình • +150 XP</p>
          </div>
          <button className="hero-start-btn" onClick={onStartWorkout}>
            <Play size={16} fill="currentColor" />
            <span>Tập ngay</span>
          </button>
        </div>
        
        {/* Simple visual background graphic */}
        <div className="hero-card-bg-mesh"></div>
      </div>

      {/* Quick Health Stats Grid */}
      <div className="stats-grid-row">
        <div className="stat-card card">
          <div className="stat-icon-wrapper steps">
            <Activity size={16} />
          </div>
          <div className="stat-data">
            <span className="stat-value">7,420</span>
            <span className="stat-label">bước đi</span>
          </div>
          <div className="stat-progress-bar">
            <div className="stat-progress-fill steps" style={{ width: '74.2%' }}></div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon-wrapper calories">
            <Zap size={16} />
          </div>
          <div className="stat-data">
            <span className="stat-value">320 kcal</span>
            <span className="stat-label">đã tiêu thụ</span>
          </div>
          <div className="stat-progress-bar">
            <div className="stat-progress-fill calories" style={{ width: '53.3%' }}></div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="weekly-progress-section card">
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <TrendingUp size={16} className="text-primary" />
            <h3 className="section-title">Tiến trình tuần</h3>
          </div>
          <button className="view-detail-link" onClick={() => setActivePage('progress')}>
            Chi tiết <ChevronRight size={14} />
          </button>
        </div>

        {/* SVG Bar Chart */}
        <div className="chart-container">
          <div className="chart-y-axis">
            <span>60p</span>
            <span>30p</span>
            <span>0p</span>
          </div>
          <div className="chart-bars-wrapper">
            {weeklyData.map((data, index) => {
              const barHeightPercentage = (data.mins / 60) * 100;
              const isHovered = hoveredBar === index;
              return (
                <div 
                  key={index} 
                  className="chart-bar-column"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="bar-track">
                    <div 
                      className={`bar-fill ${data.mins > 0 ? 'active' : ''} ${isHovered ? 'hovered' : ''}`} 
                      style={{ height: `${barHeightPercentage}%` }}
                    >
                      {isHovered && data.mins > 0 && (
                        <div className="chart-tooltip">
                          <span className="tooltip-mins">{data.mins} phút</span>
                          <span className="tooltip-kcal">{data.kcal} kcal</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

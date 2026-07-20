import React from 'react';
import { Flame, Play, ChevronRight, Activity, Heart, Award } from 'lucide-react';

export default function Dashboard({ userName = 'Tâm', activeStreak = 12, onStartWorkout, setActivePage }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
  // Mouse drag-to-scroll hooks for easy desktop horizontal scrolling
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
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Weekly chart data matching Figma with mins/kcal details for tooltips
  const weeklyChartData = [
    { day: 'M', height: '35%', colorClass: 'light-blue', mins: 25, kcal: 180 },
    { day: 'T', height: '50%', colorClass: 'light-blue', mins: 35, kcal: 240 },
    { day: 'W', height: '65%', colorClass: 'light-blue', mins: 45, kcal: 320 },
    { day: 'T', height: '80%', colorClass: 'highlight-orange', mins: 60, kcal: 485 }, // Thursday highlighted
    { day: 'F', height: '70%', colorClass: 'dark-blue', mins: 50, kcal: 410 },
    { day: 'S', height: '30%', colorClass: 'faded-blue', mins: 15, kcal: 110 },
    { day: 'S', height: '50%', colorClass: 'light-blue', mins: 40, kcal: 280 },
  ];

  return (
    <div className="dashboard-page fade-in">
      {/* Brand Header */}
      <div className="figma-dash-brand-row">
        <span className="figma-dash-logo">LevelUp</span>
      </div>

      {/* Greeting Header */}
      <div className="figma-dash-greeting-section">
        <h2 className="figma-greeting-title">Chào {userName}!</h2>
        <div className="figma-orange-streak-badge" onClick={() => setActivePage('progress')}>
          <Flame size={13} fill="currentColor" style={{ marginRight: 4 }} />
          <span>Chuỗi {activeStreak} ngày</span>
        </div>
      </div>

      {/* Streak Card ("Chuỗi") */}
      <div className="figma-dash-streak-card card">
        <div className="streak-card-top-row">
          <div className="streak-title-col">
            <h3 className="streak-card-title">Chuỗi</h3>
            <p className="streak-card-subtitle">Bạn đã tập được {activeStreak} ngày</p>
          </div>
          <span className="streak-card-badge-blue">Cao</span>
        </div>

        {/* Weekly Progress Bar Chart */}
        <div className="figma-chart-row-wrapper">
          {weeklyChartData.map((item, idx) => (
            <div 
              key={idx} 
              className="chart-col-item"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ position: 'relative' }}
            >
              {/* Floating Tooltip Bubble */}
              {hoveredIndex === idx && (
                <div className="chart-tooltip-bubble fade-in">
                  <span className="tooltip-kcal">{item.kcal} kcal</span>
                  <span className="tooltip-mins">{item.mins} phút</span>
                </div>
              )}

              <div className="chart-bar-track">
                <div 
                  className={`chart-bar-fill-v2 ${item.colorClass}`}
                  style={{ height: item.height }}
                ></div>
              </div>
              <span className="chart-bar-label">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat Cards Grid Row */}
      <div className="figma-stats-grid-row">
        {/* Calo */}
        <div className="figma-stat-card-item card">
          <div className="stat-card-left-header">
            <Flame size={15} color="#FA5A15" fill="#FA5A15" />
            <span className="stat-card-label">Calo</span>
          </div>
          <div className="stat-card-value-row">
            <span className="stat-card-value">485</span>
            <span className="stat-card-unit">kcal</span>
          </div>
        </div>

        {/* Bước chân */}
        <div className="figma-stat-card-item card">
          <div className="stat-card-left-header">
            <Activity size={15} color="#10B981" />
            <span className="stat-card-label">Bước chân</span>
          </div>
          <div className="stat-card-value-row">
            <span className="stat-card-value">3,240</span>
          </div>
        </div>
      </div>

      {/* Heart Rate Card */}
      <div className="figma-heart-rate-card card">
        <div className="heart-card-left">
          <div className="heart-header-row">
            <Heart size={15} color="#EF4444" fill="#EF4444" />
            <span className="heart-label">Nhịp tim</span>
          </div>
          <div className="heart-value-row">
            <span className="heart-value">112</span>
            <span className="heart-unit">bpm</span>
          </div>
        </div>
        
        {/* Heart Rate ECG Line Graphic */}
        <div className="heart-ecg-wave-wrapper">
          <svg className="ecg-svg-line" viewBox="0 0 100 30">
            <path 
              d="M0,15 L20,15 L25,5 L30,25 L35,12 L40,15 L60,15 L65,0 L70,30 L75,10 L80,15 L100,15" 
              fill="none" 
              stroke="#EF4444" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Workout Recommendation Section */}
      <div className="figma-dash-section-header">
        <h3 className="figma-section-title-bold">Gợi ý bài tập</h3>
      </div>

      <div 
        ref={scrollRef}
        className="figma-dash-workouts-row"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDown ? 'grabbing' : 'grab', userSelect: 'none' }}
      >
        {/* HIIT buổi sáng */}
        <div className="figma-workout-thumbnail-card card">
          <div className="workout-thumb-image-placeholder hiit">
            <Play className="play-icon-center" size={20} fill="#ffffff" color="#ffffff" />
          </div>
          <div className="workout-thumb-info">
            <h4 className="workout-thumb-title">HIIT buổi sáng</h4>
            <p className="workout-thumb-desc">20 phút • Cường độ cao</p>
            <button className="btn btn-primary btn-sm-workout w-full mt-2" onClick={onStartWorkout}>
              Bắt đầu
            </button>
          </div>
        </div>

        {/* Yoga thư giãn */}
        <div className="figma-workout-thumbnail-card card">
          <div className="workout-thumb-image-placeholder yoga-relax">
            <Play className="play-icon-center" size={20} fill="#ffffff" color="#ffffff" />
          </div>
          <div className="workout-thumb-info">
            <h4 className="workout-thumb-title">Yoga thư giãn</h4>
            <p className="workout-thumb-desc">30 phút • Cường độ nhẹ</p>
            <button className="btn btn-outline btn-sm-workout w-full mt-2" onClick={() => setActivePage('workouts')}>
              View
            </button>
          </div>
        </div>

        {/* Cardio bứt tốc */}
        <div className="figma-workout-thumbnail-card card">
          <div className="workout-thumb-image-placeholder hiit" style={{ background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)' }}>
            <Play className="play-icon-center" size={20} fill="#ffffff" color="#ffffff" />
          </div>
          <div className="workout-thumb-info">
            <h4 className="workout-thumb-title">Cardio bứt tốc</h4>
            <p className="workout-thumb-desc">15 phút • Cường độ cao</p>
            <button className="btn btn-primary btn-sm-workout w-full mt-2" onClick={onStartWorkout}>
              Bắt đầu
            </button>
          </div>
        </div>

        {/* Sức mạnh cơ bắp */}
        <div className="figma-workout-thumbnail-card card">
          <div className="workout-thumb-image-placeholder yoga-relax" style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)' }}>
            <Play className="play-icon-center" size={20} fill="#ffffff" color="#ffffff" />
          </div>
          <div className="workout-thumb-info">
            <h4 className="workout-thumb-title">Sức mạnh thân trên</h4>
            <p className="workout-thumb-desc">15 phút • Trung bình</p>
            <button className="btn btn-primary btn-sm-workout w-full mt-2" onClick={onStartWorkout}>
              Bắt đầu
            </button>
          </div>
        </div>

        {/* Xem thêm card */}
        <div 
          className="figma-workout-thumbnail-card card figma-view-more-card" 
          onClick={() => setActivePage('workouts')}
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '140px', 
            padding: '16px', 
            textAlign: 'center',
            background: '#F8FAFC',
            borderStyle: 'dashed'
          }}
        >
          <div className="view-more-circle" style={{ width: 36, height: 36, borderRadius: '50%', background: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={20} color="#0056C6" />
          </div>
          <span className="view-more-text" style={{ fontSize: '12px', fontWeight: '800', color: '#0056C6', marginTop: '8px' }}>Xem thêm</span>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="figma-dash-section-header" style={{ marginTop: '20px' }}>
        <h3 className="figma-section-title-bold">Thử thách</h3>
        <button className="figma-view-all-link" onClick={() => setActivePage('progress')}>
          Xem tất cả
        </button>
      </div>

      {/* Challenge Card */}
      <div className="figma-challenge-card card" onClick={() => setActivePage('progress')} style={{ cursor: 'pointer' }}>
        <div className="challenge-card-left">
          <div className="challenge-icon-bg-orange">
            <Award size={18} color="#FA5A15" />
          </div>
          <div className="challenge-info-block">
            <h4 className="challenge-card-title">Thử thách Squat 30 ngày</h4>
            <span className="challenge-card-sub">Ngày 12/30</span>
            <div className="challenge-progress-bar-v2">
              <div className="challenge-progress-fill-v2" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

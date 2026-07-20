import React, { useState } from 'react';
import { ArrowLeft, Sun, Droplets, Activity, Edit3 } from 'lucide-react';

export default function ScheduleSetup({ onComplete, onBack, initialTime = '06:00', initialVoice = 'empathetic' }) {
  // Start Monday reference (July 13th, 2026 as per user screenshot template)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2026-07-13'));
  
  // Selected date is July 15th, 2026 (Wednesday / T4) by default
  const [selectedFullDate, setSelectedFullDate] = useState(new Date('2026-07-15'));
  
  const [exerciseTime, setExerciseTime] = useState(initialTime);
  const [reminders, setReminders] = useState({
    morning: true,
    water: true,
    yoga: false,
  });

  const toggleReminder = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate 7 weekdays starting from currentWeekStart Monday
  const getWeekDays = (startMonday) => {
    const days = [];
    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startMonday);
      d.setDate(startMonday.getDate() + i);
      days.push({
        dayName: dayNames[i],
        dateNum: d.getDate(),
        fullDate: new Date(d)
      });
    }
    return days;
  };

  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const datesList = getWeekDays(currentWeekStart);

  const monthNames = [
    'THÁNG 1', 'THÁNG 2', 'THÁNG 3', 'THÁNG 4', 'THÁNG 5', 'THÁNG 6',
    'THÁNG 7', 'THÁNG 8', 'THÁNG 9', 'THÁNG 10', 'THÁNG 11', 'THÁNG 12'
  ];
  const headerLabel = `${monthNames[currentWeekStart.getMonth()]} ${currentWeekStart.getFullYear()}`;

  const handleFinish = () => {
    onComplete({
      selectedDay: selectedFullDate.getDate(),
      selectedFullDate: selectedFullDate,
      reminders,
      reminderTime: exerciseTime,
      coachVoice: initialVoice,
    });
  };

  return (
    <div className="onboarding-screen onboarding-step-5 fade-in">
      {/* Header Navigation with Dots Indicator */}
      <div className="onboarding-header-nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px 20px', boxSizing: 'border-box' }}>
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span className="step-indicator-text" style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em' }}>BƯỚC 5/5</span>
          <div className="figma-dots-indicator" style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '16px', height: '6px', borderRadius: '99px', background: '#0056c6' }}></span>
          </div>
        </div>
        <div style={{ width: 28 }}></div>
      </div>

      {/* Title & Subtitle */}
      <div className="figma-schedule-intro">
        <h2 className="figma-schedule-title">Thiết lập lịch tập</h2>
        <p className="figma-schedule-sub">
          Chọn thời gian và nhắc nhở để AI Coach chuẩn bị lộ trình tốt nhất cho bạn.
        </p>
      </div>

      {/* Calendar Card Container */}
      <div className="figma-calendar-card">
        <div className="calendar-card-top">
          <span className="month-year-label">{headerLabel}</span>
          <div className="calendar-nav-arrows">
            <span onClick={handlePrevWeek} style={{ cursor: 'pointer', padding: '4px 8px', fontSize: '15px', fontWeight: 'bold', userSelect: 'none' }}>&lt;</span>
            <span onClick={handleNextWeek} style={{ cursor: 'pointer', padding: '4px 8px', fontSize: '15px', fontWeight: 'bold', userSelect: 'none' }}>&gt;</span>
          </div>
        </div>

        {/* Horizontal Dates Picker */}
        <div className="figma-dates-row">
          {datesList.map((item) => {
            const isCurrentActive = selectedFullDate.toDateString() === item.fullDate.toDateString();
            return (
              <div
                key={item.fullDate.toISOString()}
                className={`figma-date-card ${isCurrentActive ? 'active' : ''}`}
                onClick={() => setSelectedFullDate(item.fullDate)}
                style={{ cursor: 'pointer' }}
              >
                <span className="date-day-name">{item.dayName}</span>
                <span className="date-day-num">{item.dateNum}</span>
                {isCurrentActive && <div className="date-green-dot"></div>}
              </div>
            );
          })}
        </div>

        {/* Ideal Time Block */}
        <div className="figma-time-row">
          <span className="time-label">Thời gian tập lý tưởng</span>
          <div className="time-badge-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ebf3ff', padding: '6px 12px', borderRadius: '99px', cursor: 'pointer' }}>
            <input
              type="time"
              value={exerciseTime}
              onChange={(e) => setExerciseTime(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '13px',
                fontWeight: '800',
                color: '#0056C6',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                width: '60px',
                padding: 0
              }}
            />
            <Edit3 size={13} color="#0056C6" style={{ pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Reminders Section Heading */}
      <h4 className="figma-section-heading">NHẮC NHỞ THÔNG MINH</h4>

      {/* Reminders Toggles Row */}
      <div className="figma-reminders-list">
        {/* Morning reminder */}
        <div className="reminder-toggle-card" onClick={() => toggleReminder('morning')}>
          <div className="rem-left">
            <div className="rem-icon-wrapper orange">
              <Sun size={18} color="#D97706" />
            </div>
            <div className="rem-info">
              <span className="rem-title">Nhắc nhở buổi sáng</span>
              <span className="rem-time">08:00 AM</span>
            </div>
          </div>
          <div className={`figma-toggle-switch ${reminders.morning ? 'active' : ''}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>

        {/* Water reminder */}
        <div className="reminder-toggle-card" onClick={() => toggleReminder('water')}>
          <div className="rem-left">
            <div className="rem-icon-wrapper blue">
              <Droplets size={18} color="#0056C6" />
            </div>
            <div className="rem-info">
              <span className="rem-title">Nhắc nhở uống nước</span>
              <span className="rem-time">Mỗi 2 tiếng</span>
            </div>
          </div>
          <div className={`figma-toggle-switch ${reminders.water ? 'active' : ''}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>

        {/* Yoga reminder */}
        <div className="reminder-toggle-card" onClick={() => toggleReminder('yoga')}>
          <div className="rem-left">
            <div className="rem-icon-wrapper green">
              <Activity size={18} color="#10B981" />
            </div>
            <div className="rem-info">
              <span className="rem-title">Thử thách Yoga tối</span>
              <span className="rem-time">09:00 PM</span>
            </div>
          </div>
          <div className={`figma-toggle-switch ${reminders.yoga ? 'active' : ''}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>
      </div>

      {/* Finish Button */}
      <div className="onboarding-actions-static mt-4">
        <button className="btn btn-primary w-full" onClick={handleFinish}>
          Hoàn thành thiết lập
        </button>
      </div>
    </div>
  );
}

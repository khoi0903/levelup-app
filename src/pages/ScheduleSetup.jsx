import React, { useState } from 'react';
import { ArrowLeft, Sun, Droplets, Activity, Edit3 } from 'lucide-react';

export default function ScheduleSetup({ onComplete, onBack, initialTime = '17:30 - 18:30', initialVoice = 'empathetic' }) {
  const [selectedDay, setSelectedDay] = useState(14); // T4 14 is default active in Figma Screen 4
  const [reminders, setReminders] = useState({
    morning: true,
    water: true,
    yoga: false,
  });

  const toggleReminder = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const datesList = [
    { dayName: 'T2', dateNum: 12 },
    { dayName: 'T3', dateNum: 13 },
    { dayName: 'T4', dateNum: 14 },
    { dayName: 'T5', dateNum: 15 },
  ];

  const handleFinish = () => {
    onComplete({
      selectedDay,
      reminders,
      reminderTime: initialTime,
      coachVoice: initialVoice,
    });
  };

  return (
    <div className="onboarding-screen fade-in">
      {/* Header Navigation with Dots Indicator */}
      <div className="figma-schedule-header">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <div className="figma-dots-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot active"></span>
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
          <span className="month-year-label">THÁNG 7 2026</span>
          <div className="calendar-nav-arrows">
            <span>&lt;</span>
            <span>&gt;</span>
          </div>
        </div>

        {/* Horizontal Dates Picker */}
        <div className="figma-dates-row">
          {datesList.map((item) => {
            const isCurrentActive = selectedDay === item.dateNum;
            return (
              <div
                key={item.dateNum}
                className={`figma-date-card ${isCurrentActive ? 'active' : ''}`}
                onClick={() => setSelectedDay(item.dateNum)}
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
          <div className="time-badge-pill">
            <span>{initialTime}</span>
            <Edit3 size={13} color="#0056C6" />
          </div>
        </div>
      </div>

      {/* Reminders Section Heading */}
      <h4 className="figma-section-heading">NHẮC NHỞ THÔNG MINH</h4>

      {/* Reminder Toggle List */}
      <div className="figma-reminders-list">
        {/* Morning Start */}
        <div className="figma-reminder-card" onClick={() => toggleReminder('morning')}>
          <div className="reminder-left">
            <div className="reminder-icon-bg sun">
              <Sun size={18} color="#0056C6" />
            </div>
            <div className="reminder-info">
              <span className="reminder-title">Khởi động sáng</span>
              <span className="reminder-sub">06:30 hằng ngày</span>
            </div>
          </div>
          <div className={`figma-toggle-switch ${reminders.morning ? 'active' : ''}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>

        {/* Water Intake */}
        <div className="figma-reminder-card" onClick={() => toggleReminder('water')}>
          <div className="reminder-left">
            <div className="reminder-icon-bg water">
              <Droplets size={18} color="#0056C6" />
            </div>
            <div className="reminder-info">
              <span className="reminder-title">Uống nước</span>
              <span className="reminder-sub">Mỗi 2 giờ</span>
            </div>
          </div>
          <div className={`figma-toggle-switch ${reminders.water ? 'active' : ''}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>

        {/* Relaxing Yoga */}
        <div className="figma-reminder-card" onClick={() => toggleReminder('yoga')}>
          <div className="reminder-left">
            <div className="reminder-icon-bg yoga">
              <Activity size={18} color="#0056C6" />
            </div>
            <div className="reminder-info">
              <span className="reminder-title">Yoga thư giãn</span>
              <span className="reminder-sub">21:00 trước khi ngủ</span>
            </div>
          </div>
          <div className={`figma-toggle-switch ${reminders.yoga ? 'active' : ''}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="onboarding-actions-static mt-auto">
        <button className="btn btn-primary w-full" onClick={handleFinish}>
          Hoàn tất thiết lập →
        </button>
      </div>
    </div>
  );
}

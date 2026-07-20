import React, { useState } from 'react';
import { ArrowLeft, Clock, Volume2, Calendar, Check } from 'lucide-react';

export default function ScheduleSetup({ onComplete, onBack, initialTime = '06:00', initialVoice = 'empathetic' }) {
  const [selectedDays, setSelectedDays] = useState(['T2', 'T3', 'T5', 'T7']);
  const [reminderTime, setReminderTime] = useState(initialTime);
  const [coachVoice, setCoachVoice] = useState(initialVoice);

  const weekDays = [
    { id: 'T2', label: 'T2' },
    { id: 'T3', label: 'T3' },
    { id: 'T4', label: 'T4' },
    { id: 'T5', label: 'T5' },
    { id: 'T6', label: 'T6' },
    { id: 'T7', label: 'T7' },
    { id: 'CN', label: 'CN' },
  ];

  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const handleFinish = () => {
    onComplete({ selectedDays, reminderTime, coachVoice });
  };

  return (
    <div className="onboarding-screen fade-in">
      {/* Header Navigation */}
      <div className="onboarding-header-nav-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="step-indicator-text">BƯỚC 4/4</span>
        <div style={{ width: 28 }}></div>
      </div>

      {/* Intro */}
      <div className="onboarding-intro">
        <h2 className="onboarding-title">Thiết lập lịch tập luyện</h2>
        <p className="onboarding-subtitle">
          Chọn số ngày tập mỗi tuần và giờ nhắc nhở lý tưởng của bạn.
        </p>
      </div>

      {/* Days Selection Section */}
      <div className="schedule-block card">
        <div className="schedule-label-row">
          <Calendar size={16} color="#0056C6" />
          <h4 className="schedule-section-label">Các ngày tập trong tuần ({selectedDays.length} ngày)</h4>
        </div>
        <div className="days-picker-row">
          {weekDays.map((day) => {
            const isSelected = selectedDays.includes(day.id);
            return (
              <button
                key={day.id}
                type="button"
                className={`day-circle-btn ${isSelected ? 'active' : ''}`}
                onClick={() => toggleDay(day.id)}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Reminder Time Picker */}
      <div className="schedule-block card">
        <div className="schedule-label-row">
          <Clock size={16} color="#FA5A15" />
          <h4 className="schedule-section-label">Giờ nhắc nhở hàng ngày</h4>
        </div>
        <div className="time-picker-wrapper">
          <input
            type="time"
            className="time-picker-input"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>
      </div>

      {/* AI Coach Voice Tone Selector */}
      <div className="schedule-block card">
        <div className="schedule-label-row">
          <Volume2 size={16} color="#8B5CF6" />
          <h4 className="schedule-section-label">Giọng nói Huấn luyện viên AI Aura</h4>
        </div>
        <div className="voice-options-list">
          <div
            className={`voice-card-option ${coachVoice === 'empathetic' ? 'selected' : ''}`}
            onClick={() => setCoachVoice('empathetic')}
          >
            <div className="voice-info">
              <span className="voice-title">Aura (Đồng cảm & Nhẹ nhàng)</span>
              <span className="voice-desc">Động viên nhẹ nhàng, phù hợp cho người mới bắt đầu.</span>
            </div>
            {coachVoice === 'empathetic' && <Check size={16} color="#0056C6" />}
          </div>

          <div
            className={`voice-card-option ${coachVoice === 'tough_love' ? 'selected' : ''}`}
            onClick={() => setCoachVoice('tough_love')}
          >
            <div className="voice-info">
              <span className="voice-title">Aura (Kỷ luật & Nghiêm khắc)</span>
              <span className="voice-desc">Nghiêm túc, thúc đẩy giới hạn bản thân bứt phá.</span>
            </div>
            {coachVoice === 'tough_love' && <Check size={16} color="#0056C6" />}
          </div>
        </div>
      </div>

      {/* Complete Action Button */}
      <div className="onboarding-actions-static mt-auto" style={{ marginTop: '20px' }}>
        <button className="btn btn-primary w-full" onClick={handleFinish}>
          Hoàn tất & Bắt đầu tập luyện
        </button>
      </div>
    </div>
  );
}

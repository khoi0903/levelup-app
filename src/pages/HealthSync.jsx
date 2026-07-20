import React, { useState } from 'react';
import { ArrowLeft, Activity, Heart, Smartphone, CheckCircle2 } from 'lucide-react';

export default function HealthSync({ onNext, onSkip, onBack }) {
  const [googleFitConnected, setGoogleFitConnected] = useState(true);
  const [garminConnected, setGarminConnected] = useState(false);

  return (
    <div className="onboarding-screen fade-in">
      {/* Header Navigation */}
      <div className="onboarding-header-nav-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="step-indicator-text">BƯỚC 3/4</span>
        <button className="skip-link-btn" onClick={onSkip}>
          Bỏ qua
        </button>
      </div>

      {/* Intro */}
      <div className="onboarding-intro">
        <h2 className="onboarding-title">Kết nối dữ liệu sức khỏe</h2>
        <p className="onboarding-subtitle">
          Đồng bộ tự động bước chân, nhịp tim & calo tiêu thụ từ thiết bị của bạn.
        </p>
      </div>

      {/* Health App Cards */}
      <div className="health-connect-cards-list">
        {/* Google Fit / Apple Health */}
        <div className={`health-connect-card ${googleFitConnected ? 'connected' : ''}`}>
          <div className="health-card-left">
            <div className="health-icon-bg google-fit">
              <Activity size={22} color="#4285F4" />
            </div>
            <div className="health-card-info">
              <h4 className="health-card-name">Google Fit / Apple Health</h4>
              <span className="health-card-sub">Đếm bước chân & calo tự động</span>
            </div>
          </div>
          <button
            className={`btn ${googleFitConnected ? 'btn-outline connected-btn' : 'btn-primary'} btn-sm-connect`}
            onClick={() => setGoogleFitConnected(!googleFitConnected)}
          >
            {googleFitConnected ? (
              <>
                <CheckCircle2 size={14} color="#10B981" style={{ marginRight: 4 }} />
                Đã kết nối
              </>
            ) : (
              'Kết nối ngay'
            )}
          </button>
        </div>

        {/* Garmin / Smartwatch */}
        <div className={`health-connect-card ${garminConnected ? 'connected' : ''}`}>
          <div className="health-card-left">
            <div className="health-icon-bg garmin">
              <Heart size={22} color="#FA5A15" />
            </div>
            <div className="health-card-info">
              <h4 className="health-card-name">Garmin / Đồng hồ thông minh</h4>
              <span className="health-card-sub">Đồng bộ nhịp tim & bài tập ngoài trời</span>
            </div>
          </div>
          <button
            className={`btn ${garminConnected ? 'btn-outline connected-btn' : 'btn-primary'} btn-sm-connect`}
            onClick={() => setGarminConnected(!garminConnected)}
          >
            {garminConnected ? (
              <>
                <CheckCircle2 size={14} color="#10B981" style={{ marginRight: 4 }} />
                Đã kết nối
              </>
            ) : (
              'Kết nối'
            )}
          </button>
        </div>
      </div>

      {/* Info Callout */}
      <div className="health-info-callout">
        <Smartphone size={20} color="#0056C6" style={{ flexShrink: 0 }} />
        <p className="health-info-text">
          LevelUp sẽ tự động đếm bước chân thời gian thực ngay cả khi bạn đóng ứng dụng.
        </p>
      </div>

      {/* Continue Action Button */}
      <div className="onboarding-actions-static mt-auto">
        <button className="btn btn-primary w-full" onClick={onNext}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

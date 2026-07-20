import React, { useState } from 'react';
import { 
  Plus, CheckCircle2, Activity, Lightbulb, 
  BarChart2, Heart, Moon, Footprints, Utensils, Droplets, ArrowLeft
} from 'lucide-react';

export default function HealthSync({ onNext, onSkip, onBack }) {
  const [appleConnected, setAppleConnected] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(false);

  // Toggle states matching Figma Screen 3
  const [permissions, setPermissions] = useState({
    bodyComp: true,
    heartRate: true,
    sleep: true,
    activity: true,
    nutrition: false,
    water: false,
  });

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const permissionItems = [
    {
      key: 'bodyComp',
      title: 'Thành phần cơ thể',
      sub: 'Cân nặng, BMI, Tỷ lệ mỡ',
      icon: BarChart2,
      color: '#0056C6',
      bg: '#EBF3FF',
    },
    {
      key: 'heartRate',
      title: 'Nhịp tim',
      sub: 'Nhịp tim nghỉ ngơi, HRV',
      icon: Heart,
      color: '#EF4444',
      bg: '#FEE2E2',
    },
    {
      key: 'sleep',
      title: 'Giấc ngủ',
      sub: 'Thời gian ngủ, các giai đoạn ngủ',
      icon: Moon,
      color: '#0056C6',
      bg: '#EBF3FF',
    },
    {
      key: 'activity',
      title: 'Hoạt động',
      sub: 'Số bước, Calo tiêu thụ',
      icon: Footprints,
      color: '#D97706',
      bg: '#FEF3C7',
    },
    {
      key: 'nutrition',
      title: 'Dinh dưỡng',
      sub: 'Lượng Calo nạp vào, Macro',
      icon: Utensils,
      color: '#10B981',
      bg: '#D1FAE5',
    },
    {
      key: 'water',
      title: 'Lượng nước',
      sub: 'Lượng nước tiêu thụ hàng ngày',
      icon: Droplets,
      color: '#F59E0B',
      bg: '#FEF3C7',
    },
  ];

  return (
    <div className="onboarding-screen fade-in">
      {/* Top Header */}
      <div className="onboarding-header-nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px 20px', boxSizing: 'border-box' }}>
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48 }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span className="step-indicator-text" style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em' }}>BƯỚC 3/5</span>
          <div className="figma-dots-indicator" style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '16px', height: '6px', borderRadius: '99px', background: '#0056c6' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
          </div>
        </div>
        <button className="figma-skip-btn" onClick={onSkip} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: '800', cursor: 'pointer', padding: 0 }}>
          Bỏ qua
        </button>
      </div>

      {/* Hero Badge Circle Icon */}
      <div className="figma-health-badge-circle">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2V11H2V21H11V30H21V21H30V11H21V2H11Z" fill="#0056C6"/>
          <path d="M2 16H9.5L12.5 10L16 22L20 13L22.5 16H30" stroke="#EBF3FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Title & Subtitle */}
      <div className="figma-health-intro">
        <h2 className="figma-health-title">Kết nối sức khỏe</h2>
        <p className="figma-health-sub">
          Để AI Coach có thể cá nhân hóa lộ trình tập luyện tốt nhất, LevelUp cần bạn cấp quyền truy cập các chỉ số sau:
        </p>
      </div>

      {/* Blue Callout Card */}
      <div className="figma-reason-card">
        <h4 className="reason-card-title">Tại sao chúng tôi cần dữ liệu này?</h4>
        <ul className="reason-list">
          <li className="reason-item">
            <CheckCircle2 size={15} color="#0056C6" className="reason-icon" />
            <span><strong>Theo dõi chính xác:</strong> Cung cấp dữ liệu nền tảng cho mọi phân tích.</span>
          </li>
          <li className="reason-item">
            <Activity size={15} color="#0056C6" className="reason-icon" />
            <span><strong>Phân tích AI thời gian thực:</strong> Điều chỉnh cường độ bài tập dựa trên thể trạng hiện tại.</span>
          </li>
          <li className="reason-item">
            <Lightbulb size={15} color="#0056C6" className="reason-icon" />
            <span><strong>Đề xuất bài tập cá nhân:</strong> Lộ trình được thiết kế riêng biệt để đạt hiệu quả tối đa.</span>
          </li>
        </ul>
      </div>

      {/* Apple / Android Health Connect Options */}
      <h4 style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', margin: '0 0 10px 0', textTransform: 'uppercase' }}>KẾT NỐI HỆ THỐNG</h4>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <div className="health-connect-card" onClick={() => setAppleConnected(!appleConnected)} style={{
          flex: 1, padding: '12px', borderRadius: '16px',
          border: appleConnected ? '2px solid #0056C6' : '1.5px solid #e2e8f0',
          background: appleConnected ? '#ebf3ff' : '#ffffff',
          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxSizing: 'border-box', transition: 'all 0.2s'
        }}>
          <span style={{ fontSize: '22px' }}>🍎</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <strong style={{ fontSize: '11.5px', color: '#0f172a', display: 'block' }}>Apple Health</strong>
            <span style={{ fontSize: '9px', color: appleConnected ? '#0056c6' : '#64748b', fontWeight: appleConnected ? '800' : '400' }}>
              {appleConnected ? '✓ Đã kết nối' : 'Nhấp để kết nối'}
            </span>
          </div>
        </div>

        <div className="health-connect-card" onClick={() => setGoogleConnected(!googleConnected)} style={{
          flex: 1, padding: '12px', borderRadius: '16px',
          border: googleConnected ? '2px solid #0056C6' : '1.5px solid #e2e8f0',
          background: googleConnected ? '#ebf3ff' : '#ffffff',
          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxSizing: 'border-box', transition: 'all 0.2s'
        }}>
          <span style={{ fontSize: '22px' }}>🤖</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <strong style={{ fontSize: '11.5px', color: '#0f172a', display: 'block' }}>Android Health</strong>
            <span style={{ fontSize: '9px', color: googleConnected ? '#0056c6' : '#64748b', fontWeight: googleConnected ? '800' : '400' }}>
              {googleConnected ? '✓ Đã kết nối' : 'Nhấp để kết nối'}
            </span>
          </div>
        </div>
      </div>

      {/* Permissions Toggle List */}
      <h4 style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', margin: '0 0 10px 0', textTransform: 'uppercase' }}>CHỈ SỐ SỨC KHỎE CHI TIẾT</h4>
      <div className="figma-perm-list">
        {permissionItems.map((item) => {
          const Icon = item.icon;
          const isChecked = permissions[item.key];
          return (
            <div key={item.key} className="figma-perm-card" onClick={() => togglePermission(item.key)}>
              <div className="perm-left">
                <div className="perm-icon-wrapper" style={{ backgroundColor: item.bg }}>
                  <Icon size={18} color={item.color} />
                </div>
                <div className="perm-info">
                  <span className="perm-title">{item.title}</span>
                  <span className="perm-sub">{item.sub}</span>
                </div>
              </div>
              <div className={`figma-toggle-switch ${isChecked ? 'active' : ''}`}>
                <div className="toggle-thumb"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Button */}
      <div className="onboarding-actions-static mt-3">
        <button className="btn btn-primary w-full" onClick={onNext}>
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}

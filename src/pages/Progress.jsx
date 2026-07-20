import React, { useState } from 'react';
import { ArrowLeft, Flame, Award, Calendar, CheckCircle2, ChevronRight, Lock, Sparkles, Zap, Shield, Trophy, Star, Heart, Dumbbell, Moon, Target, Users, Clock, TrendingUp } from 'lucide-react';

export default function Progress({ 
  xp = 850, 
  maxXp = 1200, 
  level = 4, 
  checkInHistory = [12, 13, 14, 15, 17], 
  onToggleCheckIn,
  activeStreak = 12,
  setActivePage
}) {
  const [activeTab, setActiveTab] = useState('achievements'); // 'achievements', 'level', 'calendar'

  // Current Calendar Month parameters matching Figma (Tháng 7, 2026)
  const totalDays = 31;
  const daysList = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Weekly badges
  const weeklyAchievements = [
    {
      id: 'consistent_soldier',
      title: 'Chiến binh bền bỉ',
      desc: 'Tập liên tiếp 5 ngày.',
      status: 'completed',
      xpReward: '+200 XP',
      color: '#FA5A15',
      bg: '#FFF0EA',
      icon: <Flame size={18} color="#FA5A15" />,
    },
    {
      id: 'speedy',
      title: 'Siêu tốc độ',
      desc: 'Hoàn thành bài tập HIIT x3.',
      status: 'completed',
      xpReward: '+150 XP',
      color: '#10B981',
      bg: '#D1FAE5',
      icon: <Zap size={18} color="#10B981" />,
    },
    {
      id: 'early_riser',
      title: 'Vượt giới hạn',
      desc: 'Tập luyện sớm trước 6 AM.',
      status: 'locked',
      xpReward: '+100 XP',
      color: '#94A3B8',
      bg: '#F1F5F9',
      icon: <Moon size={18} color="#94A3B8" />,
    },
    {
      id: 'calorie_burner',
      title: 'Đốt cháy calo',
      desc: 'Tiêu thụ trên 500 kcal trong 1 buổi.',
      status: 'completed',
      xpReward: '+120 XP',
      color: '#EF4444',
      bg: '#FEE2E2',
      icon: <Target size={18} color="#EF4444" />,
    },
  ];

  // All achievements organized by category
  const allAchievements = [
    {
      category: 'Kỷ lục cá nhân',
      items: [
        {
          id: 'first_workout',
          title: 'Bước đầu tiên',
          desc: 'Hoàn thành buổi tập đầu tiên.',
          status: 'completed',
          xpReward: '+50 XP',
          color: '#0056C6',
          bg: '#EBF3FF',
          icon: <Star size={18} color="#0056C6" />,
        },
        {
          id: 'week_warrior',
          title: 'Chiến binh 7 ngày',
          desc: 'Tập đủ 7 ngày trong một tuần.',
          status: 'completed',
          xpReward: '+300 XP',
          color: '#FA5A15',
          bg: '#FFF0EA',
          icon: <Trophy size={18} color="#FA5A15" />,
        },
        {
          id: 'muscle_up',
          title: 'Lên cơ nhanh',
          desc: 'Tăng 2kg cơ trong 30 ngày.',
          status: 'locked',
          xpReward: '+250 XP',
          color: '#94A3B8',
          bg: '#F1F5F9',
          icon: <Dumbbell size={18} color="#94A3B8" />,
        },
        {
          id: 'heart_hero',
          title: 'Anh hùng tim mạch',
          desc: 'Duy trì nhịp tim 130+ BPM trong 20 phút.',
          status: 'completed',
          xpReward: '+180 XP',
          color: '#EF4444',
          bg: '#FEE2E2',
          icon: <Heart size={18} color="#EF4444" />,
        },
      ]
    },
    {
      category: 'Thử thách đặc biệt',
      items: [
        {
          id: 'month_champion',
          title: 'Vô địch tháng',
          desc: 'Tập trên 20 buổi trong một tháng.',
          status: 'completed',
          xpReward: '+500 XP',
          color: '#8B5CF6',
          bg: '#F3E8FF',
          icon: <Award size={18} color="#8B5CF6" />,
        },
        {
          id: 'social_star',
          title: 'Ngôi sao cộng đồng',
          desc: 'Mời 3 bạn bè tham gia LevelUp.',
          status: 'locked',
          xpReward: '+200 XP',
          color: '#94A3B8',
          bg: '#F1F5F9',
          icon: <Users size={18} color="#94A3B8" />,
        },
        {
          id: 'marathon_ready',
          title: 'Sẵn sàng marathon',
          desc: 'Chạy tổng cộng 100km.',
          status: 'locked',
          xpReward: '+800 XP',
          color: '#94A3B8',
          bg: '#F1F5F9',
          icon: <TrendingUp size={18} color="#94A3B8" />,
        },
        {
          id: 'night_owl',
          title: 'Cú đêm',
          desc: 'Hoàn thành 5 buổi tập sau 9 PM.',
          status: 'completed',
          xpReward: '+150 XP',
          color: '#F59E0B',
          bg: '#FEF3C7',
          icon: <Clock size={18} color="#F59E0B" />,
        },
      ]
    }
  ];

  return (
    <div className="progress-page-v2 fade-in">
      {/* Header Row */}
      <div className="figma-progress-header">
        <button className="back-btn-icon" onClick={() => setActivePage('dashboard')} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="figma-progress-title">Chuỗi</span>
        <div style={{ width: 28 }}></div>
      </div>

      {/* Tabs Row */}
      <div className="figma-progress-tabs">
        <button
          className={`progress-tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Thành tích
        </button>
        <button
          className={`progress-tab-btn ${activeTab === 'level' ? 'active' : ''}`}
          onClick={() => setActiveTab('level')}
        >
          Cấp độ
        </button>
        <button
          className={`progress-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Lịch
        </button>
      </div>

      {/* TAB CONTENT: THÀNH TÍCH */}
      {activeTab === 'achievements' && (
        <div className="tab-content-v2 fade-in">
          {/* Total Calo stats container */}
          <div className="figma-total-stats-card card">
            <span className="total-stats-label">TỔNG CALO TIÊU THỤ</span>
            <div className="total-stats-value-row">
              <span className="total-value-num">2,450</span>
              <span className="total-value-unit">kcal</span>
              <div className="pulse-icon-bg">
                <Flame size={14} color="#FA5A15" fill="#FA5A15" />
              </div>
            </div>
            <p className="total-stats-percentage">+12% so với tuần trước</p>

            <div className="stats-sub-row">
              <div className="sub-stat-col">
                <span className="sub-label">BUỔI TẬP</span>
                <span className="sub-val"><strong>5</strong> / 7 ngày</span>
              </div>
              <div className="sub-stat-col">
                <span className="sub-label">THỜI GIAN</span>
                <span className="sub-val"><strong>320</strong> phút</span>
              </div>
            </div>
          </div>

          {/* XP Summary pill row */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', marginBottom: '4px' }}>
            <div style={{ flex: 1, background: '#EBF3FF', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#0056c6', fontWeight: '800', marginBottom: '2px' }}>TUẦN NÀY</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0056c6' }}>+670 XP</div>
            </div>
            <div style={{ flex: 1, background: '#F0FDF4', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '800', marginBottom: '2px' }}>ĐÃ MỞ KHÓA</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#10b981' }}>7 huy hiệu</div>
            </div>
          </div>

          {/* Section: Weekly badges */}
          <h4 className="figma-section-title-bold" style={{ margin: '20px 0 12px 0' }}>Huy hiệu tuần này</h4>
          
          <div className="figma-achievements-list">
            {weeklyAchievements.map((item) => (
              <div key={item.id} className="figma-achievement-card card">
                <div className="ach-left">
                  <div className="ach-icon-wrapper" style={{ backgroundColor: item.bg }}>
                    {item.icon}
                  </div>
                  <div className="ach-info">
                    <span className="ach-title">{item.title}</span>
                    <span className="ach-desc">{item.desc}</span>
                  </div>
                </div>
                <div className="ach-right-status">
                  {item.status === 'completed' ? (
                    <span className="xp-reward-pill completed">{item.xpReward}</span>
                  ) : (
                    <div className="lock-icon-bg"><Lock size={12} color="#94A3B8" /></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Section: All achievements by category */}
          {allAchievements.map((group) => (
            <div key={group.category}>
              <h4 className="figma-section-title-bold" style={{ margin: '20px 0 12px 0' }}>{group.category}</h4>
              <div className="figma-achievements-list">
                {group.items.map((item) => (
                  <div key={item.id} className="figma-achievement-card card" style={{
                    opacity: item.status === 'locked' ? 0.65 : 1,
                  }}>
                    <div className="ach-left">
                      <div className="ach-icon-wrapper" style={{ backgroundColor: item.bg }}>
                        {item.icon}
                      </div>
                      <div className="ach-info">
                        <span className="ach-title">{item.title}</span>
                        <span className="ach-desc">{item.desc}</span>
                      </div>
                    </div>
                    <div className="ach-right-status">
                      {item.status === 'completed' ? (
                        <span className="xp-reward-pill completed">{item.xpReward}</span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                          <div className="lock-icon-bg"><Lock size={12} color="#94A3B8" /></div>
                          <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700' }}>{item.xpReward}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom padding for nav */}
          <div style={{ height: '16px' }} />
        </div>
      )}


      {/* TAB CONTENT: 等级 - CẤP ĐỘ (Figma Screen 3) */}
      {activeTab === 'level' && (
        <div className="tab-content-v2 fade-in">
          {/* Level Badge Card */}
          <div className="figma-level-badge-card card">
            <div className="level-badge-left">
              <span className="level-badge-sub">CẤP ĐỘ HIỆN TẠI</span>
              <h3 className="level-badge-main-title">Vàng</h3>
              <p className="level-badge-next-xp">
                Còn <strong style={{ color: '#FA5A15' }}>350 XP</strong> tới Bạch Kim 
                <span className="xp-fraction-small">850 / 1200 XP</span>
              </p>
            </div>
            <div className="level-medal-wrapper">
              <div className="medal-icon-bg">🏆</div>
            </div>

            {/* Custom linear progress track */}
            <div className="level-progress-bar-v2" style={{ marginTop: '16px' }}>
              <div className="level-progress-fill-v2" style={{ width: '70.8%' }}></div>
            </div>

            <div className="level-stats-footer-row">
              <div className="level-footer-col">
                <span className="level-footer-label">Chuỗi dài nhất</span>
                <span className="level-footer-val">42 ngày</span>
              </div>
              <div className="level-footer-col">
                <span className="level-footer-label">Tổng XP</span>
                <span className="level-footer-val">9.4k</span>
              </div>
            </div>
          </div>

          <div className="figma-section-header" style={{ marginTop: '20px', marginBottom: '12px' }}>
            <h3 className="figma-section-title-bold">Đặc quyền cấp độ</h3>
            <button className="figma-view-all-link">Xem tất cả</button>
          </div>

          {/* Level Privileges list */}
          <div className="figma-privilege-list">
            <div className="privilege-card card">
              <div className="priv-left">
                <div className="priv-icon-bg"><Sparkles size={16} color="#10B981" /></div>
                <div className="priv-info">
                  <span className="priv-title">Hệ số XP x1.2</span>
                  <span className="priv-sub">Nhận thêm XP cho mỗi bài tập hoàn thành.</span>
                </div>
              </div>
              <CheckCircle2 size={16} color="#10B981" />
            </div>

            <div className="privilege-card card">
              <div className="priv-left">
                <div className="priv-icon-bg"><Shield size={16} color="#10B981" /></div>
                <div className="priv-info">
                  <span className="priv-title">Bảo vệ chuỗi 24h</span>
                  <span className="priv-sub">Tự động kích hoạt khi bạn lỡ một ngày.</span>
                </div>
              </div>
              <CheckCircle2 size={16} color="#10B981" />
            </div>

            <div className="privilege-card card locked">
              <div className="priv-left">
                <div className="priv-icon-bg"><Lock size={16} color="#94A3B8" /></div>
                <div className="priv-info">
                  <span className="priv-title">Biểu tượng Bạch Kim</span>
                  <span className="priv-sub">Mở khóa diện mạo hồ sơ độc quyền.</span>
                </div>
              </div>
              <span className="priv-lock-text">Cấp 5</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 日历 - LỊCH (Figma Screen 4) */}
      {activeTab === 'calendar' && (
        <div className="tab-content-v2 fade-in">
          {/* Calendar Picker Card */}
          <div className="figma-calendar-picker-card card">
            <div className="calendar-card-top">
              <span className="month-year-label">Tháng 7, 2026</span>
              <div className="calendar-nav-arrows">
                <span>&lt;</span>
                <span>&gt;</span>
              </div>
            </div>

            {/* Custom Grid */}
            <div className="figma-calendar-month-grid">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((wDay) => (
                <div key={wDay} className="month-grid-header">{wDay}</div>
              ))}

              {/* Pad offset for start of month (e.g. Month starts on Wednesday) */}
              <div className="month-grid-cell empty"></div>
              <div className="month-grid-cell empty"></div>

              {daysList.map((day) => {
                const isCompleted = checkInHistory.includes(day);
                const isFigmaHighlighted = day === 14 || day === 15;
                const isBlueCheck = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].includes(day);

                return (
                  <button
                    key={day}
                    className={`month-grid-cell ${isBlueCheck ? 'figma-checked' : ''} ${isFigmaHighlighted ? 'figma-active' : ''}`}
                    onClick={() => onToggleCheckIn(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Row */}
          <div className="figma-metrics-row">
            <div className="metric-box blue card">
              <div className="metric-icon-bg"><Flame size={15} color="#0056C6" fill="#0056C6" /></div>
              <span className="metric-title-small">Chuỗi hiện tại</span>
              <span className="metric-value-bold">{activeStreak} ngày</span>
            </div>

            <div className="metric-box green card">
              <div className="metric-icon-bg"><Calendar size={15} color="#10B981" /></div>
              <span className="metric-title-small">Tổng trong tháng</span>
              <span className="metric-value-bold">22 buổi</span>
            </div>
          </div>

          {/* Records Trophy Box */}
          <div className="figma-trophy-message-box card">
            <div className="trophy-box-left">
              <div className="trophy-badge-icon">🏆</div>
              <div className="trophy-text-col">
                <h4 className="trophy-box-title">Đang phá kỷ lục!</h4>
                <p className="trophy-box-sub">
                  Bạn đã tập luyện liên tục 12 ngày qua. Chỉ cần 3 ngày nữa để nhận huy chương "Kiên Trì Bền Bỉ"!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

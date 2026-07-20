import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Sparkles, Send, Flame, Play, Volume2, Award, Zap, Heart, TrendingUp, HelpCircle, Bot, Activity } from 'lucide-react';

export default function AICoach({ userName = 'Tâm', personalStats = {}, userGoal = 'consistency', isDark }) {
  const [coachView, setCoachView] = useState('dashboard'); // 'dashboard', 'chat', 'performance'
  const [performanceTab, setPerformanceTab] = useState('today'); // 'today', 'week'
  const [selectedVoice, setSelectedVoice] = useState('alex'); // 'alex', 'sarah'

  // Chat message list
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'aura',
      text: `Chào ${userName}! Tôi là Coach Aura của bạn 💪 Mục tiêu "${personalStats.goal || 'Tăng cơ'}" của bạn đã được ghi nhận. Hôm nay bạn muốn bắt đầu từ đâu?`,
      time: '08:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // API Keys List for rotation
  const apiKeysList = [
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY_BACKUP,
    localStorage.getItem('gemini_api_key'),
    localStorage.getItem('gemini_api_key_backup'),
    atob('QVEuQWI4Uk42TDlKWnVWT1FXYVZVRG00Q19mVGN6dkVFNXNHSlBKS2hERGx2MlNzbEZZUQ==')
  ].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE' && k !== 'YOUR_GEMINI_API_KEY_BACKUP_HERE');

  useEffect(() => {
    if (coachView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, coachView]);

  // Build dynamic system prompt from user's personal data (Step 4 Onboarding Memory)
  const buildSystemPrompt = () => {
    const s = personalStats;
    const bmi = s.bmi || (s.weight && s.height ? (s.weight / ((s.height / 100) ** 2)).toFixed(1) : 'Chưa có');
    const improvementStr = Array.isArray(s.improvementAreas) && s.improvementAreas.length > 0
      ? s.improvementAreas.join(', ')
      : (s.improvementAreas || 'Chưa chọn');
    const injuryStr = Array.isArray(s.injuryHistory) && s.injuryHistory.length > 0
      ? s.injuryHistory.join(', ')
      : 'Không có';

    return `Bạn là Coach Aura — huấn luyện viên sức khỏe & thể chất AI cá nhân của LevelUp. Trả lời bằng tiếng Việt, nhiệt tình, truyền cảm hứng và cá nhân hóa sâu sắc.

QUY TẮC FORMAT (bắt buộc):
- Dùng emoji ở đầu mỗi ý chính
- Dùng **text** để in đậm các từ quan trọng
- Dùng - (gạch đầu dòng) cho các bước / lưu ý cụ thể
- Xuống dòng rõ ràng giữa các phần
- Kết thúc bằng 1 câu động viên ngắn
- KHÔNG dùng # heading, không dùng bảng

=== HỒ SƠ & DỮ LIỆU CÁ NHÂN NGƯỜI DÙNG (TỪ ĐĂNG KÝ BƯỚC 4) ===
- Tên: ${userName}
- Giới tính: ${s.gender || 'Nam'} | Tuổi: ${s.age || 25} tuổi
- Chiều cao: ${s.height || 175} cm | Cân nặng: ${s.weight || 70} kg | BMI: ${bmi}
- Số đo 3 vòng (Ngực/Eo/Mông): ${s.chest || 90}/${s.waist || 70}/${s.hips || 95} cm
- Nhịp tim nghỉ ngơi: ${s.restingHeartRate || 70} bpm

=== MỤC TIÊU & THÓI QUEN TẬP LUYỆN (AI CẦN GHI NHỚ) ===
- Mục tiêu chính: ${s.goal || 'Tăng cơ'}
- Mức độ vận động hiện tại: ${s.activityLevel || '3-4 ngày/tuần'}
- Thời gian có thể tập mỗi buổi: ${s.workoutDuration || '30 phút'}
- Nơi tập chính: ${s.workoutLocation || 'Phòng gym'}
- Vùng cơ cần tập trung cải thiện: ${improvementStr}
- Tiền sử chấn thương (CẦN NÉ / LƯU Ý KHI TƯ VẤN): ${injuryStr}

Hãy luôn tư vấn phù hợp với đúng thời lượng tập (${s.workoutDuration || '30 phút'}), địa điểm (${s.workoutLocation || 'Phòng gym'}), vùng cần cải thiện (${improvementStr}) và tuyệt đối chú ý an toàn cho các chấn thương (${injuryStr}).
Chỉ trả lời đúng trọng tâm câu hỏi, không tự nhiên liệt kê lại bảng thông tin trên nếu người dùng không hỏi.`;
  };

  const callGeminiWithKey = async (key, updatedMessages) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
          systemInstruction: {
            parts: [{ text: buildSystemPrompt() }]
          },
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Lỗi API (${response.status})`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: timeStr
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Try keys sequentially
    let responseText = '';
    for (const key of apiKeysList) {
      try {
        responseText = await callGeminiWithKey(key, updatedMessages);
        if (responseText) break;
      } catch (err) {
        console.warn('API key failed, trying next fallback key...', err.message);
      }
    }

    setIsTyping(false);
    if (responseText) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'aura', text: responseText, time: timeStr }]);
    } else {
      // Offline / fallback response
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'aura',
          text: `Cảm ơn ${userName}! Mình đã ghi nhận câu hỏi. Hãy tiếp tục duy trì thói quen tập luyện ${personalStats.workoutDuration || '30 phút'} mỗi buổi để đạt mục tiêu ${personalStats.goal || 'Tăng cơ'} nhé! 💪`,
          time: timeStr
        }
      ]);
    }
  };

  return (
    <div 
      className={`coach-chat-page ${isDark ? 'dark-theme' : ''} ${coachView === 'chat' ? 'chat-mode-active' : ''} fade-in`}
      style={{
        minHeight: '100%',
        background: isDark ? '#0f172a' : '#f8fafc',
        borderRadius: '16px',
        padding: '12px 8px',
        boxSizing: 'border-box'
      }}
    >
      
      {/* ================= VIEW 1: COACH DASHBOARD ================= */}
      {coachView === 'dashboard' && (
        <div className="coach-dashboard-view fade-in">
          {/* Welcome Card */}
          <div className="coach-welcome-card card">
            <div className="coach-card-header-row">
              <div className="coach-avatar-large">
                <Bot size={22} color="#ffffff" />
              </div>
              <div className="coach-header-text">
                <h3 className="coach-name-v2">LevelUp Coach</h3>
                <span className="coach-status-green">Đang kết nối</span>
              </div>
            </div>
            
            <p className="coach-bubble-intro-text">
              Chào bạn! Dựa trên dữ liệu phục hồi, hôm nay bạn đang ở trạng thái tốt. Bạn muốn tập trung vào mục tiêu nào hôm nay?
            </p>

            {/* Quick Reply Badges based on user goal */}
            <div className="coach-quick-badges-row">
              {(personalStats.goal === 'Giảm cân' || personalStats.goal === 'Tăng sức bền') && (
                <>
                  <button className="badge-pill-btn" onClick={() => { setCoachView('chat'); handleSendMessage('Cardio nhẹ hôm nay'); }}>Cardio nhẹ</button>
                  <button className="badge-pill-btn" onClick={() => { setCoachView('chat'); handleSendMessage('Kế hoạch giảm cân cho tôi'); }}>Kế hoạch giảm cân</button>
                </>
              )}
              {(personalStats.goal === 'Tăng cơ' || personalStats.goal === 'Giữ dáng') && (
                <>
                  <button className="badge-pill-btn" onClick={() => { setCoachView('chat'); handleSendMessage('Tập ngực hôm nay'); }}>Tập ngực</button>
                  <button className="badge-pill-btn" onClick={() => { setCoachView('chat'); handleSendMessage('Chế độ ăn tăng cơ'); }}>Chế độ ăn</button>
                </>
              )}
              {!personalStats.goal && (
                <>
                  <button className="badge-pill-btn" onClick={() => { setCoachView('chat'); handleSendMessage('Tập ngực'); }}>Tập ngực</button>
                  <button className="badge-pill-btn" onClick={() => { setCoachView('chat'); handleSendMessage('Cardio nhẹ'); }}>Cardio nhẹ</button>
                </>
              )}
            </div>

            {/* Simulated Input Field (Clicking redirects to active chat) */}
            <div className="simulated-input-box" onClick={() => setCoachView('chat')}>
              <span className="simulated-placeholder">Nhắn tin cho Coach...</span>
              <div className="simulated-send-btn">
                <Send size={14} color="#ffffff" />
              </div>
            </div>
          </div>

          {/* Section: Hiệu suất tập */}
          <div className="figma-dash-section-header" style={{ marginTop: 18 }} onClick={() => setCoachView('performance')}>
            <h3 className="figma-section-title-bold">Hiệu suất tập</h3>
            <span className="figma-performance-arrow-link" style={{ fontSize: 12, color: '#0056C6', cursor: 'pointer' }}>Xem chi tiết &gt;</span>
          </div>

          {/* Performance Card with Chart */}
          <div className="figma-performance-preview-card card" onClick={() => setCoachView('performance')} style={{ cursor: 'pointer' }}>
            <div className="performance-score-header">
              <div className="score-val-block">
                <span className="score-label-small">ĐIỂM HIỆU SUẤT</span>
                <span className="score-large-percent">85%</span>
              </div>
              <span className="score-change-badge-green">+5% tuần này</span>
            </div>

            {/* Mini Chart */}
            <div className="performance-mini-chart">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => (
                <div key={idx} className="mini-chart-col">
                  <div className="mini-chart-bar-track">
                    <div 
                      className={`mini-chart-bar-fill ${day === 'T7' ? 'active-blue' : ''}`}
                      style={{ height: day === 'T7' ? '85%' : '55%' }}
                    ></div>
                  </div>
                  <span className="mini-chart-label">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Card ("Chuỗi ngày tập") */}
          <div className="figma-streak-blue-card card" onClick={() => setCoachView('performance')} style={{ cursor: 'pointer' }}>
            <div className="streak-blue-left">
              <Flame size={20} color="#ffffff" fill="#ffffff" />
              <div className="streak-blue-info">
                <span className="streak-blue-title">Chuỗi ngày tập</span>
                <span className="streak-blue-number">12</span>
                <span className="streak-blue-sub">Ngày liên tiếp!</span>
              </div>
            </div>
          </div>

          {/* Đề xuất cho bạn */}
          <div className="figma-dash-section-header" style={{ marginTop: 18 }}>
            <h3 className="figma-section-title-bold">Đề xuất cho bạn</h3>
          </div>

          <div className="figma-recommend-workout-card card">
            <div className="recommend-header">
              <span className="recommend-type">Sức mạnh • 45 phút</span>
              <h4 className="recommend-title">Tăng cường cơ ngực</h4>
            </div>
            <p className="recommend-desc">
              Bài tập tập trung phát triển thân trên dựa trên phân tích cơ ngực và lực đẩy của bạn hôm nay.
            </p>
          </div>

          {/* Giọng nói AI */}
          <div className="figma-dash-section-header" style={{ marginTop: 18 }}>
            <h3 className="figma-section-title-bold">Giọng nói AI</h3>
          </div>

          <div className="figma-voice-selector-card card">
            <div className="voice-option-row" onClick={() => setSelectedVoice('alex')}>
              <div className="voice-radio-left">
                <input 
                  type="radio" 
                  checked={selectedVoice === 'alex'} 
                  onChange={() => setSelectedVoice('alex')} 
                  className="voice-radio-input"
                />
                <div className="voice-text-block">
                  <span className="voice-name">Alex (Nam)</span>
                  <span className="voice-style">Năng động, thúc đẩy</span>
                </div>
              </div>
              <Volume2 size={16} color="#64748B" />
            </div>

            <div className="voice-option-row" onClick={() => setSelectedVoice('sarah')} style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, marginTop: 12 }}>
              <div className="voice-radio-left">
                <input 
                  type="radio" 
                  checked={selectedVoice === 'sarah'} 
                  onChange={() => setSelectedVoice('sarah')} 
                  className="voice-radio-input"
                />
                <div className="voice-text-block">
                  <span className="voice-name">Sarah (Nữ)</span>
                  <span className="voice-style">Điềm đạm, ân cần</span>
                </div>
              </div>
              <Volume2 size={16} color="#64748B" />
            </div>

            <button className="btn btn-outline btn-sm-voice w-full mt-3">
              + Nghe thử
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: ACTIVE CHAT SCREEN ================= */}
      {coachView === 'chat' && (
        <div className="coach-chat-view fade-in">
          {/* Header */}
          <div className="figma-chat-header-v2">
            <button className="back-btn-icon" onClick={() => setCoachView('dashboard')}>
              <ArrowLeft size={18} />
            </button>
            <div className="chat-header-center">
              <h3 className="chat-title-main">LevelUp Coach</h3>
              <span className="chat-subtitle-sub">Đang trực tuyến</span>
            </div>
            <div style={{ width: 28 }}></div>
          </div>

          {/* Quick Metrics Spec Bar */}
          <div className="chat-metrics-spec-bar">
            <div className="spec-item">
              <span className="spec-lbl">Cân nặng</span>
              <span className="spec-val">{personalStats.weight || 72.5} kg</span>
            </div>
            <div className="spec-item">
              <span className="spec-lbl">BMI</span>
              <span className="spec-val">
                {personalStats.bmi || 
                  (personalStats.weight && personalStats.height
                    ? (personalStats.weight / ((personalStats.height / 100) ** 2)).toFixed(1)
                    : '23.4')}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-lbl">Cải thiện</span>
              <span className="spec-val">{personalStats.improvementAreas?.[0] || 'Bụng'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-lbl">Mục tiêu</span>
              <span className="spec-val" style={{ color: '#0056c6', maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{personalStats.goal || 'Tăng cơ'}</span>
            </div>
          </div>

          {/* Message List Area */}
          <div className="chat-conversation-box">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-row-v2 ${msg.sender}`}>
                {msg.sender === 'aura' && (
                  <div className="chat-aura-avatar-v2">A</div>
                )}
                <div className="chat-bubble-content-v2">
                  {msg.sender === 'aura' ? (
                    <div className="chat-bubble-text-v2 aura-formatted">
                      {msg.text.split('\n').map((line, lineIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <div key={lineIdx} style={{ height: '6px' }} />;

                        // Parse **bold** within a line
                        const parseBold = (str) => {
                          const parts = str.split(/\*\*(.*?)\*\*/g);
                          return parts.map((part, i) =>
                            i % 2 === 1
                              ? <strong key={i} style={{ fontWeight: '800', color: '#0f172a' }}>{part}</strong>
                              : part
                          );
                        };

                        // Bullet point line
                        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                          const content = trimmed.replace(/^[-•]\s*/, '');
                          return (
                            <div key={lineIdx} style={{ display: 'flex', gap: '6px', marginBottom: '3px', alignItems: 'flex-start' }}>
                              <span style={{ color: '#0056c6', fontWeight: '900', flexShrink: 0, marginTop: '1px' }}>•</span>
                              <span style={{ lineHeight: '1.5' }}>{parseBold(content)}</span>
                            </div>
                          );
                        }

                        // Safe check for emoji-led section header
                        const firstChar = trimmed.codePointAt(0) || 0;
                        const isEmojiHeader = (firstChar >= 0x1f300 && firstChar <= 0x1f9ff) ||
                          (firstChar >= 0x2600 && firstChar <= 0x26ff) ||
                          (firstChar >= 0x2700 && firstChar <= 0x27bf) ||
                          (firstChar >= 0x1f600 && firstChar <= 0x1f64f);

                        if (isEmojiHeader) {
                          return (
                            <div key={lineIdx} style={{ fontWeight: '700', marginBottom: '4px', marginTop: lineIdx > 0 ? '8px' : '0', lineHeight: '1.5' }}>
                              {parseBold(trimmed)}
                            </div>
                          );
                        }

                        // Normal line
                        return (
                          <div key={lineIdx} style={{ marginBottom: '2px', lineHeight: '1.55' }}>
                            {parseBold(trimmed)}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="chat-bubble-text-v2">{msg.text}</span>
                  )}
                  <span className="chat-bubble-time-v2">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row-v2 aura">
                <div className="chat-aura-avatar-v2">A</div>
                <div className="chat-bubble-content-v2 typing">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Inputs */}
          <div className="chat-input-bar-v2">
            <input
              type="text"
              className="chat-text-input-v2"
              placeholder="Nhập tin nhắn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            />
            <button 
              className="chat-send-btn-v2" 
              disabled={!inputText.trim()}
              onClick={() => handleSendMessage(inputText)}
            >
              <Send size={14} color="#ffffff" />
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW 3: PERFORMANCE ANALYTICS ================= */}
      {coachView === 'performance' && (
        <div className="coach-performance-view fade-in">
          {/* Header */}
          <div className="figma-performance-header-v2">
            <button className="back-btn-icon" onClick={() => setCoachView('dashboard')}>
              <ArrowLeft size={18} />
            </button>
            <h3 className="performance-title-v2">Hiệu suất tập</h3>
            <div style={{ width: 28 }}></div>
          </div>

          {/* Navigation Tabs */}
          <div className="performance-tab-row">
            <button 
              className={`performance-tab-btn ${performanceTab === 'today' ? 'active' : ''}`}
              onClick={() => setPerformanceTab('today')}
            >
              Hôm nay
            </button>
            <button 
              className={`performance-tab-btn ${performanceTab === 'week' ? 'active' : ''}`}
              onClick={() => setPerformanceTab('week')}
            >
              Tuần này
            </button>
          </div>

          {/* Circular Score Gauge Card */}
          <div className="performance-circular-score-card card">
            <span className="gauge-label-top">HIỆU SUẤT TỔNG THỂ</span>
            
            {/* Circular Gauge */}
            <div className="circular-score-gauge-container">
              <svg width="120" height="120" viewBox="0 0 36 36" className="circular-gauge-svg">
                <path 
                  className="gauge-track"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="#F1F5F9" 
                  strokeWidth="2.8"
                />
                <path 
                  className="gauge-indicator"
                  strokeDasharray={performanceTab === 'today' ? "85, 100" : "92, 100"}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="#0056C6" 
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="gauge-center-text">
                <span className="gauge-score-num">{performanceTab === 'today' ? '85' : '92'}</span>
                <span className="gauge-score-max">Điểm / 100</span>
              </div>
            </div>

            <p className="gauge-assessment-text">
              Bạn đang làm rất tốt! Duy trì phong độ này nhé.
            </p>

            {/* Split Metrics Card */}
            <div className="gauge-metrics-row">
              <div className="metric-col-card">
                <div className="metric-title-block">
                  <Activity size={14} color="#10B981" />
                  <span>Phục hồi</span>
                </div>
                <span className="metric-score-large">{performanceTab === 'today' ? '65%' : '45%'}</span>
              </div>

              <div className="metric-col-card">
                <div className="metric-title-block">
                  <Heart size={14} color="#EF4444" />
                  <span>HRV</span>
                </div>
                <span className="metric-score-large">62 ms</span>
              </div>
            </div>

            {/* Footer Recovery Status Card */}
            <div className="recovery-readiness-footer-box">
              <span className="rec-lbl">Điểm phục hồi</span>
              <div className="rec-val-group">
                <span className="rec-status-tag">Sẵn sàng tập luyện</span>
                <span className="rec-val-percent">{performanceTab === 'today' ? '92%' : '86%'}</span>
              </div>
            </div>
          </div>

          {/* Section Heading: Năng lượng tiêu hao */}
          <div className="figma-dash-section-header" style={{ marginTop: 20 }}>
            <h3 className="figma-section-title-bold">Mức tiêu hao năng lượng</h3>
            <span className="figma-kcal-count" style={{ fontSize: 13, fontWeight: '800', color: '#0056C6' }}>
              {performanceTab === 'today' ? '465 kcal' : '4680 kcal'}
            </span>
          </div>

          {/* Weekly Kcal Chart */}
          <div className="figma-kcal-chart-card card">
            <div className="kcal-bar-chart">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => (
                <div key={idx} className="kcal-chart-col">
                  <div className="kcal-bar-track">
                    <div 
                      className={`kcal-bar-fill ${day === 'T7' ? 'active-blue' : ''}`}
                      style={{ height: day === 'T7' ? '85%' : '55%' }}
                    ></div>
                  </div>
                  <span className="kcal-chart-label">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

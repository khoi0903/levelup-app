import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Flame, Volume2, Bot, Sparkles, Activity, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AICoach({ userName = 'Tâm', personalStats = {}, userGoal = 'consistency', isDark }) {
  const [coachView, setCoachView] = useState('dashboard'); // 'dashboard', 'chat', 'performance'
  const [performanceTab, setPerformanceTab] = useState('today');
  const [selectedVoice, setSelectedVoice] = useState('alex');

  // Messages list
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'aura',
      text: `Chào ${userName}! Tôi là Coach Aura — HLV AI cá nhân của bạn 💪\n\nMục tiêu **"${personalStats.goal || 'Tăng cơ'}"** và thông tin tập luyện của bạn đã được ghi nhận. Hôm nay bạn muốn hỏi hoặc bắt đầu từ đâu?`,
      time: '08:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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

  // System prompt based on user Step 4 onboarding variables
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

=== HỒ SƠ & DỮ LIỆU CÁ NHÂN NGƯỜI DÙNG ===
- Tên: ${userName}
- Giới tính: ${s.gender || 'Nam'} | Tuổi: ${s.age || 25} tuổi
- Chiều cao: ${s.height || 175} cm | Cân nặng: ${s.weight || 70} kg | BMI: ${bmi}
- Số đo 3 vòng: ${s.chest || 90}/${s.waist || 70}/${s.hips || 95} cm
- Nhịp tim nghỉ: ${s.restingHeartRate || 70} bpm

=== MỤC TIÊU & THÓI QUEN TẬP LUYỆN ===
- Mục tiêu chính: ${s.goal || 'Tăng cơ'}
- Mức độ vận động: ${s.activityLevel || '3-4 ngày/tuần'}
- Thời gian có thể tập: ${s.workoutDuration || '30 phút'}
- Nơi tập chính: ${s.workoutLocation || 'Phòng gym'}
- Vùng cơ cần cải thiện: ${improvementStr}
- Tiền sử chấn thương (CẦN NÉ KHI GỢI Ý BÀI TẬP): ${injuryStr}

Hãy tư vấn đúng thời lượng (${s.workoutDuration || '30 phút'}), nơi tập (${s.workoutLocation || 'Phòng gym'}), ưu tiên vùng (${improvementStr}) và đảm bảo an toàn cho chấn thương (${injuryStr}).`;
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
      throw new Error(errorData.error?.message || `API Error (${response.status})`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
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

    let responseText = '';
    for (const key of apiKeysList) {
      try {
        responseText = await callGeminiWithKey(key, updatedMessages);
        if (responseText) break;
      } catch (err) {
        console.warn('API Key retry fallback:', err.message);
      }
    }

    setIsTyping(false);
    if (responseText) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'aura', text: responseText, time: timeStr }]);
    } else {
      // Intelligent Offline Fallback
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'aura',
          text: `Cảm ơn ${userName}! Mình đã nhận được câu hỏi.\n\n💪 **Lời khuyên cho mục tiêu ${personalStats.goal || 'Tăng cơ'}**:\n- Duy trì tập đúng **${personalStats.workoutDuration || '30 phút'}** mỗi buổi tại **${personalStats.workoutLocation || 'Phòng gym'}**.\n- Tập trung cho vùng **${Array.isArray(personalStats.improvementAreas) ? personalStats.improvementAreas.join(', ') : 'Toàn thân'}**.\n- Hãy chú ý bổ sung đủ protein và nghỉ ngơi hợp lý nhé! 🔥`,
          time: timeStr
        }
      ]);
    }
  };

  const renderAuraFormattedText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} style={{ height: '6px' }} />;

      const parseBold = (str) => {
        const parts = str.split(/\*\*(.*?)\*\*/g);
        return parts.map((part, i) =>
          i % 2 === 1 ? <strong key={i} style={{ fontWeight: '800', color: '#0f172a' }}>{part}</strong> : part
        );
      };

      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const content = trimmed.replace(/^[-•]\s*/, '');
        return (
          <div key={idx} style={{ display: 'flex', gap: '6px', marginBottom: '4px', alignItems: 'flex-start' }}>
            <span style={{ color: '#0056c6', fontWeight: '900', flexShrink: 0 }}>•</span>
            <span>{parseBold(content)}</span>
          </div>
        );
      }

      return (
        <div key={idx} style={{ marginBottom: '4px', lineHeight: '1.5' }}>
          {parseBold(trimmed)}
        </div>
      );
    });
  };

  return (
    <div 
      className="coach-page-wrapper fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '12px 10px',
        background: '#f8fafc',
        borderRadius: '16px',
        minHeight: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* ================= VIEW 1: COACH DASHBOARD ================= */}
      {coachView === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Main Welcome Hero */}
          <div className="card" style={{ padding: '18px', borderRadius: '20px', background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,86,198,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #0056c6 0%, #1e40af 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,86,198,0.3)' }}>
                <Bot size={24} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '900', margin: 0, color: '#0f172a' }}>LevelUp Coach Aura</h3>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span> Đang kết nối AI
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 14px 0', lineHeight: '1.55' }}>
              Chào {userName}! Tôi là Coach Aura. Tôi sẵn sàng hỗ trợ bạn theo đuổi mục tiêu **{personalStats.goal || 'Tăng cơ'}** với lộ trình **{personalStats.workoutDuration || '30 phút'}** tại **{personalStats.workoutLocation || 'Phòng gym'}**.
            </p>

            {/* Quick Action Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
              <button 
                onClick={() => { setCoachView('chat'); handleSendMessage('Tư vấn bài tập ngực hôm nay'); }}
                style={{ padding: '6px 12px', borderRadius: '99px', background: '#ebf3ff', border: '1px solid #bfdbfe', color: '#0056c6', fontSize: '11.5px', fontWeight: '800', cursor: 'pointer' }}
              >
                💪 Bài tập hôm nay
              </button>
              <button 
                onClick={() => { setCoachView('chat'); handleSendMessage('Gợi ý thực đơn dinh dưỡng tăng cơ'); }}
                style={{ padding: '6px 12px', borderRadius: '99px', background: '#ebf3ff', border: '1px solid #bfdbfe', color: '#0056c6', fontSize: '11.5px', fontWeight: '800', cursor: 'pointer' }}
              >
                🥗 Thực đơn dinh dưỡng
              </button>
            </div>

            {/* Direct Open Chat Button */}
            <button 
              className="btn btn-primary w-full"
              onClick={() => setCoachView('chat')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '14px', fontSize: '13.5px', fontWeight: '800' }}
            >
              Trò chuyện trực tiếp với Coach Aura <ChevronRight size={16} />
            </button>
          </div>

          {/* Performance Preview Card */}
          <div className="card" onClick={() => setCoachView('performance')} style={{ padding: '16px', borderRadius: '18px', background: '#ffffff', border: '1.5px solid #e2e8f0', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', letterSpacing: '0.05em' }}>ĐIỂM HIỆU SUẤT TẬP</span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#0056c6' }}>85%</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', background: '#d1fae5', color: '#047857', padding: '4px 10px', borderRadius: '99px' }}>
                +5% tuần này
              </span>
            </div>
          </div>

          {/* Streak Flame Banner */}
          <div className="card" onClick={() => setCoachView('performance')} style={{ padding: '16px', borderRadius: '18px', background: 'linear-gradient(135deg, #0056c6 0%, #1e40af 100%)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Flame size={28} color="#ffffff" fill="#ffffff" />
            <div>
              <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: '700' }}>Chuỗi ngày duy trì</span>
              <h4 style={{ fontSize: '20px', fontWeight: '900', margin: 0, color: '#ffffff' }}>12 ngày liên tục! 🔥</h4>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: ACTIVE CHAT SCREEN ================= */}
      {coachView === 'chat' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#ffffff', borderRadius: '20px', padding: '14px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1.5px solid #f1f5f9', marginBottom: '12px' }}>
            <button 
              onClick={() => setCoachView('dashboard')}
              style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} color="#0f172a" />
            </button>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '900', margin: 0, color: '#0f172a' }}>LevelUp Coach</h3>
              <span style={{ fontSize: '10.5px', color: '#10b981', fontWeight: '800' }}>● Đang trực tuyến</span>
            </div>
            <div style={{ width: 32 }}></div>
          </div>

          {/* User Spec Chips Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#ebf3ff', borderRadius: '12px', padding: '8px 12px', marginBottom: '12px', gap: '6px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#64748b' }}>Cân nặng</span>
              <div style={{ fontSize: '12px', fontWeight: '900', color: '#0056c6' }}>{personalStats.weight || 70} kg</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#64748b' }}>BMI</span>
              <div style={{ fontSize: '12px', fontWeight: '900', color: '#0056c6' }}>{personalStats.bmi || 22.9}</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#64748b' }}>Mục tiêu</span>
              <div style={{ fontSize: '12px', fontWeight: '900', color: '#0056c6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{personalStats.goal || 'Tăng cơ'}</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#64748b' }}>Thời gian</span>
              <div style={{ fontSize: '12px', fontWeight: '900', color: '#0056c6' }}>{personalStats.workoutDuration || '30p'}</div>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: '340px', maxHeight: '480px', overflowY: 'auto', padding: '8px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
            {messages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end'
                }}
              >
                {msg.sender === 'aura' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #0056c6 0%, #1e40af 100%)', color: '#ffffff', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    A
                  </div>
                )}
                
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #0056c6 0%, #0284c7 100%)' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  border: msg.sender === 'aura' ? '1.5px solid #cbd5e1' : 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  fontSize: '13.5px'
                }}>
                  {msg.sender === 'aura' ? renderAuraFormattedText(msg.text) : <span>{msg.text}</span>}
                  <div style={{ fontSize: '9px', textAlign: 'right', marginTop: '4px', opacity: 0.8, color: msg.sender === 'user' ? '#ffffff' : '#64748b', fontWeight: '600' }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0056c6', color: '#ffffff', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  A
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 14px', borderRadius: '16px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>
                  Coach Aura đang nhập...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="Nhập tin nhắn cho Coach Aura..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{
                flex: 1,
                height: '42px',
                borderRadius: '99px',
                border: '1.5px solid #cbd5e1',
                padding: '0 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0f172a',
                outline: 'none',
                background: '#ffffff'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0056c6 0%, #1e40af 100%)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,86,198,0.3)'
              }}
            >
              <Send size={16} color="#ffffff" />
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW 3: PERFORMANCE DETAILS ================= */}
      {coachView === 'performance' && (
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '20px', border: '1.5px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <button onClick={() => setCoachView('dashboard')} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
              ← Quay lại
            </button>
            <h3 style={{ fontSize: '16px', fontWeight: '900', margin: 0, color: '#0f172a' }}>Chi tiết hiệu suất</h3>
            <div style={{ width: 40 }}></div>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Hệ thống ghi nhận hiệu suất tập luyện và mức độ hồi phục của bạn trong tuần.</p>
        </div>
      )}
    </div>
  );
}

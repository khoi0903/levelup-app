import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

const coachAuraResponses = {
  default: "Tôi luôn sẵn sàng đồng hành cùng bạn. Hãy cho tôi biết cảm giác của bạn lúc này hoặc bạn muốn thay đổi điều gì trong buổi tập?",
  low_energy: "Tôi hiểu mà! Khi năng lượng thấp, bắt đầu nhỏ là chìa khóa. Tôi đề xuất bài tập **Full Body Flow (15 phút)** nhưng chúng ta sẽ tập với nhịp độ rất chậm rãi để thư giãn nhé. Bạn đã sẵn sàng chưa?",
  joint_pain: "Đau khớp cần được lưu ý! Hãy tạm dừng các bài tập nhảy hoặc tải trọng nặng. Hôm nay chúng ta nên tập trung giãn cơ động nhẹ nhàng hoặc tập trung vào phần cơ bụng không áp lực lên khớp nhé.",
  tightness: "Căng cơ là tín hiệu cơ thể cần phục hồi! Một vài động tác giãn cơ tĩnh (static stretches) kéo dài 30 giây mỗi động tác sẽ giúp giải tỏa áp lực. Thử xoay khớp vai và kéo giãn lưng trước nhé!",
  maybe_later: "Không sao cả! Lắng nghe cơ thể là điều quan trọng nhất. Khi nào bạn sẵn sàng, Aura luôn ở đây. Chúc bạn có một ngày nghỉ ngơi phục hồi thật tốt!"
};

export default function AICoach({ userGoal = 'consistency', isDark }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'aura',
      text: "Chào Alex! Tôi thấy mục tiêu chính của bạn là nâng cao tính kỷ luật tập luyện. Hôm nay là ngày thứ 5 liên tiếp của bạn rồi! Bạn thấy cơ thể thế nào hôm nay?",
      time: '08:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { id: 'low_energy', label: 'Năng lượng thấp 🥱' },
    { id: 'joint_pain', label: 'Đau mỏi khớp 🦴' },
    { id: 'tightness', label: 'Căng cứng cơ 💥' },
    { id: 'maybe_later', label: 'Để sau nhé ⏰' }
  ];

  useEffect(() => {
    // Scroll to bottom whenever messages or typing state changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text, type = 'custom') => {
    if (!text.trim()) return;

    // 1. Add User Message
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`;
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      time: timeStr
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // 2. Simulate AI Typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let auraText = coachAuraResponses.default;
      if (type !== 'custom' && coachAuraResponses[type]) {
        auraText = coachAuraResponses[type];
      } else {
        // Basic keyword matching for custom inputs
        const lowerText = text.toLowerCase();
        if (lowerText.includes('mệt') || lowerText.includes('oải') || lowerText.includes('năng lượng')) {
          auraText = coachAuraResponses.low_energy;
        } else if (lowerText.includes('đau') || lowerText.includes('khớp') || lowerText.includes('chấn thương')) {
          auraText = coachAuraResponses.joint_pain;
        } else if (lowerText.includes('căng') || lowerText.includes('cứng') || lowerText.includes('mỏi')) {
          auraText = coachAuraResponses.tightness;
        }
      }

      const auraMsg = {
        id: messages.length + 2,
        sender: 'aura',
        text: auraText,
        time: timeStr
      };
      setMessages((prev) => [...prev, auraMsg]);
    }, 1200);
  };

  return (
    <div className="coach-chat-page fade-in">
      {/* Coach Header bar */}
      <div className="coach-chat-header card">
        <div className="coach-profile-info">
          <div className="coach-avatar-wrapper">
            <div className="aura-avatar-glow"></div>
            <Sparkles size={20} className="aura-sparkle-icon" />
          </div>
          <div className="coach-status-details">
            <h3 className="coach-name">Coach Aura</h3>
            <div className="status-indicator-row">
              <span className="pulse-dot"></span>
              <span className="status-text">AI Trợ Lý Sức Khỏe • Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages dialogue window */}
      <div className="chat-messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
            {msg.sender === 'aura' && (
              <div className="chat-aura-avatar">A</div>
            )}
            <div className="chat-bubble-content">
              <div className="bubble-text">{msg.text}</div>
              <span className="bubble-time">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-row aura">
            <div className="chat-aura-avatar">A</div>
            <div className="chat-bubble-content typing">
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

      {/* Quick Replies Options */}
      {messages.length === 1 && !isTyping && (
        <div className="quick-replies-row">
          {quickReplies.map((reply) => (
            <button
              key={reply.id}
              className="quick-reply-btn"
              onClick={() => handleSendMessage(reply.label, reply.id)}
            >
              {reply.label}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Text Inputs */}
      <div className="chat-input-bar">
        <input
          type="text"
          className="chat-text-input"
          placeholder="Nhập tin nhắn hỏi Coach Aura..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
        />
        <button 
          className="chat-send-btn" 
          disabled={!inputText.trim()}
          onClick={() => handleSendMessage(inputText)}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

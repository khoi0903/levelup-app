import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';

const coachAuraResponses = {
  default: "Tôi luôn sẵn sàng đồng hành cùng bạn. Hãy cho tôi biết cảm giác của bạn lúc này hoặc bạn muốn thay đổi điều gì trong buổi tập?",
  low_energy: "Tôi hiểu mà! Khi năng lượng thấp, bắt đầu nhỏ là chìa khóa. Tôi đề xuất bài tập **Full Body Flow (15 phút)** nhưng chúng ta sẽ tập với nhịp độ rất chậm rãi để thư giãn nhé. Bạn đã sẵn sàng chưa?",
  joint_pain: "Đau khớp cần được lưu ý! Hãy tạm dừng các bài tập nhảy hoặc tải trọng nặng. Hôm nay chúng ta nên tập trung giãn cơ động nhẹ nhàng hoặc tập trung vào phần cơ bụng không áp lực lên khớp nhé.",
  tightness: "Căng cơ là tín hiệu cơ thể cần phục hồi! Một vài động tác giãn cơ tĩnh (static stretches) kéo dài 30 giây mỗi động tác sẽ giúp giải tỏa áp lực. Thử xoay khớp vai và kéo giãn lưng trước nhé!",
  maybe_later: "Không sao cả! Lắng nghe cơ thể là điều quan trọng nhất. Khi nào bạn sẵn sàng, Aura luôn ở đây. Chúc bạn có một ngày nghỉ ngơi phục hồi thật tốt!"
};

// Helper function to parse bold text **like this**
const parseBoldText = (text) => {
  if (!text) return '';
  const parts = [];
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;
  let lastIndex = 0;
  
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(<strong key={match.index} style={{ fontWeight: '750', color: 'var(--text-primary)' }}>{match[1]}</strong>);
    lastIndex = boldRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

// Custom Markdown parser for lists and line breaks
const renderFormattedText = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  return lines.map((line, index) => {
    // Check if line is a numbered list (e.g., "1. ", "2. ") or bullet point ("- ", "* ")
    const listMatch = line.match(/^(\d+\.\s+|-|\*\s+)(.*)/);
    
    if (listMatch) {
      const marker = listMatch[1];
      const content = listMatch[2];
      
      return (
        <div 
          key={index} 
          style={{ 
            display: 'flex', 
            margin: '4px 0', 
            paddingLeft: '6px',
            lineHeight: '1.45' 
          }}
        >
          <span 
            style={{ 
              fontWeight: '800', 
              marginRight: '6px', 
              color: 'var(--primary)',
              flexShrink: 0 
            }}
          >
            {marker}
          </span>
          <span>{parseBoldText(content)}</span>
        </div>
      );
    }
    
    // Default text line
    return (
      <div 
        key={index} 
        style={{ 
          minHeight: line.trim() === '' ? '10px' : 'auto', 
          margin: '3px 0',
          lineHeight: '1.45'
        }}
      >
        {parseBoldText(line)}
      </div>
    );
  });
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

  // Load Main API Key configured by Developer via Vite Env or LocalStorage
  const apiKey = (() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && envKey !== 'YOUR_GEMINI_API_KEY_HERE') return envKey;
    return localStorage.getItem('gemini_api_key') || '';
  })();

  // Load Backup API Key if configured
  const backupApiKey = (() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY_BACKUP;
    if (envKey && envKey !== 'YOUR_GEMINI_API_KEY_BACKUP_HERE') return envKey;
    return localStorage.getItem('gemini_api_key_backup') || '';
  })();

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

  const triggerSimulatedResponse = (text, type, timeStr) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let auraText = coachAuraResponses.default;
      if (type !== 'custom' && coachAuraResponses[type]) {
        auraText = coachAuraResponses[type];
      } else {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('mệt') || lowerText.includes('oải') || lowerText.includes('năng lượng')) {
          auraText = coachAuraResponses.low_energy;
        } else if (lowerText.includes('đau') || lowerText.includes('khớp') || lowerText.includes('chấn thương')) {
          auraText = coachAuraResponses.joint_pain;
        } else if (lowerText.includes('căng') || lowerText.includes('cứng') || lowerText.includes('mỏi')) {
          auraText = coachAuraResponses.tightness;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'aura',
          text: auraText,
          time: timeStr
        }
      ]);
    }, 1200);
  };

  const callGeminiWithKey = async (key, updatedMessages) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: updatedMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
          systemInstruction: {
            parts: [
              {
                text: `Bạn là Coach Aura, một huấn luyện viên sức khỏe và thể chất (fitness coach) thông minh, tận tâm và chuyên nghiệp của ứng dụng LevelUp.

Nhiệm vụ chính:
1. Đồng hành, tư vấn và thiết kế kế hoạch tập luyện, dinh dưỡng, nghỉ ngơi phù hợp cho người dùng.
2. Đưa ra lời khuyên khoa học, ngắn gọn, dễ hiểu và truyền cảm hứng/động lực tập luyện.

RÀNG BUỘC PHẠM VI (CỰC KỲ NGHIÊM NGẶT):
- Bạn CHỈ được phép trả lời, giải thích các chủ đề liên quan đến thể chất, bài tập luyện, thể hình, thể thao, yoga, giãn cơ, dinh dưỡng (chế độ ăn, thực đơn, thực phẩm bổ sung), sức khỏe, nước uống, giấc ngủ, lối sống lành mạnh và phục hồi cơ bắp.
- Nếu người dùng hỏi bất kỳ điều gì ngoài phạm vi này (ví dụ: lập trình máy tính, viết code, giải bài tập toán/lý/hóa, dịch thuật không liên quan, lịch sử, địa lý, chính trị, triết học, tin tức thời sự, viết thơ văn phi fitness, v.v.), bạn bắt buộc phải từ chối một cách lịch sự nhưng kiên quyết.
- Khi từ chối, hãy giải thích rõ vai trò của bạn và hướng người dùng quay lại chủ đề tập luyện. Ví dụ bằng tiếng Việt: "Tôi là Coach Aura - huấn luyện viên thể chất của bạn. Tôi chỉ có thể hỗ trợ bạn các vấn đề liên quan đến tập luyện, sức khỏe và dinh dưỡng. Hôm nay bạn muốn tập trung vào bài tập nào?" hoặc tương tự.
- Giữ câu trả lời ngắn gọn, súc tích (dưới 150 từ mỗi phản hồi) để phù hợp với giao diện chat trên điện thoại di động.`
              }
            ]
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Lỗi kết nối API (${response.status})`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  };

  const handleSendMessage = async (text, type = 'custom') => {
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

    if (apiKey) {
      try {
        const responseText = await callGeminiWithKey(apiKey, updatedMessages);
        setIsTyping(false);
        if (responseText) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'aura',
              text: responseText,
              time: timeStr
            }
          ]);
        } else {
          throw new Error('Không nhận được phản hồi từ AI.');
        }
      } catch (err) {
        console.warn('Gemini Main Key failed, trying backup key...', err);
        // Try backup key if available
        if (backupApiKey) {
          try {
            const responseText = await callGeminiWithKey(backupApiKey, updatedMessages);
            setIsTyping(false);
            if (responseText) {
              setMessages(prev => [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: 'aura',
                  text: responseText,
                  time: timeStr
                }
              ]);
              return;
            }
          } catch (backupErr) {
            console.error('Gemini Backup Key also failed:', backupErr);
          }
        }
        setIsTyping(false);
        // Fallback to simulated offline response to keep the user experience seamless
        triggerSimulatedResponse(text, type, timeStr);
      }
    } else {
      triggerSimulatedResponse(text, type, timeStr);
    }
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
              <div className="bubble-text">{renderFormattedText(msg.text)}</div>
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

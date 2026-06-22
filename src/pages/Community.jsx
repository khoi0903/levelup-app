import React, { useState } from 'react';
import { Users, Trophy, Flame, ChevronRight, MessageSquare, ThumbsUp, Send } from 'lucide-react';

export default function Community({ userName = 'Alex', userXp = 1680 }) {
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'squads'
  const [cheeredUsers, setCheeredUsers] = useState([]);
  const [joinedSquad, setJoinedSquad] = useState(true);

  const leaderboardData = [
    { rank: 1, name: 'Sarah L.', xp: 2200, isSelf: false, avatar: 'SL' },
    { rank: 2, name: `${userName} (Bạn)`, xp: userXp, isSelf: true, avatar: 'A' },
    { rank: 3, name: 'Toby M.', xp: 1850, isSelf: false, avatar: 'TM' },
    { rank: 4, name: 'Emma Watson', xp: 1520, isSelf: false, avatar: 'EW' }
  ];

  const squadsData = [
    {
      id: 'dorm4',
      name: 'Dorm 4 Fitness',
      members: 4,
      tag: 'Báo động kỷ luật',
      desc: 'Nhóm sinh hoạt phòng 4 giữ lửa tập sáng.',
      joined: joinedSquad
    },
    {
      id: 'cali_beast',
      name: 'Calisthenics Beasts',
      members: 142,
      tag: 'Street Workout',
      desc: 'Cộng đồng tập luyện xà đơn, xà kép chuyên nghiệp.',
      joined: false
    }
  ];

  const handleCheer = (name) => {
    if (cheeredUsers.includes(name)) return;
    setCheeredUsers((prev) => [...prev, name]);
    alert(`Bạn đã gửi biểu cảm cổ vũ động viên tới ${name}! 🎉`);
  };

  const handleToggleSquad = (squadId) => {
    if (squadId === 'dorm4') {
      setJoinedSquad(!joinedSquad);
    } else {
      alert('Chức năng tham gia nhóm cộng đồng mở rộng yêu cầu tài khoản Pro/Squad!');
    }
  };

  return (
    <div className="community-page fade-in">
      <div className="page-title-section">
        <h2 className="page-title">The Squad</h2>
        <p className="page-subtitle">Đồng hành cùng đồng đội để giữ vững kỷ luật.</p>
      </div>

      {/* Tabs */}
      <div className="community-tabs">
        <button
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Bảng Xếp Hạng
        </button>
        <button
          className={`tab-btn ${activeTab === 'squads' ? 'active' : ''}`}
          onClick={() => setActiveTab('squads')}
        >
          Nhóm Của Tôi
        </button>
      </div>

      {activeTab === 'leaderboard' ? (
        <div className="tab-content fade-in">
          {/* Active Challenge Card */}
          <div className="active-challenge-card card">
            <div className="challenge-top-row">
              <span className="challenge-badge">THỬ THÁCH TUẦN</span>
              <span className="days-left-text">Còn 4 ngày</span>
            </div>
            <h3 className="challenge-title">10k Steps Daily</h3>
            <p className="challenge-desc">Đi bộ tối thiểu 10,000 bước mỗi ngày.</p>
            
            <div className="challenge-progress-container">
              <div className="challenge-progress-details">
                <span className="prog-value">7.4k / 10k bước</span>
                <span className="prog-percent">74%</span>
              </div>
              <div className="challenge-progress-bar">
                <div className="challenge-progress-fill" style={{ width: '74%' }}></div>
              </div>
            </div>

            {/* Avatars row */}
            <div className="avatar-group-row">
              <div className="avatar-circles">
                <div className="circle-av">SL</div>
                <div className="circle-av secondary">TM</div>
                <div className="circle-av accent">A</div>
              </div>
              <span className="avatar-group-text">+3 người đang tham gia</span>
            </div>
          </div>

          {/* Weekly Leaderboard */}
          <div className="leaderboard-section">
            <h3 className="section-title-standard">Weekly Leaderboard</h3>
            <div className="leaderboard-list">
              {leaderboardData.map((user) => {
                const isCheered = cheeredUsers.includes(user.name);
                return (
                  <div key={user.name} className={`leaderboard-item card ${user.isSelf ? 'self-item' : ''}`}>
                    <div className="item-left-block">
                      <div className={`rank-badge rank-${user.rank}`}>{user.rank}</div>
                      <div className="user-initial-avatar">{user.avatar}</div>
                      <div className="user-info-block">
                        <span className="user-name-text">{user.name}</span>
                        <span className="user-xp-points">{user.xp} XP</span>
                      </div>
                    </div>
                    
                    {!user.isSelf && (
                      <button 
                        className={`cheer-action-btn ${isCheered ? 'cheered' : ''}`}
                        onClick={() => handleCheer(user.name)}
                        disabled={isCheered}
                        title="Cổ vũ bạn bè"
                      >
                        <ThumbsUp size={14} fill={isCheered ? 'currentColor' : 'none'} />
                        <span className="btn-txt">{isCheered ? 'Đã cổ vũ' : 'Cổ vũ'}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="tab-content fade-in">
          {/* Squads List */}
          <div className="squads-list-container">
            {squadsData.map((squad) => (
              <div key={squad.id} className="squad-card card">
                <div className="squad-card-header">
                  <div className="squad-title-block">
                    <h3 className="squad-name">{squad.name}</h3>
                    <span className="squad-tag-badge">{squad.tag}</span>
                  </div>
                  <span className="squad-members-count"><Users size={12} /> {squad.members} thành viên</span>
                </div>
                <p className="squad-description">{squad.desc}</p>
                <div className="squad-card-actions">
                  <button 
                    className={`btn ${squad.joined ? 'btn-outline' : 'btn-primary'} btn-sm-squad`}
                    onClick={() => handleToggleSquad(squad.id)}
                  >
                    {squad.joined ? 'Rời nhóm' : 'Tham gia'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

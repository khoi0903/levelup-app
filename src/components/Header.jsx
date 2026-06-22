import React from 'react';
import { Bell, Trophy, ShieldAlert } from 'lucide-react';

export default function Header({ xp = 1680, maxXp = 2000, level = 4, setActivePage, isDark }) {
  const xpPercentage = (xp / maxXp) * 100;

  return (
    <header className={`app-header ${isDark ? 'dark-theme' : ''}`}>
      <div className="header-left">
        <h1 className="logo-text" onClick={() => setActivePage('dashboard')}>LevelUp</h1>
      </div>
      
      <div className="header-right">
        {/* Level & XP bar */}
        <div className="xp-container" onClick={() => setActivePage('progress')}>
          <div className="level-badge">Lv.{level}</div>
          <div className="xp-track">
            <div className="xp-bar" style={{ width: `${xpPercentage}%` }}></div>
          </div>
          <span className="xp-text">{xp} XP</span>
        </div>

        {/* Action icons */}
        <button 
          className="header-action-btn" 
          onClick={() => setActivePage('pricing')}
          title="Subscription plans"
        >
          <Trophy size={18} className="trophy-gold" />
        </button>

        <button className="header-action-btn" onClick={() => alert('Chưa có thông báo mới!')}>
          <div className="notification-dot"></div>
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

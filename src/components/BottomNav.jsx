import React from 'react';
import { Home, Dumbbell, MessageSquare, Users, User } from 'lucide-react';

export default function BottomNav({ activePage, setActivePage, isDark }) {
  const navItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'workouts', label: 'Luyện tập', icon: Dumbbell },
    { id: 'coach', label: 'AI Coach', icon: MessageSquare },
    { id: 'community', label: 'Cộng đồng', icon: Users },
    { id: 'profile', label: 'Cá nhân', icon: User },
  ];

  return (
    <nav className={`bottom-nav ${isDark ? 'dark-theme' : ''}`}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
            aria-label={item.label}
          >
            <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

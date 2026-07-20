import React from 'react';
import { Home, Dumbbell, Bot, Users, User } from 'lucide-react';

export default function BottomNav({ activePage, setActivePage, isDark }) {
  // Swapped order according to Figma: Home, AI Coach (Bot), Workouts (Capsule), Community, Profile
  const navItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home, isCenter: false },
    { id: 'coach', label: 'AI Coach', icon: Bot, isCenter: false },
    { id: 'workouts', label: 'Luyện tập', icon: Dumbbell, isCenter: true }, // Workouts is the center capsule item
    { id: 'community', label: 'Cộng đồng', icon: Users, isCenter: false },
    { id: 'profile', label: 'Cá nhân', icon: User, isCenter: false },
  ];

  return (
    <nav className={`bottom-nav ${isDark ? 'dark-theme' : ''}`}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activePage === item.id;
        
        return (
          <button
            key={item.id}
            className={`nav-item-figma ${isActive ? 'active' : ''} ${item.isCenter ? 'center-capsule-item' : ''}`}
            onClick={() => setActivePage(item.id)}
            aria-label={item.label}
          >
            <div className="icon-wrapper-figma">
              <IconComponent 
                size={item.isCenter ? 20 : 22} 
                strokeWidth={isActive ? 2.5 : 2} 
                style={item.isCenter ? { transform: 'rotate(-45deg)' } : {}}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}

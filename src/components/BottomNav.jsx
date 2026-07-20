import { Home, Dumbbell, Bot, Utensils, Users, User } from 'lucide-react';

export default function BottomNav({ activePage, setActivePage, isDark }) {
  const navItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'coach', label: 'AI Coach', icon: Bot },
    { id: 'workouts', label: 'Luyện tập', icon: Dumbbell },
    { id: 'nutrition', label: 'Dinh dưỡng', icon: Utensils },
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
            className={`nav-item-figma ${isActive ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
            aria-label={item.label}
          >
            <div className="icon-wrapper-figma">
              <IconComponent 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}

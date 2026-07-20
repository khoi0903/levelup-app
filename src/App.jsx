import React, { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import Pricing from './pages/Pricing';
import HealthSync from './pages/HealthSync';
import ScheduleSetup from './pages/ScheduleSetup';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import AICoach from './pages/AICoach';
import Community from './pages/Community';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

export default function App() {
  // Global States
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userGoal, setUserGoal] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('free');
  const [activePage, setActivePage] = useState('welcome'); // welcome, login, onboarding, pricing, dashboard, etc.
  
  // App settings & profile
  const [userName, setUserName] = useState('Tâm');
  const [isDark, setIsDark] = useState(false);
  const [reminderTime, setReminderTime] = useState('06:00');
  const [coachVoice, setCoachVoice] = useState('empathetic');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  
  // Fitness Stats
  const [xp, setXp] = useState(1680);
  const [level, setLevel] = useState(4);
  const [activeStreak, setActiveStreak] = useState(5);
  const [checkInHistory, setCheckInHistory] = useState([2, 3, 5, 8, 12, 13, 14, 15, 18, 19, 21]);

  // Action handlers
  const handleOnboardingComplete = (goal) => {
    setUserGoal(goal);
    setActivePage('pricing');
  };

  const handlePricingSelect = (plan) => {
    setCurrentPlan(plan);
    if (isOnboarded) {
      setActivePage('profile');
    } else {
      setActivePage('health_sync');
    }
  };

  const handleScheduleComplete = ({ reminderTime, coachVoice }) => {
    if (reminderTime) setReminderTime(reminderTime);
    if (coachVoice) setCoachVoice(coachVoice);
    setIsOnboarded(true);
    setActivePage('dashboard');
  };

  const handleWorkoutComplete = (gainedXp) => {
    // Add XP and level up if needed
    const newXp = xp + gainedXp;
    const maxXp = 2000;
    if (newXp >= maxXp) {
      setXp(newXp - maxXp);
      setLevel(level + 1);
      alert(`Chúc mừng! Bạn đã thăng cấp lên Level ${level + 1}! 🎉`);
    } else {
      setXp(newXp);
    }

    // Add today to check-in grid dynamically
    const todayNum = new Date().getDate();
    if (!checkInHistory.includes(todayNum)) {
      setCheckInHistory((prev) => [...prev, todayNum]);
      setActiveStreak((prev) => prev + 1);
    }
  };

  const handleToggleCheckIn = (day) => {
    const todayNum = new Date().getDate();
    if (checkInHistory.includes(day)) {
      setCheckInHistory((prev) => prev.filter((d) => d !== day));
      // adjust streak if today is deselected
      if (day === todayNum) setActiveStreak((prev) => Math.max(0, prev - 1));
    } else {
      setCheckInHistory((prev) => [...prev, day]);
      // adjust streak if today is selected
      if (day === todayNum) setActiveStreak((prev) => prev + 1);
    }
  };

  const handleUpdateSettings = (key, value) => {
    if (key === 'userName') setUserName(value);
    else if (key === 'isDark') setIsDark(value);
    else if (key === 'reminderTime') setReminderTime(value);
    else if (key === 'coachVoice') setCoachVoice(value);
    else if (key === 'notificationsEnabled') setNotificationsEnabled(value);
    else if (key === 'soundsEnabled') setSoundsEnabled(value);
    else if (key === 'userGoal') setUserGoal(value);
  };

  const handleResetOnboarding = () => {
    if (window.confirm('Bạn có muốn thiết lập lại mục tiêu và đăng ký không?')) {
      setIsOnboarded(false);
      setUserGoal(null);
      setCurrentPlan('free');
      setActivePage('welcome');
      setCheckInHistory([2, 3, 5, 8, 12, 13, 14, 15, 18, 19, 21]);
      setActiveStreak(5);
      setXp(1680);
      setLevel(4);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?')) {
      setIsOnboarded(false);
      setActivePage('welcome');
    }
  };

  // Render components based on state
  const renderPage = () => {
    switch (activePage) {
      case 'welcome':
        return (
          <Welcome
            onSignUpEmail={() => setActivePage('register')}
            onNavigateToLogin={() => setActivePage('login')}
          />
        );
      case 'register':
        return (
          <Register
            onRegisterSuccess={() => setActivePage('onboarding')}
            onNavigateToLogin={() => setActivePage('login')}
            onBack={() => setActivePage('welcome')}
          />
        );
      case 'login':
        return (
          <Login
            onLoginSuccess={() => {
              setIsOnboarded(true);
              setActivePage('dashboard');
            }}
            onNavigateToSignUp={() => setActivePage('register')}
            onBack={() => setActivePage('welcome')}
          />
        );
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} onBack={() => setActivePage('register')} />;
      case 'pricing':
        return (
          <Pricing
            onSelectPlan={handlePricingSelect}
            currentPlan={currentPlan}
            fromProfile={isOnboarded}
            onBack={isOnboarded ? () => setActivePage('profile') : () => setActivePage('onboarding')}
          />
        );
      case 'health_sync':
        return (
          <HealthSync
            onNext={() => setActivePage('schedule_setup')}
            onSkip={() => setActivePage('schedule_setup')}
            onBack={() => setActivePage('pricing')}
          />
        );
      case 'schedule_setup':
        return (
          <ScheduleSetup
            onComplete={handleScheduleComplete}
            onBack={() => setActivePage('health_sync')}
            initialTime={reminderTime}
            initialVoice={coachVoice}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userName={userName}
            activeStreak={activeStreak}
            onStartWorkout={() => setActivePage('workouts')}
            setActivePage={setActivePage}
          />
        );
      case 'workouts':
        return <Workouts onWorkoutComplete={handleWorkoutComplete} />;
      case 'coach':
        return <AICoach userName={userName} userGoal={userGoal} isDark={isDark} />;
      case 'community':
        return <Community userName={userName} userXp={xp} />;
      case 'progress':
        return (
          <Progress
            xp={xp}
            maxXp={2000}
            level={level}
            activeStreak={activeStreak}
            checkInHistory={checkInHistory}
            onToggleCheckIn={handleToggleCheckIn}
          />
        );
      case 'profile':
        return (
          <Profile
            userName={userName}
            userGoal={userGoal}
            reminderTime={reminderTime}
            coachVoice={coachVoice}
            currentPlan={currentPlan}
            isDark={isDark}
            notificationsEnabled={notificationsEnabled}
            soundsEnabled={soundsEnabled}
            onUpdateSettings={handleUpdateSettings}
            onResetOnboarding={handleResetOnboarding}
            onLogout={handleLogout}
            setActivePage={setActivePage}
            xp={xp}
            level={level}
          />
        );
      default:
        return (
          <Dashboard
            userName={userName}
            activeStreak={activeStreak}
            onStartWorkout={() => setActivePage('workouts')}
            setActivePage={setActivePage}
          />
        );
    }
  };

  const isAuthOrOnboarding = ['welcome', 'login', 'register', 'onboarding', 'pricing', 'health_sync', 'schedule_setup'].includes(activePage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Quick Demo Page Switcher Bar */}
      <div className="quick-demo-switcher">
        <span className="demo-label">Chuyển nhanh màn hình Figma:</span>
        <button className={`demo-chip ${activePage === 'welcome' ? 'active' : ''}`} onClick={() => setActivePage('welcome')}>1. Welcome</button>
        <button className={`demo-chip ${activePage === 'register' ? 'active' : ''}`} onClick={() => setActivePage('register')}>2. Đăng ký</button>
        <button className={`demo-chip ${activePage === 'login' ? 'active' : ''}`} onClick={() => setActivePage('login')}>3. Đăng nhập</button>
        <button className={`demo-chip ${activePage === 'onboarding' ? 'active' : ''}`} onClick={() => setActivePage('onboarding')}>4. Mục tiêu (1/4)</button>
        <button className={`demo-chip ${activePage === 'pricing' ? 'active' : ''}`} onClick={() => setActivePage('pricing')}>5. Gói dịch vụ (2/4)</button>
        <button className={`demo-chip ${activePage === 'health_sync' ? 'active' : ''}`} onClick={() => setActivePage('health_sync')}>6. Sức khỏe (3/4)</button>
        <button className={`demo-chip ${activePage === 'schedule_setup' ? 'active' : ''}`} onClick={() => setActivePage('schedule_setup')}>7. Lịch tập (4/4)</button>
        <button className={`demo-chip ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => { setIsOnboarded(true); setActivePage('dashboard'); }}>8. Dashboard</button>
      </div>

      <MobileFrame isDark={isDark}>
        <main className="app-content">
          {renderPage()}
        </main>

        {!isAuthOrOnboarding && (
          <BottomNav
            activePage={activePage}
            setActivePage={setActivePage}
            isDark={isDark}
          />
        )}
      </MobileFrame>
    </div>
  );
}

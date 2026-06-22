import React, { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import AICoach from './pages/AICoach';
import Community from './pages/Community';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import './App.css';

export default function App() {
  // Global States
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userGoal, setUserGoal] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('free');
  const [activePage, setActivePage] = useState('onboarding'); // onboarding, pricing, dashboard, etc.
  
  // App settings & profile
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
    if (key === 'isDark') setIsDark(value);
    else if (key === 'reminderTime') setReminderTime(value);
    else if (key === 'coachVoice') setCoachVoice(value);
    else if (key === 'notificationsEnabled') setNotificationsEnabled(value);
    else if (key === 'soundsEnabled') setSoundsEnabled(value);
  };

  const handleResetOnboarding = () => {
    if (window.confirm('Bạn có muốn thiết lập lại mục tiêu và đăng ký không?')) {
      setIsOnboarded(false);
      setUserGoal(null);
      setCurrentPlan('free');
      setActivePage('onboarding');
      setCheckInHistory([2, 3, 5, 8, 12, 13, 14, 15, 18, 19, 21]);
      setActiveStreak(5);
      setXp(1680);
      setLevel(4);
    }
  };

  // Render components based on state
  const renderPage = () => {
    switch (activePage) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'pricing':
        return (
          <Pricing
            onSelectPlan={handlePricingSelect}
            currentPlan={currentPlan}
            fromProfile={isOnboarded}
            onBack={isOnboarded ? () => setActivePage('profile') : () => setActivePage('onboarding')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userName="Alex"
            activeStreak={activeStreak}
            onStartWorkout={() => setActivePage('workouts')}
            setActivePage={setActivePage}
          />
        );
      case 'workouts':
        return <Workouts onWorkoutComplete={handleWorkoutComplete} />;
      case 'coach':
        return <AICoach userGoal={userGoal} isDark={isDark} />;
      case 'community':
        return <Community userName="Alex" userXp={xp} />;
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
            userName="Alex"
            userGoal={userGoal}
            reminderTime={reminderTime}
            coachVoice={coachVoice}
            currentPlan={currentPlan}
            isDark={isDark}
            notificationsEnabled={notificationsEnabled}
            soundsEnabled={soundsEnabled}
            onUpdateSettings={handleUpdateSettings}
            onResetOnboarding={handleResetOnboarding}
            setActivePage={setActivePage}
            xp={xp}
            level={level}
          />
        );
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  const showHeader = isOnboarded && activePage !== 'pricing';
  const showBottomNav = isOnboarded;

  return (
    <MobileFrame isDark={isDark}>
      {showHeader && (
        <Header
          xp={xp}
          maxXp={2000}
          level={level}
          setActivePage={setActivePage}
          isDark={isDark}
        />
      )}
      
      <div className="app-content">
        {renderPage()}
      </div>

      {showBottomNav && (
        <BottomNav
          activePage={activePage === 'progress' || activePage === 'pricing' ? 'profile' : activePage}
          setActivePage={setActivePage}
          isDark={isDark}
        />
      )}
    </MobileFrame>
  );
}

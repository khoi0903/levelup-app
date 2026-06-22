import React, { useState } from 'react';
import { CalendarRange, Zap, Dumbbell, Heart } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    {
      id: 'consistency',
      title: 'Build Consistency',
      description: 'Stick to a schedule & form a habit',
      icon: CalendarRange,
      color: 'blue'
    },
    {
      id: 'energy',
      title: 'Boost Energy',
      description: 'Feel more active throughout the day',
      icon: Zap,
      color: 'orange'
    },
    {
      id: 'strength',
      title: 'Gain Strength',
      description: 'Build muscle & physical endurance',
      icon: Dumbbell,
      color: 'purple'
    },
    {
      id: 'better_feel',
      title: 'Feel Better',
      description: 'Improve sleep quality & mental health',
      icon: Heart,
      color: 'green'
    }
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      onComplete(selectedGoal);
    }
  };

  return (
    <div className="onboarding-screen fade-in">
      <div className="onboarding-progress">
        <div className="progress-step-text">STEP 1 OF 2</div>
        <div className="progress-track-full">
          <div className="progress-bar-fill" style={{ width: '50%' }}></div>
        </div>
      </div>

      <div className="onboarding-intro">
        <h2 className="onboarding-title">What's your main fitness goal?</h2>
        <p className="onboarding-subtitle">
          We tailor your AI coach & workouts to support you where it matters most.
        </p>
      </div>

      <div className="goals-list">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoal === goal.id;
          return (
            <div
              key={goal.id}
              className={`goal-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <div className={`goal-icon-wrapper ${goal.color}`}>
                <Icon size={24} />
              </div>
              <div className="goal-info">
                <div className="goal-title">{goal.title}</div>
                <div className="goal-desc">{goal.description}</div>
              </div>
              <div className="goal-selector">
                <div className="selector-circle"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="onboarding-actions">
        <button
          className="btn btn-primary"
          disabled={!selectedGoal}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

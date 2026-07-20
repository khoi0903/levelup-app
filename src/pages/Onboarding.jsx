import React, { useState } from 'react';
import { Calendar, Zap, Maximize2, Activity, ArrowLeft } from 'lucide-react';

export default function Onboarding({ onComplete, onBack }) {
  const [selectedGoal, setSelectedGoal] = useState('consistency');

  const goals = [
    {
      id: 'consistency',
      title: 'Xây dựng kỷ luật',
      icon: Calendar,
    },
    {
      id: 'energy',
      title: 'Tăng cường năng lượng',
      icon: Zap,
    },
    {
      id: 'strength',
      title: 'Cải thiện sức mạnh',
      icon: Maximize2,
    },
    {
      id: 'better_feel',
      title: 'Sức khỏe và Tinh thần',
      icon: Activity,
    }
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      onComplete(selectedGoal);
    }
  };

  return (
    <div className="onboarding-screen fade-in">
      {/* Step Header Navigation */}
      <div className="onboarding-header-nav-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="step-indicator-text">BƯỚC 1/2</span>
        <div style={{ width: 28 }}></div>
      </div>

      <div className="onboarding-intro">
        <h2 className="onboarding-title">Mục tiêu chính của bạn là gì?</h2>
        <p className="onboarding-subtitle">
          Chúng tôi sẽ cá nhân hóa AI Coach & các bài tập phù hợp nhất với bạn.
        </p>
      </div>

      <div className="goals-list-figma">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selectedGoal === goal.id;
          return (
            <div
              key={goal.id}
              className={`goal-figma-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <div className="goal-figma-icon-wrapper">
                <Icon size={22} color="#0056C6" />
              </div>
              <span className="goal-figma-title">{goal.title}</span>
            </div>
          );
        })}
      </div>

      <div className="onboarding-actions-static">
        <button
          className="btn btn-primary w-full"
          disabled={!selectedGoal}
          onClick={handleContinue}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

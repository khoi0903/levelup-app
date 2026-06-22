import React, { useState } from 'react';
import { CalendarRange, Zap, Dumbbell, Heart } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    {
      id: 'consistency',
      title: 'Xây dựng sự Kỷ luật',
      description: 'Bám sát lịch trình & duy trì thói quen tập luyện',
      icon: CalendarRange,
      color: 'blue'
    },
    {
      id: 'energy',
      title: 'Tăng cường Năng lượng',
      description: 'Cảm thấy năng động và tràn đầy sức sống hơn',
      icon: Zap,
      color: 'orange'
    },
    {
      id: 'strength',
      title: 'Cải thiện Sức mạnh',
      description: 'Phát triển cơ bắp & tăng cường sức chịu đựng',
      icon: Dumbbell,
      color: 'purple'
    },
    {
      id: 'better_feel',
      title: 'Sức khỏe & Tinh thần',
      description: 'Cải thiện giấc ngủ, giảm căng thẳng & mệt mỏi',
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
        <div className="progress-step-text">BƯỚC 1 / 2</div>
        <div className="progress-track-full">
          <div className="progress-bar-fill" style={{ width: '50%' }}></div>
        </div>
      </div>

      <div className="onboarding-intro">
        <h2 className="onboarding-title">Mục tiêu chính của bạn là gì?</h2>
        <p className="onboarding-subtitle">
          Chúng tôi sẽ cá nhân hóa AI Coach & các bài tập phù hợp nhất với bạn.
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
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

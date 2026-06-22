import React, { useState, useEffect } from 'react';
import { Play, Dumbbell, Clock, Flame, Award, ChevronRight, CheckCircle2, RotateCcw, AlertCircle, X } from 'lucide-react';

const exercisesData = [
  {
    id: 1,
    name: 'Cat-Cow Stretch',
    type: 'Giãn cơ',
    duration: 60, // in seconds
    isRepBased: false,
    reps: 0,
    desc: 'Hít vào võng lưng (Cow), thở ra gù lưng (Cat) chậm rãi.',
    xp: 30
  },
  {
    id: 2,
    name: 'Bird Dog',
    type: 'Cơ bụng',
    duration: 45,
    isRepBased: true,
    reps: 8, // reps each side
    desc: 'Duỗi thẳng tay phải và chân trái, đổi bên nhịp nhàng.',
    xp: 40
  },
  {
    id: 3,
    name: 'Plank Hold',
    type: 'Cơ bụng',
    duration: 30,
    isRepBased: false,
    reps: 0,
    desc: 'Giữ thẳng lưng, siết chặt cơ bụng và thở đều.',
    xp: 40
  },
  {
    id: 4,
    name: 'Bodyweight Squats',
    type: 'Thân dưới',
    duration: 45,
    isRepBased: true,
    reps: 12,
    desc: 'Hạ hông xuống song song sàn, đẩy thẳng người lên.',
    xp: 40
  }
];

export default function Workouts({ onWorkoutComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [workoutFinished, setWorkoutFinished] = useState(false);

  const currentExercise = exercisesData[currentExerciseIndex];

  // Initialize timer for duration-based exercises
  useEffect(() => {
    if (isPlaying && currentExercise && !currentExercise.isRepBased) {
      setTimeLeft(currentExercise.duration);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [currentExerciseIndex, isPlaying]);

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleExerciseDone();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleStartWorkout = () => {
    setIsPlaying(true);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setWorkoutFinished(false);
  };

  const handleExerciseDone = () => {
    const isLast = currentExerciseIndex === exercisesData.length - 1;
    setCompletedExercises((prev) => [...prev, currentExercise.id]);
    
    if (isLast) {
      setTimerActive(false);
      setWorkoutFinished(true);
      onWorkoutComplete(150); // Give +150 XP
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    const isLast = currentExerciseIndex === exercisesData.length - 1;
    if (isLast) {
      setWorkoutFinished(true);
      onWorkoutComplete(100); // reduced XP for skipping
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const handleQuit = () => {
    if (window.confirm('Bạn có muốn dừng buổi tập này?')) {
      setIsPlaying(false);
      setTimerActive(false);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setWorkoutFinished(false);
    setCurrentExerciseIndex(0);
  };

  // 1. Workout Player View
  if (isPlaying) {
    if (workoutFinished) {
      return (
        <div className="workout-player-container finished fade-in">
          <div className="finish-celebration">
            <div className="trophy-circle">
              <Award size={48} className="trophy-pulse" />
            </div>
            <h2 className="celebration-title">Buổi Tập Hoàn Thành!</h2>
            <p className="celebration-sub">Bạn đã hoàn thành bài tập **Full Body Flow**</p>
            
            <div className="xp-gain-badge">
              <Flame size={20} fill="currentColor" />
              <span>+150 XP đã cộng vào hành trình</span>
            </div>

            <div className="workout-summary-box">
              <div className="summary-item">
                <span className="sum-val">4/4</span>
                <span className="sum-lbl">Động tác</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-item">
                <span className="sum-val">15m</span>
                <span className="sum-lbl">Thời gian</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleRestart}>
              Quay lại danh sách
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="workout-player-container active-workout fade-in">
        {/* Header Controls */}
        <div className="player-top-bar">
          <span className="player-workout-name">Full Body Flow</span>
          <button className="quit-btn" onClick={handleQuit} aria-label="Quit workout">
            <X size={20} />
          </button>
        </div>

        {/* Exercise Progress dots */}
        <div className="player-progress-dots">
          {exercisesData.map((ex, idx) => (
            <div 
              key={ex.id} 
              className={`prog-dot ${idx === currentExerciseIndex ? 'active' : ''} ${completedExercises.includes(ex.id) ? 'completed' : ''}`}
            ></div>
          ))}
        </div>

        {/* Exercise Demonstration panel */}
        <div className="exercise-demo-panel">
          <div className="exercise-media-placeholder">
            <Dumbbell className="floating-dumbbell-icon" size={48} />
          </div>
          <span className="exercise-type-tag">{currentExercise.type}</span>
          <h2 className="player-exercise-title">{currentExercise.name}</h2>
          <p className="player-exercise-desc">{currentExercise.desc}</p>
        </div>

        {/* Timer or Reps Display */}
        <div className="player-action-center">
          {currentExercise.isRepBased ? (
            <div className="reps-display">
              <span className="reps-number">{currentExercise.reps}</span>
              <span className="reps-label">lần lặp</span>
            </div>
          ) : (
            <div className="timer-display">
              <span className="timer-number">{timeLeft}</span>
              <span className="timer-label">giây còn lại</span>
            </div>
          )}
        </div>

        {/* Controls Row */}
        <div className="player-controls-row">
          <button className="btn btn-secondary player-skip-btn" onClick={handleSkip}>
            Bỏ qua
          </button>
          
          <button className="btn btn-primary player-done-btn" onClick={handleExerciseDone}>
            {currentExerciseIndex === exercisesData.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
          </button>
        </div>
      </div>
    );
  }

  // 2. Standard Workout List View
  return (
    <div className="workout-page fade-in">
      <div className="page-title-section">
        <h2 className="page-title">Kế hoạch tập luyện</h2>
        <p className="page-subtitle">Thực hiện các động tác hôm nay để nhận XP habit.</p>
      </div>

      {/* Feature Recommendation Banner */}
      <div className="workout-hero-banner">
        <div className="banner-details">
          <span className="banner-tag">ĐƯỢC ĐỀ XUẤT</span>
          <h3 className="banner-title">Full Body Flow</h3>
          <p className="banner-desc">Bài tập phục hồi & giãn cơ toàn thân nhẹ nhàng.</p>
          <div className="banner-stats">
            <span className="b-stat"><Clock size={12} /> 15 phút</span>
            <span className="b-stat"><Flame size={12} fill="currentColor" /> Nhẹ nhàng</span>
          </div>
        </div>
        <div className="banner-visual-mesh"></div>
      </div>

      {/* Exercises Title list */}
      <div className="exercise-list-section">
        <h3 className="exercise-section-header">Danh sách động tác ({exercisesData.length})</h3>
        
        <div className="exercises-list-container">
          {exercisesData.map((exercise) => (
            <div key={exercise.id} className="exercise-list-item card">
              <div className="ex-item-left">
                <div className="ex-num-badge">{exercise.id}</div>
                <div className="ex-details">
                  <h4 className="ex-title">{exercise.name}</h4>
                  <p className="ex-info">
                    {exercise.type} • {exercise.isRepBased ? `${exercise.reps} lần` : `${exercise.duration} giây`}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Big Start button */}
      <div className="workout-page-actions">
        <button className="btn btn-primary btn-start-workout" onClick={handleStartWorkout}>
          <Play size={16} fill="currentColor" />
          <span>Bắt đầu buổi tập</span>
        </button>
      </div>
    </div>
  );
}

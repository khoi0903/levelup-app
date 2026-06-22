import React, { useState, useEffect } from 'react';
import { 
  Search, Play, Clock, Flame, Award, ChevronRight, X, 
  Dumbbell, CheckCircle2, Heart, Zap, PlayCircle 
} from 'lucide-react';

const workoutsData = [
  {
    id: 'hiit_fat_burn',
    name: 'Đốt cháy mỡ thừa 20 phút',
    type: 'HIIT',
    duration: '20 phút',
    difficulty: 'Trung bình',
    category: 'HIIT',
    instructor: 'HLV. Anh Tuấn',
    xp: 200,
    featured: true,
    exercises: [
      { id: 101, name: 'High Knees', type: 'HIIT', duration: 45, isRepBased: false, reps: 0, desc: 'Chạy nâng cao đùi tại chỗ, cố gắng nâng đùi song song với sàn.', xp: 50 },
      { id: 102, name: 'Jumping Jacks', type: 'HIIT', duration: 45, isRepBased: false, reps: 0, desc: 'Bật nhảy dạng tay chân liên tục, thở đều theo nhịp.', xp: 50 },
      { id: 103, name: 'Mountain Climbers', type: 'HIIT', duration: 45, isRepBased: false, reps: 0, desc: 'Tư thế plank chống tay, luân phiên co gối áp sát ngực nhanh.', xp: 100 }
    ]
  },
  {
    id: 'yoga_morning',
    name: 'Yoga buổi sáng: Năng lượng mới',
    type: 'Yoga',
    duration: '20 phút',
    difficulty: 'Nhẹ nhàng',
    category: 'Yoga',
    instructor: 'HLV. Mai Linh',
    xp: 120,
    progress: 63, // 12:45 / 20:00
    exercises: [
      { id: 201, name: 'Child Pose', type: 'Yoga', duration: 60, isRepBased: false, reps: 0, desc: 'Tư thế em bé, ngồi lên gót chân, duỗi thẳng tay về phía trước, thả lỏng trán chạm sàn.', xp: 40 },
      { id: 202, name: 'Cobra Stretch', type: 'Yoga', duration: 45, isRepBased: false, reps: 0, desc: 'Tư thế rắn hổ mang, nằm sấp, chống tay nâng ngực lên cao, ưỡn nhẹ cổ.', xp: 40 },
      { id: 203, name: 'Downward Dog', type: 'Yoga', duration: 60, isRepBased: false, reps: 0, desc: 'Tư thế chữ V ngược, đẩy hông lên cao, duỗi thẳng lưng và vai.', xp: 40 }
    ]
  },
  {
    id: 'upper_body',
    name: 'Sức mạnh thân trên',
    type: 'Sức mạnh',
    duration: '15 phút',
    difficulty: 'Trung bình',
    category: 'Sức mạnh',
    instructor: 'HLV. Anh Tuấn',
    xp: 150,
    progress: 33, // 5:00 / 15:00
    exercises: [
      { id: 301, name: 'Push-ups', type: 'Sức mạnh', duration: 45, isRepBased: true, reps: 10, desc: 'Chống đẩy thẳng lưng, hạ ngực sát sàn rồi đẩy người lên.', xp: 50 },
      { id: 302, name: 'Arm Circles', type: 'Sức mạnh', duration: 45, isRepBased: false, reps: 0, desc: 'Dang rộng hai tay sang ngang và xoay tròn nhẹ nhàng để kích hoạt khớp vai.', xp: 50 },
      { id: 303, name: 'Plank Shoulder Taps', type: 'Sức mạnh', duration: 45, isRepBased: true, reps: 16, desc: 'Tư thế plank cao, luân phiên đưa tay chạm vai đối diện và giữ hông cố định.', xp: 50 }
    ]
  },
  {
    id: 'core_crusher',
    name: 'Tăng cường cơ bụng 6 múi',
    type: 'Cơ bụng',
    duration: '15 phút',
    difficulty: 'Trung bình',
    category: 'Sức mạnh',
    instructor: 'HLV. Mai Linh',
    xp: 150,
    exercises: [
      { id: 401, name: 'Abdominal Crunches', type: 'Cơ bụng', duration: 45, isRepBased: true, reps: 15, desc: 'Nằm ngửa, co gối, cuộn cơ bụng nâng nửa thân trên lên, giữ tay sau gáy.', xp: 50 },
      { id: 402, name: 'Leg Raises', type: 'Cơ bụng', duration: 45, isRepBased: true, reps: 12, desc: 'Nằm ngửa, duỗi chân, nâng thẳng hai chân lên vuông góc rồi hạ xuống chậm rãi.', xp: 50 },
      { id: 403, name: 'Plank Hold', type: 'Cơ bụng', duration: 45, isRepBased: false, reps: 0, desc: 'Giữ cơ thể thẳng tắp bằng cẳng tay và mũi chân, siết chặt cơ bụng.', xp: 50 }
    ]
  },
  {
    id: 'cardio_blast',
    name: 'Khởi động nhanh cho tim mạch',
    type: 'HIIT',
    duration: '15 phút',
    difficulty: 'Cơ bản',
    category: 'HIIT',
    instructor: 'HLV. Nguyễn Văn',
    xp: 100,
    exercises: [
      { id: 501, name: 'Jumping Jacks', type: 'HIIT', duration: 30, isRepBased: false, reps: 0, desc: 'Bật nhảy rộng chân kết hợp vỗ tay qua đầu liên tục.', xp: 50 },
      { id: 502, name: 'High Knees', type: 'HIIT', duration: 30, isRepBased: false, reps: 0, desc: 'Chạy nâng cao đùi tại chỗ nhanh và thở đều.', xp: 50 }
    ]
  },
  {
    id: 'full_body',
    name: 'Full Body Flow',
    type: 'Giãn cơ',
    duration: '15 phút',
    difficulty: 'Nhẹ nhàng',
    category: 'Giãn cơ',
    instructor: 'HLV. Anh Tuấn',
    xp: 150,
    exercises: [
      { id: 601, name: 'Cat-Cow Stretch', type: 'Giãn cơ', duration: 60, isRepBased: false, reps: 0, desc: 'Hít vào võng lưng (Cow), thở ra gù lưng (Cat) chậm rãi.', xp: 30 },
      { id: 602, name: 'Bird Dog', type: 'Cơ bụng', duration: 45, isRepBased: true, reps: 8, desc: 'Duỗi thẳng tay phải và chân trái, đổi bên nhịp nhàng.', xp: 40 },
      { id: 603, name: 'Plank Hold', type: 'Cơ bụng', duration: 30, isRepBased: false, reps: 0, desc: 'Giữ thẳng lưng, siết chặt cơ bụng và thở đều.', xp: 40 },
      { id: 604, name: 'Bodyweight Squats', type: 'Thân dưới', duration: 45, isRepBased: true, reps: 12, desc: 'Hạ hông xuống song song sàn, đẩy thẳng người lên.', xp: 40 }
    ]
  }
];

export default function Workouts({ onWorkoutComplete }) {
  // Main state
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(workoutsData[0]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [workoutFinished, setWorkoutFinished] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const currentExercise = selectedWorkout.exercises[currentExerciseIndex];

  // Initialize timer for duration-based exercises
  useEffect(() => {
    if (isPlaying && currentExercise && !currentExercise.isRepBased) {
      setTimeLeft(currentExercise.duration);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [currentExerciseIndex, isPlaying, selectedWorkout]);

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

  const handleStartWorkout = (workout) => {
    setSelectedWorkout(workout);
    setIsPlaying(true);
    setCurrentExerciseIndex(0);
    setCompletedExercises([]);
    setWorkoutFinished(false);
  };

  const handleExerciseDone = () => {
    const isLast = currentExerciseIndex === selectedWorkout.exercises.length - 1;
    setCompletedExercises((prev) => [...prev, currentExercise.id]);
    
    if (isLast) {
      setTimerActive(false);
      setWorkoutFinished(true);
      onWorkoutComplete(selectedWorkout.xp); // Give the full workout XP!
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    const isLast = currentExerciseIndex === selectedWorkout.exercises.length - 1;
    if (isLast) {
      setWorkoutFinished(true);
      onWorkoutComplete(Math.round(selectedWorkout.xp * 0.7)); // reduced XP for skipping
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

  // Filter logic
  const filteredWorkouts = workoutsData.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          workout.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredWorkout = workoutsData.find(w => w.featured) || workoutsData[0];
  const continueWatchingWorkouts = workoutsData.filter(w => w.progress);
  const popularWorkouts = workoutsData.filter(w => !w.featured && !w.progress);

  // 1. Workout Player View
  if (isPlaying) {
    if (workoutFinished) {
      return (
        <div className="workout-player-container finished fade-in">
          <div className="finish-celebration">
            <div className="trophy-circle" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={48} className="trophy-pulse" />
            </div>
            <h2 className="celebration-title">Buổi Tập Hoàn Thành!</h2>
            <p className="celebration-sub">Bạn đã hoàn thành bài tập **{selectedWorkout.name}**</p>
            
            <div className="xp-gain-badge">
              <Flame size={20} fill="currentColor" />
              <span>+{selectedWorkout.xp} XP đã cộng vào hành trình</span>
            </div>

            <div className="workout-summary-box">
              <div className="summary-item">
                <span className="sum-val">{selectedWorkout.exercises.length}/{selectedWorkout.exercises.length}</span>
                <span className="sum-lbl">Động tác</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-item">
                <span className="sum-val">{selectedWorkout.duration}</span>
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
          <span className="player-workout-name">{selectedWorkout.name}</span>
          <button className="quit-btn" onClick={handleQuit} aria-label="Dừng tập">
            <X size={20} />
          </button>
        </div>

        {/* Exercise Progress dots */}
        <div className="player-progress-dots">
          {selectedWorkout.exercises.map((ex, idx) => (
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
            {currentExerciseIndex === selectedWorkout.exercises.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
          </button>
        </div>
      </div>
    );
  }

  // 2. Video Library View (Figma Redesign)
  return (
    <div className="workout-page fade-in">
      <div className="page-title-section">
        <h2 className="page-title">Thư viện Video</h2>
        <p className="page-subtitle">Chọn bài tập trực quan để cùng tập luyện với HLV.</p>
      </div>

      {/* Search Bar */}
      <div className="video-search-container">
        <Search className="video-search-icon" size={16} />
        <input 
          type="text" 
          placeholder="Tìm kiếm bài tập, HLV..." 
          className="video-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Chips */}
      <div className="category-chips-row">
        {['Tất cả', 'HIIT', 'Yoga', 'Sức mạnh', 'Giãn cơ'].map((cat) => (
          <button 
            key={cat} 
            className={`category-chip-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured section */}
      {selectedCategory === 'Tất cả' && !searchTerm && (
        <>
          <h4 className="section-title-sm">Nổi bật</h4>
          <div 
            className="featured-video-card card" 
            onClick={() => handleStartWorkout(featuredWorkout)}
          >
            <div className="featured-video-bg"></div>
            <div className="featured-badge-overlay">MỚI NHẤT</div>
            <div className="featured-play-btn">
              <Play size={20} fill="currentColor" />
            </div>
            <div className="featured-video-content">
              <h3 className="featured-title">{featuredWorkout.name}</h3>
              <span className="featured-meta">
                {featuredWorkout.category} • {featuredWorkout.duration} • {featuredWorkout.instructor}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Continue Watching Section */}
      {selectedCategory === 'Tất cả' && !searchTerm && continueWatchingWorkouts.length > 0 && (
        <>
          <h4 className="section-title-sm">Tiếp tục xem</h4>
          <div className="horizontal-scroll-row">
            {continueWatchingWorkouts.map((workout) => (
              <div 
                key={workout.id} 
                className="continue-video-card card"
                onClick={() => handleStartWorkout(workout)}
              >
                <div className="continue-media-placeholder">
                  <div className="continue-media-mesh"></div>
                  <PlayCircle className="continue-play-icon" size={24} />
                  <div className="continue-progress-bar">
                    <div className="continue-progress-fill" style={{ width: `${workout.progress}%` }}></div>
                  </div>
                </div>
                <span className="continue-title">{workout.name}</span>
                <span className="continue-meta">{workout.category} • {workout.instructor}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Popular/All list */}
      <h4 className="section-title-sm">
        {searchTerm || selectedCategory !== 'Tất cả' ? 'Kết quả tìm kiếm' : 'Bài tập phổ biến'}
      </h4>
      <div className="popular-workouts-list">
        {(searchTerm || selectedCategory !== 'Tất cả' ? filteredWorkouts : popularWorkouts).map((workout) => (
          <div 
            key={workout.id} 
            className="popular-workout-card card"
            onClick={() => handleStartWorkout(workout)}
          >
            <div className="popular-left">
              <div className="popular-media-thumb">
                <div className="popular-thumb-mesh"></div>
                <Play size={12} fill="currentColor" style={{ opacity: 0.6 }} />
              </div>
              <div className="popular-info">
                <h4 className="popular-title">{workout.name}</h4>
                <span className="popular-meta">
                  {workout.category} • {workout.duration} • {workout.instructor}
                </span>
              </div>
            </div>
            <div className="popular-play-btn-circle">
              <Play size={10} fill="currentColor" />
            </div>
          </div>
        ))}
        {(searchTerm || selectedCategory !== 'Tất cả') && filteredWorkouts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', opacity: 0.6, fontSize: '13px' }}>
            Không tìm thấy bài tập phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}

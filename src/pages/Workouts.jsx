import React, { useState } from 'react';
import { 
  Search, Play, Clock, Flame, Award, ChevronRight, X, ArrowLeft,
  Dumbbell, CheckCircle2, Heart, Zap, PlayCircle, Star, Edit3, Plus, Minus
} from 'lucide-react';

const mockExercises = [
  { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 12, weight: 60, desc: 'Đẩy tạ trên ghế nằm ngang. Giúp phát triển cơ ngực, vai và bắp tay sau.' },
  { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 4, reps: 10, weight: 80, desc: 'Gánh tạ đòn squat. Bài tập cốt lõi cho cơ đùi trước, đùi sau và cơ mông.' },
  { id: 3, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 3, reps: 8, weight: 0, desc: 'Lên xà đơn. Tăng cường cơ xô, cơ lưng rộng và bắp tay trước.' },
  { id: 4, name: 'Dumbbell Shoulder Press', category: 'Vai • Dumbbell', sets: 3, reps: 12, weight: 16, desc: 'Đẩy tạ đôi qua đầu ở tư thế ngồi. Phát triển cơ vai toàn diện.' },
  { id: 5, name: 'Plank', category: 'Bụng • Core', sets: 3, reps: 60, weight: 0, isTimeBased: true, desc: 'Giữ cơ thể thẳng tắp trên khuỷu tay và mũi chân. Xây dựng sức bền cơ bụng.' }
];

export default function Workouts({ onWorkoutComplete }) {
  // Routing view state: 'hub', 'gym_hub', 'home_hub', 'details', 'player', 'summary'
  const [view, setView] = useState('hub');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selection states
  const [selectedRoutineTitle, setSelectedRoutineTitle] = useState('Lộ trình tăng cơ 4 tuần');
  const [selectedRoutineExercises, setSelectedRoutineExercises] = useState(mockExercises);
  const [selectedRoutineKcal, setSelectedRoutineKcal] = useState(450);

  // Active workout player states
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(8);
  const [workoutTimer, setWorkoutTimer] = useState(65); // mock total mins
  
  // Rating state
  const [userRating, setUserRating] = useState(5);

  const startPlayer = (title, exercises, kcal) => {
    setSelectedRoutineTitle(title);
    setSelectedRoutineExercises(exercises);
    setSelectedRoutineKcal(kcal);
    setCurrentExIndex(0);
    setCurrentSet(1);
    setCurrentReps(exercises[0].reps);
    setView('player');
  };

  const handleNextSet = () => {
    const currentEx = selectedRoutineExercises[currentExIndex];
    if (currentSet < currentEx.sets) {
      setCurrentSet(currentSet + 1);
    } else {
      // Go to next exercise
      if (currentExIndex < selectedRoutineExercises.length - 1) {
        const nextIdx = currentExIndex + 1;
        setCurrentExIndex(nextIdx);
        setCurrentSet(1);
        setCurrentReps(selectedRoutineExercises[nextIdx].reps);
      } else {
        // Workout Finished! Go to summary
        setView('summary');
      }
    }
  };

  const handleFinishWorkout = () => {
    if (onWorkoutComplete) {
      onWorkoutComplete(150); // gain 150 XP
    }
    // Return to main workouts hub
    setView('hub');
  };

  // ================= VIEW 1: MAIN WORKOUTS HUB =================
  if (view === 'hub') {
    return (
      <div className="workouts-page-v2 fade-in" style={{ padding: '12px' }}>
        {/* Header Title */}
        <div className="profile-header-v2" style={{ marginBottom: '16px' }}>
          <h2 className="profile-brand-title">LevelUp</h2>
        </div>

        {/* Search Bar */}
        <div className="chat-input-bar-v2" style={{ marginBottom: '16px', background: '#f1f5f9' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '4px' }} />
          <input
            type="text"
            className="chat-text-input-v2"
            placeholder="Tìm kiếm bài tập, chương trình..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Luyện tập ở đâu? Section */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '15px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>Luyện tập ở đâu?</h3>
        <div className="location-cards-row" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          
          {/* Home Card */}
          <div className="location-card-figma flex-1" onClick={() => setView('home_hub')} style={{
            background: 'linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.75)), url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=250&q=80")',
            backgroundSize: 'cover', backgroundPosition: 'center', height: '110px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px', cursor: 'pointer', color: '#ffffff'
          }}>
            <div className="location-icon-wrapper" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
              <Zap size={14} color="#ffffff" fill="#ffffff" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>Tại nhà</span>
            <span style={{ fontSize: '10px', opacity: 0.8 }}>120+ bài tập</span>
          </div>

          {/* Gym Card */}
          <div className="location-card-figma flex-1" onClick={() => setView('gym_hub')} style={{
            background: 'linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.75)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=250&q=80")',
            backgroundSize: 'cover', backgroundPosition: 'center', height: '110px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px', cursor: 'pointer', color: '#ffffff'
          }}>
            <div className="location-icon-wrapper" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
              <Dumbbell size={14} color="#ffffff" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '800' }}>Tại phòng gym</span>
            <span style={{ fontSize: '10px', opacity: 0.8 }}>80+ chương trình</span>
          </div>

        </div>

        {/* Gợi ý cho bạn Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 className="section-title-sm-bold" style={{ fontSize: '15px', fontWeight: '850', color: '#0f172a', margin: 0 }}>Gợi ý cho bạn</h3>
          <button onClick={() => setView('gym_hub')} style={{ background: 'none', border: 'none', padding: 0, fontSize: '11.5px', color: '#0056C6', fontWeight: '800', cursor: 'pointer', outline: 'none' }}>
            Xem tất cả
          </button>
        </div>

        {/* Highlight Banner */}
        <div className="figma-highlight-banner" style={{
          background: 'linear-gradient(to right, rgba(0, 86, 198, 0.95), rgba(30, 41, 59, 0.9)), url("https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=350&q=80")',
          backgroundSize: 'cover', borderRadius: '20px', padding: '18px', color: '#ffffff', marginBottom: '16px', position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <span style={{ background: '#10b981', color: '#ffffff', fontSize: '8px', fontWeight: '800', padding: '3px 8px', borderRadius: '99px' }}>MỚI</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '8px', fontWeight: '800', padding: '3px 8px', borderRadius: '99px' }}>CAO ĐỘ</span>
          </div>
          <h4 className="banner-title" style={{ fontSize: '18px', fontWeight: '850', margin: '0 0 6px 0', color: '#ffffff' }}>Toàn thân cấp tốc</h4>
          <p className="banner-desc" style={{ fontSize: '11px', opacity: 0.85, margin: '0 0 16px 0', lineHeight: '1.4', color: '#ffffff' }}>Đốt cháy calo tối đa với chuỗi bài tập HIIT cường độ cao phối hợp.</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="banner-meta" style={{ fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff' }}>
              <Clock size={14} /> 15 Phút
            </span>
            <button className="btn btn-primary" onClick={() => startPlayer('Toàn thân cấp tốc', [
              { id: 1, name: 'Jumping Jacks', category: 'HIIT • Toàn thân', sets: 3, reps: 45, weight: 0 },
              { id: 2, name: 'Burpees', category: 'HIIT • Sức bền', sets: 3, reps: 15, weight: 0 },
              { id: 3, name: 'Mountain Climbers', category: 'Bụng • Core', sets: 3, reps: 40, weight: 0 }
            ], 220)} style={{ width: 'auto', padding: '8px 16px', fontSize: '13px', background: '#ffffff', color: '#0056c6', borderRadius: '12px', fontWeight: '800' }}>
              Bắt đầu ngay ➔
            </button>
          </div>
        </div>

        {/* Mini recommendations list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Item 1 */}
          <div className="popular-workout-card figma-recommend-workout-card card" onClick={() => startPlayer('Yoga Chào Buổi Sáng', [
            { id: 1, name: 'Tư thế chào mặt trời', category: 'Yoga • Linh hoạt', sets: 2, reps: 5, weight: 0 },
            { id: 2, name: 'Tư thế chiến binh', category: 'Yoga • Cân bằng', sets: 3, reps: 8, weight: 0 }
          ], 110)} style={{ cursor: 'pointer', padding: '12px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', border: '1.5px solid #e2e8f0' }}>
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=80&q=80" alt="Yoga" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '8px', color: '#d97706', fontWeight: '800' }}>PHỔ BIẾN</span>
              <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0 }}>Yoga Chào Buổi Sáng</h5>
              <span style={{ fontSize: '11px', color: '#64748b' }}>15 phút • Nhẹ</span>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </div>

          {/* Item 2 */}
          <div className="popular-workout-card figma-recommend-workout-card card" onClick={() => startPlayer('Thử thách Cơ bụng', [
            { id: 1, name: 'Crunches', category: 'Bụng • Core', sets: 3, reps: 15, weight: 0 },
            { id: 2, name: 'Leg Raises', category: 'Bụng • Core', sets: 3, reps: 12, weight: 0 }
          ], 130)} style={{ cursor: 'pointer', padding: '12px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', border: '1.5px solid #e2e8f0' }}>
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=80&q=80" alt="Abs" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '8px', color: '#0056c6', fontWeight: '800' }}>SỨC MẠNH</span>
              <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0 }}>Thử thách Cơ bụng</h5>
              <span style={{ fontSize: '11px', color: '#64748b' }}>20 phút • Vừa</span>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </div>

        </div>

      </div>
    );
  }

  // ================= VIEW 2: GYM WORKOUTS HUB =================
  if (view === 'gym_hub') {
    return (
      <div className="workouts-page-v2 gym-hub-view fade-in" style={{ padding: '12px' }}>
        
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button className="back-btn-icon" onClick={() => setView('hub')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: '850', margin: 0 }}>Luyện tập Tại phòng gym</h2>
        </div>

        {/* Search bar */}
        <div className="chat-input-bar-v2" style={{ marginBottom: '16px', background: '#f1f5f9' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '4px' }} />
          <input
            type="text"
            className="chat-text-input-v2"
            placeholder="Tìm bài tập tại phòng gym..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Section 1: Dành riêng cho bạn */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: 0 }}>Dành riêng cho bạn</h3>
          <span style={{ fontSize: '11.5px', color: '#0056C6', fontWeight: '800', cursor: 'pointer' }}>Xem tất cả</span>
        </div>

        {/* Horizontal scroll cards */}
        <div className="horizontal-scroll-row" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none', marginBottom: '16px' }}>
          
          {/* Card 1: 4 weeks muscle routine */}
          <div className="gym-program-card card" onClick={() => {
            setSelectedRoutineTitle('Lộ trình tăng cơ 4 tuần');
            setSelectedRoutineExercises(mockExercises);
            setSelectedRoutineKcal(450);
            setView('details');
          }} style={{ minWidth: '220px', flex: 1, padding: '14px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', background: '#ebf3ff', color: '#0056c6', padding: '3px 8px', borderRadius: '99px' }}>PRO</span>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>5 buổi/tuần</span>
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>Lộ trình tăng cơ 4 tuần</h4>
            <div className="progress-track-v2" style={{ height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden', marginBottom: '4px' }}>
              <div className="progress-fill-v2" style={{ width: '45%', height: '100%', background: '#0056c6' }}></div>
            </div>
            <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '750' }}>Tiến độ: 45%</span>
          </div>

          {/* Card 2: Advanced shred */}
          <div className="gym-program-card card" style={{ minWidth: '220px', flex: 1, padding: '14px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', background: '#ebf3ff', color: '#0056c6', padding: '3px 8px', borderRadius: '99px' }}>PRO</span>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>4 buổi/tuần</span>
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>Siết mỡ nâng cao</h4>
            <div className="progress-track-v2" style={{ height: '5px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden', marginBottom: '4px' }}>
              <div className="progress-fill-v2" style={{ width: '12%', height: '100%', background: '#0056c6' }}></div>
            </div>
            <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '750' }}>Tiến độ: 12%</span>
          </div>

        </div>

        {/* Section 2: Sức mạnh cơ bắp */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>Sức mạnh cơ bắp</h3>
        
        {/* Large day split card */}
        <div className="gym-split-card card" style={{ padding: '16px', borderRadius: '20px', border: '1.5px solid #e2e8f0', background: '#ffffff', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '850', margin: '0 0 4px 0', color: '#0f172a' }}>Ngày đẩy tạ Chest & Triceps</h4>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '12px' }}>8 bài tập • Trung bình</span>
            <button className="btn btn-primary" onClick={() => startPlayer('Ngày đẩy tạ Chest & Triceps', mockExercises, 450)} style={{ width: 'auto', padding: '8px 20px', fontSize: '13px', borderRadius: '12px', fontWeight: '800' }}>
              Bắt đầu
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=100&q=80" alt="Chest" style={{ width: '76px', height: '76px', borderRadius: '16px', objectFit: 'cover' }} />
        </div>

        {/* Grid sub-categories */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div className="grid-cell-item card flex-1" style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Chân & Mông</span>
          </div>
          <div className="grid-cell-item card flex-1" style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Lưng & Xô</span>
          </div>
        </div>

        {/* Yoga Banner for Gymer */}
        <div className="yoga-gymer-card card" style={{
          background: 'linear-gradient(to right, rgba(15,23,42,0.9), rgba(15,23,42,0.5)), url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80")',
          backgroundSize: 'cover', borderRadius: '16px', padding: '16px', color: '#ffffff'
        }}>
          <h4 style={{ fontSize: '14.5px', fontWeight: '800', margin: '0 0 4px 0' }}>Yoga cho Gymer</h4>
          <p style={{ fontSize: '11px', opacity: 0.85, margin: 0 }}>Mở rộng biên độ khớp • 20 phút • Phục hồi cơ bắp toàn diện</p>
        </div>

      </div>
    );
  }

  // ================= VIEW 3: HOME WORKOUTS HUB =================
  if (view === 'home_hub') {
    return (
      <div className="workouts-page-v2 home-hub-view fade-in" style={{ padding: '12px' }}>
        
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button className="back-btn-icon" onClick={() => setView('hub')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: '850', margin: 0 }}>Luyện tập Tại nhà</h2>
        </div>

        {/* Search bar */}
        <div className="chat-input-bar-v2" style={{ marginBottom: '16px', background: '#f1f5f9' }}>
          <Search size={16} color="#64748b" style={{ marginRight: '4px' }} />
          <input
            type="text"
            className="chat-text-input-v2"
            placeholder="Tìm kiếm bài tập..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Section 1: Cá nhân hóa */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: 0 }}>Cá nhân hóa</h3>
          <span style={{ fontSize: '11.5px', color: '#0056C6', fontWeight: '800', cursor: 'pointer' }}>Xem thêm</span>
        </div>

        {/* Horizontal scroll cards */}
        <div className="horizontal-scroll-row" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none', marginBottom: '16px' }}>
          
          {/* Card 1: Warmup */}
          <div className="gym-program-card card" onClick={() => startPlayer('Khởi động buổi sáng', [
            { id: 1, name: 'Khởi động khớp vai', category: 'Khởi động', sets: 2, reps: 30, weight: 0 },
            { id: 2, name: 'Xoay hông', category: 'Khởi động', sets: 2, reps: 30, weight: 0 }
          ], 80)} style={{ minWidth: '180px', flex: 1, padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
            <span style={{ fontSize: '8px', fontWeight: '800', background: '#e8f0fe', color: '#0056c6', padding: '3px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '8px' }}>MỚI</span>
            <h4 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>Khởi động buổi sáng</h4>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '750' }}>15 phút • 300 XP</span>
          </div>

          {/* Card 2: Abs */}
          <div className="gym-program-card card" onClick={() => startPlayer('Cơ bụng săn chắc', [
            { id: 1, name: 'Russian Twist', category: 'Bụng • Core', sets: 3, reps: 20, weight: 0 },
            { id: 2, name: 'Plank', category: 'Bụng • Core', sets: 3, reps: 45, weight: 0 }
          ], 120)} style={{ minWidth: '180px', flex: 1, padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>Cơ bụng săn chắc</h4>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '750' }}>20 phút • 350 XP</span>
          </div>

        </div>

        {/* Section 2: Giãn cơ */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>Giãn cơ</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="grid-cell-item card flex-1" style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Toàn thân</span>
          </div>
          <div className="grid-cell-item card flex-1" style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Cổ & Vai</span>
          </div>
        </div>

        {/* Section 3: Sức mạnh */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>Sức mạnh</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          
          <div className="popular-workout-card card" onClick={() => startPlayer('Thân dưới bùng nổ', [
            { id: 1, name: 'Lunges', category: 'Chân • Bodyweight', sets: 4, reps: 12, weight: 0 },
            { id: 2, name: 'Glute Bridges', category: 'Mông • Bodyweight', sets: 3, reps: 15, weight: 0 }
          ], 150)} style={{ cursor: 'pointer', padding: '12px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', border: '1.5px solid #e2e8f0', background: '#ffffff' }}>
            <img src="https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=80&q=80" alt="Legs" style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0 }}>Thân dưới bùng nổ</h5>
              <span style={{ fontSize: '11px', color: '#64748b' }}>8 reps x 4 sets</span>
            </div>
            <PlayCircle size={22} color="#10b981" />
          </div>

        </div>

        {/* Section 4: HIIT */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>HIIT</h3>
        <div className="yoga-gymer-card card" onClick={() => startPlayer('Đốt mỡ siêu tốc', [
          { id: 1, name: 'Burpees', category: 'HIIT', sets: 3, reps: 15, weight: 0 },
          { id: 2, name: 'Jumping Squats', category: 'HIIT', sets: 3, reps: 20, weight: 0 }
        ], 260)} style={{
          background: 'linear-gradient(to right, rgba(0, 86, 198, 0.9), rgba(15, 23, 42, 0.75)), url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80")',
          backgroundSize: 'cover', borderRadius: '16px', padding: '16px', color: '#ffffff', cursor: 'pointer'
        }}>
          <span style={{ fontSize: '8px', fontWeight: '800', background: '#10b981', color: '#ffffff', padding: '3px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '8px' }}>CƯỜNG ĐỘ CAO</span>
          <h4 style={{ fontSize: '14.5px', fontWeight: '800', margin: '0 0 4px 0' }}>Đốt mỡ siêu tốc</h4>
          <p style={{ fontSize: '11px', opacity: 0.85, margin: 0 }}>Khó • 25 phút</p>
        </div>

      </div>
    );
  }

  // ================= VIEW 4: ROUTINE DETAILS =================
  if (view === 'details') {
    return (
      <div className="workouts-page-v2 details-view fade-in">
        
        {/* Header */}
        <div className="onboarding-header-nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px 20px', boxSizing: 'border-box' }}>
          <button className="back-btn-icon" onClick={() => setView('gym_hub')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <span className="step-indicator-text" style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Chi tiết lịch tập</span>
          <div style={{ width: 28 }}></div>
        </div>

        {/* Large banner image info */}
        <div className="routine-banner-image" style={{
          background: 'linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.85)), url("https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center', height: '180px', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px', marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 6px 0' }}>{selectedRoutineTitle}</h3>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', opacity: 0.9 }}>
            <span>60 phút</span>
            <span>•</span>
            <span>{selectedRoutineKcal} kcal</span>
            <span>•</span>
            <span style={{ color: '#fbbf24', fontWeight: '800' }}>★ Trung bình</span>
          </div>
        </div>

        {/* Exercises List */}
        <div style={{ padding: '0 16px', marginBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '850', color: '#0f172a' }}>Danh sách bài tập</span>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '750' }}>{selectedRoutineExercises.length} bài tập</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedRoutineExercises.map((ex, idx) => (
              <div key={ex.id} className="popular-workout-card card" style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', alignItems: 'center', background: '#ffffff' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ebf3ff', color: '#0056c6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px' }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{ex.name}</h5>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {ex.isTimeBased ? `${ex.reps} giây` : `${ex.reps} reps`} x {ex.sets} sets {ex.weight > 0 ? `• ${ex.weight} kg` : ''}
                  </span>
                </div>
                <PlayCircle size={20} color="#0056c6" />
              </div>
            ))}
          </div>
        </div>

        {/* Fixed bottom button */}
        <div className="onboarding-actions-static" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: '#ffffff', borderTop: '1.5px solid #f1f5f9', zIndex: 100 }}>
          <button className="btn btn-primary w-full" onClick={() => startPlayer(selectedRoutineTitle, selectedRoutineExercises, selectedRoutineKcal)}>
            ⚡ Bắt đầu tập luyện
          </button>
        </div>

      </div>
    );
  }

  // ================= VIEW 5: WORKOUT PLAYER =================
  if (view === 'player') {
    const currentEx = selectedRoutineExercises[currentExIndex];
    return (
      <div className="workouts-page-v2 player-view fade-in">
        
        {/* Header */}
        <div className="onboarding-header-nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px 20px', boxSizing: 'border-box' }}>
          <button className="back-btn-icon" onClick={() => setView('details')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <span className="step-indicator-text" style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Theo dõi bài tập</span>
          <div style={{ width: 28 }}></div>
        </div>

        {/* Workout Video Demonstration Card */}
        <div style={{ padding: '0 16px', marginTop: '10px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 2px 0', color: '#0f172a' }}>{currentEx.name}</h3>
          <span style={{ fontSize: '11px', color: '#0056c6', fontWeight: '800', background: '#ebf3ff', padding: '2px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '16px' }}>{currentEx.category}</span>

          {/* Video Placeholder */}
          <div className="exercise-media-placeholder" style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            height: '180px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '20px', position: 'relative'
          }}>
            <PlayCircle size={44} color="#ffffff" style={{ opacity: 0.8 }} />
            <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '8px', fontSize: '9.5px', fontWeight: '800' }}>HƯỚNG DẪN 3D</span>
          </div>

          {/* Sets and Weights metrics row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div className="metric-box flex-1" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '800', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Hiệp</span>
              <strong style={{ fontSize: '18px', fontWeight: '900', color: '#0056c6' }}>{currentSet} / {currentEx.sets}</strong>
            </div>

            <div className="metric-box flex-1" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '800', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Trọng lượng</span>
              <strong style={{ fontSize: '18px', fontWeight: '900', color: '#0056c6' }}>{currentEx.weight > 0 ? `${currentEx.weight} kg` : 'Bodyweight'}</strong>
            </div>
          </div>

          {/* Reps Counter Interactive Dial */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>Số lần lặp (Reps)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button onClick={() => setCurrentReps(Math.max(0, currentReps - 1))} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ebf3ff', border: 'none', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0056c6' }}>
                <Minus size={18} />
              </button>
              
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #0056c6', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', boxShadow: '0 4px 12px rgba(0, 86, 198, 0.15)' }}>
                <strong style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{currentReps}</strong>
              </div>

              <button onClick={() => setCurrentReps(currentReps + 1)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ebf3ff', border: 'none', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0056c6' }}>
                <Plus size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom controls */}
        <div className="onboarding-actions-static" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: '#ffffff', borderTop: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 100 }}>
          <button className="btn btn-primary w-full" onClick={handleNextSet}>
            {currentSet === currentEx.sets && currentExIndex === selectedRoutineExercises.length - 1 ? 'Hoàn thành buổi tập' : 'Hoàn thành hiệp'}
          </button>
        </div>

      </div>
    );
  }

  // ================= VIEW 6: WORKOUT SUMMARY =================
  if (view === 'summary') {
    return (
      <div className="workouts-page-v2 summary-celebrate-view fade-in" style={{ padding: '20px 16px' }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '20px' }}>
          <h2 className="celebration-title" style={{ fontSize: '28px', fontWeight: '900', color: '#0056c6', margin: '0 0 6px 0' }}>Tuyệt vời!</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Bạn đã hoàn thành lộ trình tập luyện thành công.</p>
        </div>

        {/* Stats row cards */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          
          {/* Time spent */}
          <div className="metric-box flex-1 card" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '4px' }}>TỔNG THỜI GIAN</span>
            <strong style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>{workoutTimer}</strong>
            <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '2px' }}>phút</span>
          </div>

          {/* Kcal burnt */}
          <div className="metric-box flex-1 card" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '4px' }}>CALO TIÊU THỤ</span>
            <strong style={{ fontSize: '20px', fontWeight: '900', color: '#fa5a15' }}>{selectedRoutineKcal}</strong>
            <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '2px' }}>kcal</span>
          </div>

        </div>

        {/* Records Badge achievements row */}
        <h4 className="figma-section-heading" style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>THÀNH TÍCH ĐẠT ĐƯỢC</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          
          {/* Achievement 1 */}
          <div className="popular-workout-card card" style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', alignItems: 'center', background: '#ffffff' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🏆
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Kỷ lục mới</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Bài tập Bench Press đạt 60kg x 12 reps</span>
            </div>
          </div>

        </div>

        {/* Star feedback rating box */}
        <div className="star-rating-box card" style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '20px', textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '10px' }}>Đánh giá buổi tập của bạn</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setUserRating(star)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Star
                  size={24}
                  color="#fbbf24"
                  fill={star <= userRating ? '#fbbf24' : 'transparent'}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Finish exit button */}
        <button className="btn btn-primary w-full" onClick={handleFinishWorkout}>
          Về trang chủ
        </button>

      </div>
    );
  }

  return null;
}

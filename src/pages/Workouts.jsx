import React, { useState } from 'react';
import { 
  Search, Play, Clock, Flame, Award, ChevronRight, X, ArrowLeft,
  Dumbbell, CheckCircle2, Heart, Zap, PlayCircle, Star, Edit3, Plus, Minus, SkipForward
} from 'lucide-react';

// Map exercise names to local images
const exerciseImageMap = {
  'Bench Press': '/images/chitietbaitap/bench press.jpg',
  'Squats': '/images/chitietbaitap/squat.jpg',
  'Pull-ups': '/images/chitietbaitap/pull up.jpg',
  'Dumbbell Shoulder Press': '/images/chitietbaitap/dumbbell shoulder.jpg',
  'Plank': '/images/chitietbaitap/plank.jpg',
};

const mockExercises = [
  { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 12, weight: 60, desc: 'Đẩy tạ trên ghế nằm ngang. Giúp phát triển cơ ngực, vai và bắp tay sau. Giữ lưng phẳng, hạ tạ chậm rãi.' },
  { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 4, reps: 10, weight: 80, desc: 'Gánh tạ đòn squat. Bài tập cốt lõi cho cơ đùi trước, đùi sau và cơ mông. Giữ ngực thẳng, gối không vượt ngón chân.' },
  { id: 3, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 3, reps: 8, weight: 0, desc: 'Lên xà đơn. Tăng cường cơ xô, cơ lưng rộng và bắp tay trước. Kéo ngực lên chạm xà.' },
  { id: 4, name: 'Dumbbell Shoulder Press', category: 'Vai • Dumbbell', sets: 3, reps: 12, weight: 16, desc: 'Đẩy tạ đôi qua đầu ở tư thế ngồi. Phát triển cơ vai toàn diện. Giữ lưng thẳng đứng.' },
  { id: 5, name: 'Plank', category: 'Bụng • Core', sets: 3, reps: 60, weight: 0, isTimeBased: true, desc: 'Giữ cơ thể thẳng tắp trên khuỷu tay và mũi chân. Xây dựng sức bền cơ bụng và core.' }
];

// Programs Mock Data with 4-week sessions breakdown
const mockPrograms = {
  'muscle_4weeks': {
    id: 'muscle_4weeks',
    title: 'Lộ trình tăng cơ 4 tuần',
    subtitle: '5 buổi/tuần • 20 buổi tập tổng cộng',
    progress: 45,
    completedSessions: 9,
    totalSessions: 20,
    weeks: [
      {
        weekNum: 1,
        title: 'Tuần 1: Khởi động & Thích nghi',
        sessions: [
          {
            id: 'm1_s1',
            sessionName: 'Buổi 1: Ngực & Tay sau',
            duration: 45,
            kcal: 420,
            completed: true,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 12, weight: 60, desc: 'Đẩy tạ trên ghế nằm ngang. Giúp phát triển cơ ngực, vai và bắp tay sau.' },
              { id: 4, name: 'Dumbbell Shoulder Press', category: 'Vai • Dumbbell', sets: 3, reps: 12, weight: 16, desc: 'Đẩy tạ đôi qua đầu. Phát triển cơ vai toàn diện.' },
              { id: 5, name: 'Plank', category: 'Bụng • Core', sets: 3, reps: 60, weight: 0, isTimeBased: true, desc: 'Giữ cơ thể thẳng tắp trên khuỷu tay.' }
            ]
          },
          {
            id: 'm1_s2',
            sessionName: 'Buổi 2: Lưng & Bắp tay',
            duration: 40,
            kcal: 380,
            completed: true,
            exercises: [
              { id: 3, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 4, reps: 10, weight: 0, desc: 'Lên xà đơn. Tăng cường cơ xô và bắp tay trước.' },
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 3, reps: 10, weight: 55, desc: 'Đẩy tạ ngực vừa sức.' }
            ]
          },
          {
            id: 'm1_s3',
            sessionName: 'Buổi 3: Chân & Mông',
            duration: 50,
            kcal: 480,
            completed: true,
            exercises: [
              { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 4, reps: 10, weight: 80, desc: 'Gánh tạ đòn squat. Bài tập cốt lõi cho cơ đùi và mông.' },
              { id: 5, name: 'Plank', category: 'Bụng • Core', sets: 3, reps: 60, weight: 0, isTimeBased: true, desc: 'Giữ cơ thể thẳng tắp.' }
            ]
          },
          {
            id: 'm1_s4',
            sessionName: 'Buổi 4: Vai & Cơ bụng',
            duration: 45,
            kcal: 400,
            completed: true,
            exercises: [
              { id: 4, name: 'Dumbbell Shoulder Press', category: 'Vai • Dumbbell', sets: 4, reps: 12, weight: 18, desc: 'Đẩy tạ đôi tập trung cơ vai.' },
              { id: 5, name: 'Plank', category: 'Bụng • Core', sets: 4, reps: 60, weight: 0, isTimeBased: true, desc: 'Siết cơ bụng.' }
            ]
          },
          {
            id: 'm1_s5',
            sessionName: 'Buổi 5: Full Body Pump',
            duration: 50,
            kcal: 450,
            completed: true,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 10, weight: 65, desc: 'Đẩy tạ ngực bứt tốc.' },
              { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 4, reps: 10, weight: 85, desc: 'Squat sức mạnh.' }
            ]
          }
        ]
      },
      {
        weekNum: 2,
        title: 'Tuần 2: Tăng tải trọng (Progressive Overload)',
        sessions: [
          {
            id: 'm2_s1',
            sessionName: 'Buổi 6: Ngực & Tay sau Nâng cao',
            duration: 45,
            kcal: 450,
            completed: false,
            isCurrent: true,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 12, weight: 65, desc: 'Đẩy tạ nặng hơn tuần 1.' },
              { id: 4, name: 'Dumbbell Shoulder Press', category: 'Vai • Dumbbell', sets: 4, reps: 10, weight: 18, desc: 'Đẩy tạ đôi phát triển vai.' }
            ]
          },
          {
            id: 'm2_s2',
            sessionName: 'Buổi 7: Lưng Xô & Core',
            duration: 45,
            kcal: 410,
            completed: false,
            exercises: [
              { id: 3, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 4, reps: 12, weight: 0, desc: 'Kéo xà ngực chạm xà.' },
              { id: 5, name: 'Plank', category: 'Bụng • Core', sets: 4, reps: 60, weight: 0, isTimeBased: true, desc: 'Tăng sức bền core.' }
            ]
          },
          {
            id: 'm2_s3',
            sessionName: 'Buổi 8: Chân & Đùi sau',
            duration: 50,
            kcal: 490,
            completed: false,
            exercises: [
              { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 5, reps: 10, weight: 85, desc: 'Squat gánh tạ sâu.' }
            ]
          },
          {
            id: 'm2_s4',
            sessionName: 'Buổi 9: Vai & Ngực trên',
            duration: 40,
            kcal: 390,
            completed: false,
            exercises: [
              { id: 4, name: 'Dumbbell Shoulder Press', category: 'Vai • Dumbbell', sets: 4, reps: 12, weight: 18, desc: 'Tập trung cơ vai trước.' }
            ]
          },
          {
            id: 'm2_s5',
            sessionName: 'Buổi 10: Toàn thân Bứt tốc',
            duration: 55,
            kcal: 510,
            completed: false,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 10, weight: 65, desc: 'Đẩy ngực toàn lực.' },
              { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 4, reps: 10, weight: 85, desc: 'Squat bứt tốc.' }
            ]
          }
        ]
      },
      {
        weekNum: 3,
        title: 'Tuần 3: Đột phá sức mạnh',
        sessions: [
          {
            id: 'm3_s1',
            sessionName: 'Buổi 11: Ngực & Tay sau Max Out',
            duration: 50,
            kcal: 470,
            completed: false,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 5, reps: 8, weight: 70, desc: 'Đẩy tạ tối đa sức mạnh.' }
            ]
          },
          {
            id: 'm3_s2',
            sessionName: 'Buổi 12: Lưng & Tay trước Siết cơ',
            duration: 45,
            kcal: 420,
            completed: false,
            exercises: [
              { id: 3, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 5, reps: 10, weight: 0, desc: 'Kéo xà ngực nâng cao.' }
            ]
          }
        ]
      },
      {
        weekNum: 4,
        title: 'Tuần 4: Siết cơ & Hoàn thiện',
        sessions: [
          {
            id: 'm4_s1',
            sessionName: 'Buổi 16: Tổng lực Ngực & Vai',
            duration: 50,
            kcal: 480,
            completed: false,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 5, reps: 10, weight: 70, desc: 'Đẩy ngực hoàn thiện.' }
            ]
          }
        ]
      }
    ]
  },
  'shred_4weeks': {
    id: 'shred_4weeks',
    title: 'Siết mỡ nâng cao',
    subtitle: '4 buổi/tuần • 16 buổi tập tổng cộng',
    progress: 12,
    completedSessions: 2,
    totalSessions: 16,
    weeks: [
      {
        weekNum: 1,
        title: 'Tuần 1: Kích hoạt đốt calo',
        sessions: [
          {
            id: 's1_s1',
            sessionName: 'Buổi 1: Cardio & Ngực Đốt calo',
            duration: 40,
            kcal: 400,
            completed: true,
            exercises: [
              { id: 1, name: 'Bench Press', category: 'Ngực • Barbell', sets: 4, reps: 15, weight: 50, desc: 'Đẩy tạ ngực nhẹ hơn, rep nhiều để đốt calo.' }
            ]
          },
          {
            id: 's1_s2',
            sessionName: 'Buổi 2: Chân & HIIT bứt tốc',
            duration: 45,
            kcal: 460,
            completed: true,
            exercises: [
              { id: 2, name: 'Squats', category: 'Đùi • Barbell', sets: 4, reps: 15, weight: 60, desc: 'Squat tốc độ nhịp nhàng.' }
            ]
          },
          {
            id: 's1_s3',
            sessionName: 'Buổi 3: Lưng & Core Siết mỡ',
            duration: 40,
            kcal: 390,
            completed: false,
            isCurrent: true,
            exercises: [
              { id: 3, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 4, reps: 10, weight: 0, desc: 'Kéo xà đốt calo.' }
            ]
          }
        ]
      }
    ]
  }
};

export default function Workouts({ onWorkoutComplete, setViewParent }) {
  // Routing view state: 'hub', 'gym_hub', 'home_hub', 'program_sessions', 'details', 'player', 'summary'
  const [view, setViewInternal] = useState('hub');
  const [searchTerm, setSearchTerm] = useState('');

  const setView = (newView) => {
    setViewInternal(newView);
    if (setViewParent) {
      setViewParent(newView);
    }
  };
  
  // Program selection state
  const [selectedProgram, setSelectedProgram] = useState(mockPrograms['muscle_4weeks']);
  const [programPrevView, setProgramPrevView] = useState('gym_hub');
  const [selectedWeek, setSelectedWeek] = useState(2);

  // Routine & exercise selection states
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

  // Refs and helper for mouse drag-to-scroll horizontal containers on desktop
  const gymScrollRef = React.useRef(null);
  const homeScrollRef = React.useRef(null);

  const attachDragEvents = (ref) => {
    const onMouseDown = (e) => {
      ref.current.isDown = true;
      ref.current.startX = e.pageX - ref.current.offsetLeft;
      ref.current.scrollLeftStart = ref.current.scrollLeft;
    };
    const onMouseLeave = () => {
      ref.current.isDown = false;
    };
    const onMouseUp = () => {
      ref.current.isDown = false;
    };
    const onMouseMove = (e) => {
      if (!ref.current || !ref.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - ref.current.startX) * 1.5;
      ref.current.scrollLeft = ref.current.scrollLeftStart - walk;
    };
    return { onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
  };

  const gymDrag = attachDragEvents(gymScrollRef);
  const homeDrag = attachDragEvents(homeScrollRef);

  const [detailsPrevView, setDetailsPrevView] = useState('gym_hub');

  const openProgramSessions = (programId, fromView = 'gym_hub') => {
    const prog = mockPrograms[programId] || mockPrograms['muscle_4weeks'];
    setSelectedProgram(prog);
    setProgramPrevView(fromView);
    setSelectedWeek(2);
    setView('program_sessions');
  };

  const openRoutineDetails = (title, exercises, kcal, fromView = 'gym_hub') => {
    setSelectedRoutineTitle(title);
    setSelectedRoutineExercises(exercises);
    setSelectedRoutineKcal(kcal);
    setDetailsPrevView(fromView);
    setView('details');
  };

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

  const handleSkipExercise = () => {
    if (currentExIndex < selectedRoutineExercises.length - 1) {
      const nextIdx = currentExIndex + 1;
      setCurrentExIndex(nextIdx);
      setCurrentSet(1);
      setCurrentReps(selectedRoutineExercises[nextIdx].reps);
    } else {
      setView('summary');
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
            position: 'relative', height: '110px', borderRadius: '16px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '12px', cursor: 'pointer', color: '#ffffff', overflow: 'hidden'
          }}>
            <img src="/images/luyentaptainha/pexels-artempodrez-6951790.jpg" alt="Tai nha"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,23,42,0.35), rgba(15,23,42,0.8))', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="location-icon-wrapper" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <Zap size={14} color="#ffffff" fill="#ffffff" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', display: 'block' }}>Tại nhà</span>
              <span style={{ fontSize: '10px', opacity: 0.8 }}>120+ bài tập</span>
            </div>
          </div>

          {/* Gym Card */}
          <div className="location-card-figma flex-1" onClick={() => setView('gym_hub')} style={{
            position: 'relative', height: '110px', borderRadius: '16px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '12px', cursor: 'pointer', color: '#ffffff', overflow: 'hidden'
          }}>
            <img src="/images/taptaiphong/pexels-foadshariyati-30672398.jpg" alt="Phong gym"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,23,42,0.35), rgba(15,23,42,0.8))', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="location-icon-wrapper" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <Dumbbell size={14} color="#ffffff" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '800', display: 'block' }}>Tại phòng gym</span>
              <span style={{ fontSize: '10px', opacity: 0.8 }}>80+ chương trình</span>
            </div>
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
          position: 'relative', borderRadius: '20px', padding: '18px',
          color: '#ffffff', marginBottom: '16px', overflow: 'hidden'
        }}>
          <img src="/images/trangluyentap/pexels-julia-larson-6455895.jpg" alt="banner"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,86,198,0.92), rgba(15,23,42,0.85))', zIndex: 1 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <span style={{ background: '#10b981', color: '#ffffff', fontSize: '8px', fontWeight: '800', padding: '3px 8px', borderRadius: '99px' }}>MỚI</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '8px', fontWeight: '800', padding: '3px 8px', borderRadius: '99px' }}>CAO ĐỘ</span>
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: '850', margin: '0 0 6px 0', color: '#ffffff' }}>Toàn thân cấp tốc</h4>
          <p style={{ fontSize: '11px', opacity: 0.85, margin: '0 0 16px 0', lineHeight: '1.4', color: '#ffffff' }}>Đốt cháy calo tối đa với chuỗi bài tập HIIT cường độ cao phối hợp.</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={() => openRoutineDetails('Toàn thân cấp tốc', [
              { id: 1, name: 'Jumping Jacks', category: 'HIIT • Toàn thân', sets: 3, reps: 45, weight: 0, desc: 'Nhảy dang tay dang chân. Khởi động toàn thân, tăng nhịp tim nhanh chóng.' },
              { id: 2, name: 'Burpees', category: 'HIIT • Sức bền', sets: 3, reps: 15, weight: 0, desc: 'Kết hợp squat, plank và nhảy. Bài tập toàn thân đốt calo tối đa.' },
              { id: 3, name: 'Mountain Climbers', category: 'Bụng • Core', sets: 3, reps: 40, weight: 0, desc: 'Chạy tại chỗ ở tư thế plank. Tập trung vào core và sức bền tim mạch.' }
            ], 220, 'hub')} style={{ width: 'auto', padding: '8px 16px', fontSize: '13px', background: '#ffffff', color: '#0056c6', borderRadius: '12px', fontWeight: '800' }}>
              Bắt đầu ngay ➔
            </button>
          </div>
          </div>
          </div>
        {/* Mini recommendations list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Item 1 */}
          <div className="popular-workout-card figma-recommend-workout-card card" onClick={() => openRoutineDetails('Yoga Chào Buổi Sáng', [
            { id: 1, name: 'Tư thế chào mặt trời', category: 'Yoga • Linh hoạt', sets: 2, reps: 5, weight: 0, desc: 'Chuỗi động tác kéo giãn từ trên xuống dưới, kết hợp nhịp thở sâu.' },
            { id: 2, name: 'Tư thế chiến binh', category: 'Yoga • Cân bằng', sets: 3, reps: 8, weight: 0, desc: 'Tư thế đứng tăng cường cân bằng và sức mạnh chân.' }
          ], 110, 'hub')} style={{ cursor: 'pointer', padding: '12px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', border: '1.5px solid #e2e8f0' }}>
            <img src="/images/luyentaptainha/pexels-vi-nguyen-629176438-17572079.jpg" alt="Yoga" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '8px', color: '#d97706', fontWeight: '800' }}>PHỔ BIẾN</span>
              <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0 }}>Yoga Chào Buổi Sáng</h5>
              <span style={{ fontSize: '11px', color: '#64748b' }}>15 phút • Nhẹ</span>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </div>

          {/* Item 2 */}
          <div className="popular-workout-card figma-recommend-workout-card card" onClick={() => openRoutineDetails('Thử thách Cơ bụng', [
            { id: 1, name: 'Crunches', category: 'Bụng • Core', sets: 3, reps: 15, weight: 0, desc: 'Gập bụng cơ bản. Tập trung siết cơ bụng ở đỉnh của chuyển động.' },
            { id: 2, name: 'Leg Raises', category: 'Bụng • Core', sets: 3, reps: 12, weight: 0, desc: 'Nâng chân thẳng từ sàn lên 90 độ. Hiệu quả cho phần bụng dưới.' }
          ], 130, 'hub')} style={{ cursor: 'pointer', padding: '12px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', border: '1.5px solid #e2e8f0' }}>
            <img src="/images/trangluyentap/pexels-wolrider-17626053.jpg" alt="Abs" style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
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
        <div ref={gymScrollRef} className="horizontal-scroll-row" {...gymDrag} style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none', marginBottom: '16px', cursor: 'grab' }}>
          
          {/* Card 1: 4 weeks muscle routine */}
          <div className="gym-program-card card" onClick={() => openProgramSessions('muscle_4weeks', 'gym_hub')} style={{ minWidth: '220px', flex: 1, padding: '14px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
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
          <div className="gym-program-card card" onClick={() => openProgramSessions('shred_4weeks', 'gym_hub')} style={{ minWidth: '220px', flex: 1, padding: '14px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
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
            <button className="btn btn-primary" onClick={() => openRoutineDetails('Ngày đẩy tạ Chest & Triceps', mockExercises, 450, 'gym_hub')} style={{ width: 'auto', padding: '8px 20px', fontSize: '13px', borderRadius: '12px', fontWeight: '800' }}>
              Xem chi tiết
            </button>
          </div>
          <img src="/images/taptaiphong/pexels-bonaventure-fernandez-744363-13756380.jpg" alt="Chest" style={{ width: '76px', height: '76px', borderRadius: '16px', objectFit: 'cover' }} />
        </div>

        {/* Grid sub-categories */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div className="grid-cell-item card flex-1" onClick={() => openRoutineDetails('Chân & Mông', [
            { id: 1, name: 'Squats', category: 'Đùi • Barbell', sets: 5, reps: 10, weight: 80, desc: 'Bài tập squat nền tảng để phát triển cơ đùi và mông.' },
          ], 300, 'gym_hub')} style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Chân & Mông</span>
          </div>
          <div className="grid-cell-item card flex-1" onClick={() => openRoutineDetails('Lưng & Xô', [
            { id: 1, name: 'Pull-ups', category: 'Lưng • Bodyweight', sets: 4, reps: 10, weight: 0, desc: 'Kéo xà phát triển cơ lưng rộng và cơ xô toàn diện.' },
          ], 250, 'gym_hub')} style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Lưng & Xô</span>
          </div>
        </div>

        {/* Yoga Banner for Gymer */}
        <div className="yoga-gymer-card card" onClick={() => openRoutineDetails('Yoga cho Gymer', [
          { id: 1, name: 'Tư thế chào mặt trời', category: 'Yoga • Linh hoạt', sets: 2, reps: 5, weight: 0, desc: 'Chuỗi động tác phục hồi cơ bắp và tăng biên độ khớp.' },
        ], 100, 'gym_hub')} style={{
          background: 'linear-gradient(to right, rgba(15,23,42,0.88), rgba(15,23,42,0.5)), url("/images/trangluyentap/pexels-jean-daniel-19254708.jpg")',
          backgroundSize: 'cover', borderRadius: '16px', padding: '16px', color: '#ffffff', cursor: 'pointer'
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
        <div ref={homeScrollRef} className="horizontal-scroll-row" {...homeDrag} style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none', marginBottom: '16px', cursor: 'grab' }}>
          
          {/* Card 1: Warmup */}
          <div className="gym-program-card card" onClick={() => openRoutineDetails('Khởi động buổi sáng', [
            { id: 1, name: 'Khởi động khớp vai', category: 'Khởi động', sets: 2, reps: 30, weight: 0, desc: 'Xoay vai nhẹ nhàng để làm nóng khớp trước khi tập.' },
            { id: 2, name: 'Xoay hông', category: 'Khởi động', sets: 2, reps: 30, weight: 0, desc: 'Xoay hông để linh hoạt vùng lưng dưới và khớp háng.' }
          ], 80, 'home_hub')} style={{ minWidth: '180px', flex: 1, padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
            <span style={{ fontSize: '8px', fontWeight: '800', background: '#e8f0fe', color: '#0056c6', padding: '3px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '8px' }}>MỚI</span>
            <h4 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>Khởi động buổi sáng</h4>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '750' }}>15 phút • 300 XP</span>
          </div>

          {/* Card 2: Abs */}
          <div className="gym-program-card card" onClick={() => openRoutineDetails('Cơ bụng săn chắc', [
            { id: 1, name: 'Crunches', category: 'Bụng • Core', sets: 3, reps: 20, weight: 0, desc: 'Gập bụng cơ bản. Tập trung siết cơ bụng ở đỉnh của chuyển động.' },
            { id: 2, name: 'Plank', category: 'Bụng • Core', sets: 3, reps: 45, weight: 0, isTimeBased: true, desc: 'Giữ tư thế plank vững chắc, không để hông võng xuống.' }
          ], 120, 'home_hub')} style={{ minWidth: '180px', flex: 1, padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer', background: '#ffffff' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>Cơ bụng săn chắc</h4>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '750' }}>20 phút • 350 XP</span>
          </div>

        </div>

        {/* Section 2: Giãn cơ */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>Giãn cơ</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="grid-cell-item card flex-1" onClick={() => openRoutineDetails('Giãn cơ Toàn thân', [
            { id: 1, name: 'Tư thế chào mặt trời', category: 'Yoga • Linh hoạt', sets: 2, reps: 5, weight: 0, desc: 'Chuỗi động tác kéo giãn nhẹ nhàng.' }
          ], 60, 'home_hub')} style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Toàn thân</span>
          </div>
          <div className="grid-cell-item card flex-1" onClick={() => openRoutineDetails('Giãn cơ Cổ & Vai', [
            { id: 1, name: 'Khởi động khớp vai', category: 'Giãn cơ', sets: 2, reps: 20, weight: 0, desc: 'Giãn cơ nhẹ nhàng vùng cổ và vai.' }
          ], 40, 'home_hub')} style={{ background: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1.5px solid #e2e8f0', textAlign: 'center', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>Cổ & Vai</span>
          </div>
        </div>

        {/* Section 3: Sức mạnh */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>Sức mạnh</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          
          <div className="popular-workout-card card" onClick={() => openRoutineDetails('Thân dưới bùng nổ', [
            { id: 1, name: 'Lunges', category: 'Chân • Bodyweight', sets: 4, reps: 12, weight: 0, desc: 'Bước dài sang ngang, hạ gối gần sàn. Tập trung cơ đùi trước và mông.' },
            { id: 2, name: 'Glute Bridges', category: 'Mông • Bodyweight', sets: 3, reps: 15, weight: 0, desc: 'Nằm ngửa, nâng hông lên và siết mông tối đa.' }
          ], 150, 'home_hub')} style={{ cursor: 'pointer', padding: '12px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', border: '1.5px solid #e2e8f0', background: '#ffffff' }}>
            <img src="/images/luyentaptainha/pexels-felix-young-449360607-20038933.jpg" alt="Legs" style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0 }}>Thân dưới bùng nổ</h5>
              <span style={{ fontSize: '11px', color: '#64748b' }}>4 bài • 30 phút</span>
            </div>
            <ChevronRight size={20} color="#0056c6" />
          </div>

        </div>

        {/* Section 4: HIIT */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '14.5px', fontWeight: '850', color: '#0f172a', margin: '0 0 12px 0' }}>HIIT</h3>
        <div className="yoga-gymer-card card" onClick={() => openRoutineDetails('Đốt mỡ siêu tốc', [
          { id: 1, name: 'Burpees', category: 'HIIT', sets: 3, reps: 15, weight: 0, desc: 'Kết hợp squat, plank và nhảy. Bài tập toàn thân đốt calo tối đa.' },
          { id: 2, name: 'Jumping Jacks', category: 'HIIT', sets: 3, reps: 30, weight: 0, desc: 'Nhảy dang tay chân. Tăng nhịp tim và đốt calo hiệu quả.' }
        ], 260, 'home_hub')} style={{
          background: 'linear-gradient(to right, rgba(0, 86, 198, 0.88), rgba(15, 23, 42, 0.75)), url("/images/trangluyentap/pexels-iram-shehzad-45081404-37570727.jpg")',
          backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', padding: '16px', color: '#ffffff', cursor: 'pointer'
        }}>
          <span style={{ fontSize: '8px', fontWeight: '800', background: '#10b981', color: '#ffffff', padding: '3px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '8px' }}>CƯỜNG ĐỘ CAO</span>
          <h4 style={{ fontSize: '14.5px', fontWeight: '800', margin: '0 0 4px 0' }}>Đốt mỡ siêu tốc</h4>
          <p style={{ fontSize: '11px', opacity: 0.85, margin: 0 }}>Khó • 25 phút</p>
        </div>

      </div>
    );
  }

  // ================= VIEW 3.5: PROGRAM SESSIONS LIST (Lộ trình -> Buổi tập) =================
  if (view === 'program_sessions') {
    const currentWeekObj = selectedProgram.weeks.find(w => w.weekNum === selectedWeek) || selectedProgram.weeks[0];

    return (
      <div className="workouts-page-v2 program-sessions-view fade-in" style={{ padding: '12px', paddingBottom: '80px' }}>
        
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button className="back-btn-icon" onClick={() => setView(programPrevView)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: '850', margin: 0 }}>Chi tiết lộ trình</h2>
        </div>

        {/* Program Hero Banner */}
        <div className="program-hero-banner card" style={{
          background: 'linear-gradient(135deg, #0056c6 0%, #1e40af 100%)',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '18px',
          marginBottom: '18px',
          boxShadow: '0 8px 20px rgba(0,86,198,0.2)'
        }}>
          <span style={{ fontSize: '9px', fontWeight: '800', background: 'rgba(255,255,255,0.2)', color: '#ffffff', padding: '3px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '8px' }}>
            CHƯƠNG TRÌNH PRO
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 4px 0', color: '#ffffff' }}>{selectedProgram.title}</h3>
          <p style={{ fontSize: '11.5px', opacity: 0.9, margin: '0 0 14px 0', color: '#ffffff' }}>{selectedProgram.subtitle}</p>

          {/* Progress bar */}
          <div style={{ background: 'rgba(255,255,255,0.2)', height: '6px', borderRadius: '99px', overflow: 'hidden', marginBottom: '6px' }}>
            <div style={{ width: `${selectedProgram.progress}%`, height: '100%', background: '#10b981', borderRadius: '99px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: '750', color: '#ffffff', opacity: 0.95 }}>
            <span>Tiến độ: {selectedProgram.progress}%</span>
            <span>{selectedProgram.completedSessions}/{selectedProgram.totalSessions} buổi hoàn thành</span>
          </div>
        </div>

        {/* Week Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '16px', scrollbarWidth: 'none' }}>
          {selectedProgram.weeks.map((w) => (
            <button
              key={w.weekNum}
              onClick={() => setSelectedWeek(w.weekNum)}
              style={{
                padding: '8px 16px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: '800',
                border: '1.5px solid',
                borderColor: selectedWeek === w.weekNum ? '#0056c6' : '#e2e8f0',
                background: selectedWeek === w.weekNum ? '#ebf3ff' : '#ffffff',
                color: selectedWeek === w.weekNum ? '#0056c6' : '#64748b',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Tuần {w.weekNum}
            </button>
          ))}
        </div>

        {/* Week Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '850', color: '#0f172a', margin: 0 }}>
            {currentWeekObj.title}
          </h4>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>{currentWeekObj.sessions.length} buổi</span>
        </div>

        {/* List of Buổi tập (Workout Sessions) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentWeekObj.sessions.map((session, idx) => (
            <div
              key={session.id}
              className="session-card card"
              onClick={() => openRoutineDetails(session.sessionName, session.exercises, session.kcal, 'program_sessions')}
              style={{
                padding: '14px',
                borderRadius: '16px',
                border: session.isCurrent ? '2px solid #0056c6' : '1.5px solid #e2e8f0',
                background: session.isCurrent ? '#f8faff' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: session.completed ? '#d1fae5' : session.isCurrent ? '#ebf3ff' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                flexShrink: 0
              }}>
                {session.completed ? (
                  <CheckCircle2 size={20} color="#10b981" />
                ) : session.isCurrent ? (
                  <Flame size={20} color="#0056c6" fill="#0056c6" />
                ) : (
                  <span style={{ fontSize: '13px', fontWeight: '850', color: '#94a3b8' }}>{idx + 1}</span>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h5 style={{ fontSize: '13.5px', fontWeight: '850', margin: '0 0 2px 0', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {session.sessionName}
                </h5>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '750', marginBottom: '2px', whiteSpace: 'nowrap' }}>
                  <span>{session.duration} phút</span>
                  <span> • </span>
                  <span>{session.exercises.length} bài tập</span>
                  <span> • </span>
                  <span>{session.kcal} kcal</span>
                </div>
                <div style={{ fontSize: '10.5px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Bài: {session.exercises.map(e => e.name).join(', ')}
                </div>
              </div>

              <div style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                {session.completed ? (
                  <span style={{ fontSize: '11px', fontWeight: '800', background: '#d1fae5', color: '#047857', padding: '5px 10px', borderRadius: '99px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Đã tập <CheckCircle2 size={13} color="#047857" />
                  </span>
                ) : session.isCurrent ? (
                  <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '11.5px', borderRadius: '10px', fontWeight: '800', whiteSpace: 'nowrap' }}>
                    Tập ngay ➔
                  </button>
                ) : (
                  <ChevronRight size={18} color="#94a3b8" />
                )}
              </div>
            </div>
          ))}
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
          <button className="back-btn-icon" onClick={() => setView(detailsPrevView)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <span className="step-indicator-text" style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Chi tiết lịch tập</span>
          <div style={{ width: 28 }}></div>
        </div>

        {/* Large banner image info */}
        <div className="routine-banner-image" style={{
          position: 'relative', height: '180px', color: '#ffffff',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '16px', marginBottom: '20px', overflow: 'hidden', borderRadius: '0'
        }}>
          <img src="/images/taptaiphong/pexels-gumbatov-29027903.jpg" alt="banner"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.85))', zIndex: 1 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 6px 0', color: '#ffffff' }}>{selectedRoutineTitle}</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', opacity: 0.9, color: '#ffffff' }}>
              <span>60 phút</span>
              <span>•</span>
              <span>{selectedRoutineKcal} kcal</span>
              <span>•</span>
              <span style={{ color: '#fbbf24', fontWeight: '800' }}>★ Trung bình</span>
            </div>
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
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ebf3ff', color: '#0056c6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>
                  {idx + 1}
                </div>
                {/* Show local exercise image if available */}
                {exerciseImageMap[ex.name] && (
                  <img src={exerciseImageMap[ex.name]} alt={ex.name} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h5 style={{ fontSize: '13.5px', fontWeight: '800', margin: 0, color: '#0f172a' }}>{ex.name}</h5>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {ex.isTimeBased ? `${ex.reps} giây` : `${ex.reps} reps`} x {ex.sets} sets {ex.weight > 0 ? `• ${ex.weight} kg` : ''}
                  </span>
                </div>
                <PlayCircle size={20} color="#0056c6" style={{ flexShrink: 0 }} />
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
    const exerciseImg = exerciseImageMap[currentEx.name];
    const isLastSet = currentSet === currentEx.sets;
    const isLastExercise = currentExIndex === selectedRoutineExercises.length - 1;

    return (
      <div className="workouts-page-v2 player-view fade-in">
        
        {/* Header */}
        <div className="onboarding-header-nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px 20px', boxSizing: 'border-box' }}>
          <button className="back-btn-icon" onClick={() => setView('details')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <span className="step-indicator-text" style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Theo dõi bài tập</span>
          <button onClick={handleSkipExercise} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '11px', fontWeight: '800' }}>
            <span>Bỏ qua</span>
            <SkipForward size={14} />
          </button>
        </div>

        {/* Exercise progress indicator */}
        <div style={{ padding: '4px 16px 0' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {selectedRoutineExercises.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: '3px', borderRadius: '99px',
                background: i < currentExIndex ? '#0056c6' : i === currentExIndex ? '#0056c6' : '#e2e8f0',
                opacity: i === currentExIndex ? 1 : i < currentExIndex ? 0.6 : 0.3
              }} />
            ))}
          </div>
          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '700', marginTop: '4px', display: 'block' }}>
            Bài {currentExIndex + 1}/{selectedRoutineExercises.length}
          </span>
        </div>

        {/* Workout exercise content */}
        <div style={{ padding: '8px 16px', marginTop: '4px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 2px 0', color: '#0f172a' }}>{currentEx.name}</h3>
          <span style={{ fontSize: '11px', color: '#0056c6', fontWeight: '800', background: '#ebf3ff', padding: '2px 8px', borderRadius: '99px', display: 'inline-block', marginBottom: '12px' }}>{currentEx.category}</span>

          {/* Exercise Image or Placeholder */}
          <div className="exercise-media-placeholder" style={{
            height: '160px', borderRadius: '20px', overflow: 'hidden', marginBottom: '14px', position: 'relative',
            background: exerciseImg ? 'transparent' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {exerciseImg ? (
              <img src={exerciseImg} alt={currentEx.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <PlayCircle size={44} color="#ffffff" style={{ opacity: 0.8 }} />
                <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '8px', fontSize: '9.5px', fontWeight: '800', color: '#fff' }}>HƯỚNG DẪN</span>
              </>
            )}
          </div>

          {/* Exercise description */}
          {currentEx.desc && (
            <p style={{ fontSize: '11.5px', color: '#64748b', lineHeight: '1.5', margin: '0 0 14px 0', background: '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              💡 {currentEx.desc}
            </p>
          )}

          {/* Sets and Weights metrics row */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <div className="metric-box flex-1" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '800', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Hiệp</span>
              <strong style={{ fontSize: '18px', fontWeight: '900', color: '#0056c6' }}>{currentSet} / {currentEx.sets}</strong>
            </div>

            <div className="metric-box flex-1" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '800', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Trọng lượng</span>
              <strong style={{ fontSize: '18px', fontWeight: '900', color: '#0056c6' }}>{currentEx.weight > 0 ? `${currentEx.weight} kg` : 'Bodyweight'}</strong>
            </div>
          </div>

          {/* Reps Counter Interactive Dial */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>
              {currentEx.isTimeBased ? 'Giây (Seconds)' : 'Số lần lặp (Reps)'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button id="reps-decrease-btn" onClick={() => setCurrentReps(Math.max(0, currentReps - 1))} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ebf3ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0056c6' }}>
                <Minus size={18} />
              </button>
              
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #0056c6', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', boxShadow: '0 4px 12px rgba(0, 86, 198, 0.15)' }}>
                <strong style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a' }}>{currentReps}</strong>
              </div>

              <button id="reps-increase-btn" onClick={() => setCurrentReps(currentReps + 1)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ebf3ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0056c6' }}>
                <Plus size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom controls */}
        <div className="onboarding-actions-static" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: '#ffffff', borderTop: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 100 }}>
          <button id="complete-set-btn" className="btn btn-primary w-full" onClick={handleNextSet}>
            {isLastSet && isLastExercise ? '🏆 Hoàn thành buổi tập' : isLastSet ? '➔ Bài tiếp theo' : '✓ Xong hiệp này'}
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
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
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

          {/* XP gained */}
          <div className="metric-box flex-1 card" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '4px' }}>XP ĐẠT ĐƯỢC</span>
            <strong style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>+150</strong>
            <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '2px' }}>XP</span>
          </div>

        </div>

        {/* Records Badge achievements row */}
        <h4 className="figma-section-heading" style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>THÀNH TÍCH ĐẠT ĐƯỢC</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          
          {/* Achievement 1 */}
          <div className="popular-workout-card card" style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', alignItems: 'center', background: '#ffffff' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              🏆
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Kỷ lục mới</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Bài tập Bench Press đạt 60kg x 12 reps</span>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="popular-workout-card card" style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '16px', border: '1.5px solid #e2e8f0', alignItems: 'center', background: '#ffffff' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              🔥
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>Chuỗi ngày tập</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Duy trì streak 5 ngày liên tiếp</span>
            </div>
          </div>

        </div>

        {/* Star feedback rating box */}
        <div className="star-rating-box card" style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '20px', textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '10px' }}>Đánh giá buổi tập của bạn</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                id={`star-rating-${star}`}
                onClick={() => setUserRating(star)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Star
                  size={28}
                  color="#fbbf24"
                  fill={star <= userRating ? '#fbbf24' : 'transparent'}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Finish exit button */}
        <button id="finish-workout-btn" className="btn btn-primary w-full" onClick={handleFinishWorkout}>
          🏠 Về trang chủ
        </button>

      </div>
    );
  }

  return null;
}

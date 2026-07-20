import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const activityOptions = ['Chưa tập', '1-2 ngày', '3-4 ngày', '5+ ngày'];
const workoutDurationOptions = ['15 phút', '30 phút', '45 phút', '60+ phút'];
const improvementAreaOptions = ['Bụng', 'Tay', 'Ngực', 'Vai', 'Chân', 'Toàn thân'];
const injuryHistoryOptions = ['Đầu gối', 'Vai', 'Lưng', 'Cổ tay'];

function ChoiceGroup({ options, value, onChange }) {
  return (
    <div className="gender-toggle-row personal-choice-grid">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`gender-btn ${value === option ? 'active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function MultiChoiceGroup({ options, values, onChange }) {
  const toggleOption = (option) => {
    if (values.includes(option)) {
      onChange(values.filter((item) => item !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="gender-toggle-row personal-choice-grid">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`gender-btn ${values.includes(option) ? 'active' : ''}`}
          onClick={() => toggleOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function PersonalInfo({ stats = {}, onSave, onBack }) {
  const [gender, setGender] = useState(stats.gender || 'Nam');
  const [age, setAge] = useState(stats.age || 25);
  const [height, setHeight] = useState(stats.height || 175);
  const [weight, setWeight] = useState(stats.weight || 70);
  
  const [chest, setChest] = useState(stats.chest || 90);
  const [waist, setWaist] = useState(stats.waist || 70);
  const [hips, setHips] = useState(stats.hips || 95);
  
  const [bmi, setBmi] = useState(stats.bmi || 22.9);
  const [restingHeartRate, setRestingHeartRate] = useState(stats.restingHeartRate || 70);
  const [improvementAreas, setImprovementAreas] = useState(stats.improvementAreas || ['Bụng']);
  const [injuryHistory, setInjuryHistory] = useState(stats.injuryHistory || []);

  // Newly requested inputs
  const [activityLevel, setActivityLevel] = useState(stats.activityLevel || '3-4 ngày');
  const [workoutDuration, setWorkoutDuration] = useState(stats.workoutDuration || '30 phút');
  const [goal, setGoal] = useState(stats.goal || 'Tăng cơ');
  const [workoutLocation, setWorkoutLocation] = useState(stats.workoutLocation || 'Phòng gym');

  const calculateBmi = (w, h) => {
    if (w && h) {
      const hMeter = h / 100;
      return (w / (hMeter * hMeter)).toFixed(1);
    }
    return bmi;
  };

  const handleWeightChange = (val) => {
    setWeight(val);
    setBmi(calculateBmi(val, height));
  };

  const handleHeightChange = (val) => {
    setHeight(val);
    setBmi(calculateBmi(weight, val));
  };

  const handleNext = () => {
    onSave({
      gender, age, height, weight,
      chest, waist, hips,
      bmi, restingHeartRate, improvementAreas, injuryHistory,
      activityLevel, workoutDuration, goal, workoutLocation
    });
  };

  return (
    <div className="personal-info-screen onboarding-screen fade-in">
      {/* Header */}
      <div className="pricing-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px 20px', boxSizing: 'border-box' }}>
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span className="step-indicator-text" style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em' }}>BƯỚC 4/5</span>
          <div className="figma-dots-indicator" style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
            <span style={{ width: '16px', height: '6px', borderRadius: '99px', background: '#0056c6' }}></span>
            <span style={{ width: '6px', height: '6px', borderRadius: '99px', background: '#cbd5e1' }}></span>
          </div>
        </div>
        <div style={{ width: 28 }}></div>
      </div>

      {/* Intro */}
      <div className="figma-schedule-intro">
        <h2 className="figma-schedule-title">Thông tin cá nhân</h2>
        <p className="figma-schedule-sub">
          Để AI Coach tính toán lộ trình chính xác nhất, hãy cho chúng tôi biết về bạn.
        </p>
      </div>

      {/* Main Stats Block */}
      <div className="personal-stats-container">
        
        {/* Gender Selection */}
        <div className="stat-input-group">
          <label className="stat-input-label">Giới tính</label>
          <div className="gender-toggle-row">
            {['Nam', 'Nữ', 'Khác'].map((g) => (
              <button
                key={g}
                type="button"
                className={`gender-btn ${gender === g ? 'active' : ''}`}
                onClick={() => setGender(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Age Field */}
        <div className="stat-input-group">
          <label className="stat-input-label">Tuổi</label>
          <input
            type="number"
            className="stat-number-input"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        {/* Height and Weight */}
        <div className="stat-double-row">
          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Chiều cao</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
              />
              <span className="input-unit-label">cm</span>
            </div>
          </div>

          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Cânnặng</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={weight}
                onChange={(e) => handleWeightChange(Number(e.target.value))}
              />
              <span className="input-unit-label">kg</span>
            </div>
          </div>
        </div>

        <hr className="stats-divider" style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

        {/* Advanced Metrics */}
        <h3 className="section-title-sm-bold" style={{ fontSize: '15px', fontWeight: '850', color: '#0f172a', margin: '0 0 16px 0' }}>Chỉ số chuyên sâu</h3>

        {/* 3-measurements */}
        <div className="stat-input-group">
          <label className="stat-input-label">Số đo 3 vòng (Ngực - Eo - Mông)</label>
          <div className="triple-input-row" style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              placeholder="Ngực"
              className="stat-number-input flex-1 text-center"
              value={chest}
              onChange={(e) => setChest(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Eo"
              className="stat-number-input flex-1 text-center"
              value={waist}
              onChange={(e) => setWaist(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Mông"
              className="stat-number-input flex-1 text-center"
              value={hips}
              onChange={(e) => setHips(Number(e.target.value))}
            />
          </div>
        </div>

        {/* BMI and Resting Heart Rate */}
        <div className="stat-double-row">
          <div className="stat-input-group flex-1">
            <label className="stat-input-label">BMI <span style={{ fontSize: '8px', color: '#64748B', fontWeight: 'normal' }}>*tự động tính</span></label>
            <input
              type="number"
              className="stat-number-input disabled"
              value={bmi}
              disabled
            />
          </div>

          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Nhịp tim nghỉ ngơi</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={restingHeartRate}
                onChange={(e) => setRestingHeartRate(Number(e.target.value))}
              />
              <span className="input-unit-label">bpm</span>
            </div>
          </div>
        </div>

        {/* Vùng cần cải thiện */}
        <div className="stat-input-group">
          <label className="stat-input-label">Vùng cần cải thiện</label>
          <MultiChoiceGroup
            options={improvementAreaOptions}
            values={improvementAreas}
            onChange={setImprovementAreas}
          />
        </div>

        {/* Tiền sử chấn thương */}
        <div className="stat-input-group">
          <label className="stat-input-label">Tiền sử chấn thương</label>
          <MultiChoiceGroup
            options={injuryHistoryOptions}
            values={injuryHistory}
            onChange={setInjuryHistory}
          />
        </div>

        {/* Mức độ vận động hiện tại */}
        <div className="stat-input-group">
          <label className="stat-input-label">Mức độ vận động hiện tại</label>
          <span className="stat-helper-text">Bạn tập bao nhiêu ngày/tuần?</span>
          <ChoiceGroup options={activityOptions} value={activityLevel} onChange={setActivityLevel} />
        </div>

        {/* Mục tiêu cá nhân */}
        <div className="stat-input-group">
          <label className="stat-input-label">Mục tiêu cá nhân</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="stat-number-input"
            style={{ width: '100%', height: '44px', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', outline: 'none' }}
          >
            <option value="Giảm cân">Giảm cân</option>
            <option value="Tăng cơ">Tăng cơ</option>
            <option value="Giữ dáng">Giữ dáng</option>
            <option value="Tăng sức bền">Tăng sức bền</option>
            <option value="Duy trì kỷ luật">Duy trì kỷ luật</option>
          </select>
        </div>

        {/* Nơi tập chính */}
        <div className="stat-input-group">
          <label className="stat-input-label">Nơi tập chính</label>
          <select
            value={workoutLocation}
            onChange={(e) => setWorkoutLocation(e.target.value)}
            className="stat-number-input"
            style={{ width: '100%', height: '44px', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', outline: 'none' }}
          >
            <option value="Tại nhà">Tại nhà</option>
            <option value="Phòng gym">Phòng gym</option>
            <option value="Ngoài trời">Ngoài trời</option>
            <option value="Kết hợp">Kết hợp</option>
          </select>
        </div>

        {/* Thời gian có thể tập */}
        <div className="stat-input-group">
          <label className="stat-input-label">Thời gian có thể tập</label>
          <ChoiceGroup options={workoutDurationOptions} value={workoutDuration} onChange={setWorkoutDuration} />
        </div>

      </div>

      {/* Button */}
      <div className="onboarding-actions-static" style={{ marginTop: '24px' }}>
        <button className="btn btn-primary w-full" onClick={handleNext}>
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}

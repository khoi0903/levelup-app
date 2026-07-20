import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

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
  const [bodyFat, setBodyFat] = useState(stats.bodyFat || 15);
  const [musclePercent, setMusclePercent] = useState(stats.musclePercent || 45);
  const [sleepHours, setSleepHours] = useState(stats.sleepHours || 8);
  const [waterIntake, setWaterIntake] = useState(stats.waterIntake || 2000);

  // Newly requested inputs
  const [activityLevel, setActivityLevel] = useState(stats.activityLevel || 'Trung bình');
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
      bmi, restingHeartRate, bodyFat, musclePercent,
      sleepHours, waterIntake,
      activityLevel, goal, workoutLocation
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

        {/* Fat % and Muscle % */}
        <div className="stat-double-row">
          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Phần trăm mỡ</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={bodyFat}
                onChange={(e) => setBodyFat(Number(e.target.value))}
              />
              <span className="input-unit-label">%</span>
            </div>
          </div>

          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Phần trăm cơ</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={musclePercent}
                onChange={(e) => setMusclePercent(Number(e.target.value))}
              />
              <span className="input-unit-label">%</span>
            </div>
          </div>
        </div>

        {/* Mức độ hoạt động */}
        <div className="stat-input-group">
          <label className="stat-input-label">Mức độ hoạt động</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="stat-number-input"
            style={{ width: '100%', height: '44px', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', cursor: 'pointer', outline: 'none' }}
          >
            <option value="Ít vận động">Ít vận động</option>
            <option value="Vận động nhẹ">Vận động nhẹ</option>
            <option value="Trung bình">Trung bình (Bình thường)</option>
            <option value="Năng động">Năng động</option>
            <option value="Rất năng động">Rất năng động</option>
          </select>
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

        {/* Sleep Hours and Water Intake */}
        <div className="stat-double-row">
          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Thời gian ngủ</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
              />
              <span className="input-unit-label">giờ</span>
            </div>
          </div>

          <div className="stat-input-group flex-1">
            <label className="stat-input-label">Lượng nước</label>
            <div className="input-with-unit-box">
              <input
                type="number"
                className="stat-number-input inline-input"
                value={waterIntake}
                onChange={(e) => setWaterIntake(Number(e.target.value))}
              />
              <span className="input-unit-label">ml</span>
            </div>
          </div>
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

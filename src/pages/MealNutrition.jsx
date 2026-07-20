import { useMemo, useState } from 'react';
import {
  AlertCircle,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Dumbbell,
  Flame,
  HeartPulse,
  ImagePlus,
  Loader2,
  Salad,
  Sparkles,
  Utensils,
} from 'lucide-react';

const defaultWorkoutContext = [
  { name: 'HIIT buổi sáng', focus: 'đốt mỡ', duration: 20, kcal: 220, intensity: 'Cao' },
  { name: 'Sức mạnh thân trên', focus: 'tăng cơ', duration: 35, kcal: 320, intensity: 'Trung bình' },
  { name: 'Yoga thư giãn', focus: 'phục hồi', duration: 30, kcal: 110, intensity: 'Nhẹ' },
];

const sampleAnalysis = {
  mealName: 'Cơm gà áp chảo, rau xanh và trứng',
  calories: 620,
  protein: 42,
  carbs: 68,
  fat: 18,
  fiber: 7,
  hydration: 'Uống thêm 400-600ml nước trong 2 giờ tới.',
  coachAdvice:
    'Bữa này hợp với mục tiêu tăng cơ vì protein khá tốt. Nếu hôm nay tập HIIT, hãy thêm một phần trái cây hoặc khoai lang nhỏ trước tập 60-90 phút để có năng lượng ổn định.',
  workoutMatch: 'Phù hợp nhất với Sức mạnh thân trên. Tránh tập quá nặng ngay sau ăn, chờ 90 phút.',
  healthWarnings: ['Natri có thể hơi cao nếu phần gà được ướp mặn.', 'Tăng thêm rau nếu bạn đang thiếu chất xơ trong ngày.'],
};

const macroColors = {
  protein: '#0056C6',
  carbs: '#F59E0B',
  fat: '#8B5CF6',
};

function getGeminiKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'YOUR_GEMINI_API_KEY_HERE') return envKey;
  return (
    localStorage.getItem('gemini_api_key') ||
    localStorage.getItem('geminiApiKey') ||
    localStorage.getItem('google_gemini_api_key') ||
    localStorage.getItem('apiKey') ||
    sessionStorage.getItem('gemini_api_key') ||
    ''
  );
}

function getBackupGeminiKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY_BACKUP;
  if (envKey && envKey !== 'YOUR_GEMINI_API_KEY_BACKUP_HERE') return envKey;
  return localStorage.getItem('gemini_api_key_backup') || sessionStorage.getItem('gemini_api_key_backup') || '';
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

async function analyzeWithGemini(key, imageBase64, mimeType, personalStats, userGoal) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Phân tích ảnh bữa ăn cho app fitness LevelUp.

Thông tin người dùng:
- Mục tiêu: ${userGoal || personalStats.goal || 'Tăng cơ'}
- Giới tính: ${personalStats.gender || 'Nam'}
- Tuổi: ${personalStats.age || 25}
- Chiều cao: ${personalStats.height || 175}cm
- Cân nặng: ${personalStats.weight || 70}kg
- BMI: ${personalStats.bmi || 22.9}
- Nhịp tim nghỉ: ${personalStats.restingHeartRate || 70} bpm
- Vùng cần cải thiện: ${(personalStats.improvementAreas || ['Bụng']).join(', ')}
- Tiền sử chấn thương: ${(personalStats.injuryHistory || []).length ? personalStats.injuryHistory.join(', ') : 'Không có'}
- Mức độ vận động hiện tại: ${personalStats.activityLevel || '3-4 ngày'} tập/tuần
- Thời gian có thể tập: ${personalStats.workoutDuration || '30 phút'}
- Nơi tập: ${personalStats.workoutLocation || 'Phòng gym'}

Dữ liệu bài tập có trong app:
${defaultWorkoutContext.map((item) => `- ${item.name}: ${item.duration} phút, ${item.kcal} kcal, cường độ ${item.intensity}, mục tiêu ${item.focus}`).join('\n')}

Hãy nhận diện món ăn, ước tính dinh dưỡng, match với sức khỏe và bài tập. Trả về duy nhất JSON hợp lệ:
{
  "mealName": "string",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "fiber": number,
  "hydration": "string",
  "coachAdvice": "string dưới 90 từ, giọng coach fitness cá nhân",
  "workoutMatch": "string",
  "healthWarnings": ["string"]
}`,
              },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
        generation_config: {
          temperature: 0.35,
          response_mime_type: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `Lỗi API (${response.status})`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return extractJson(rawText);
}

export default function MealNutrition({ userName = 'Tâm', personalStats = {}, userGoal = 'Tăng cơ', setActivePage }) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [analysisSource, setAnalysisSource] = useState('');

  const dailyTarget = useMemo(() => {
    const base = personalStats.gender === 'Nữ' ? 1900 : 2200;
    const goalAdjust = (userGoal || personalStats.goal) === 'Giảm cân' ? -300 : 250;
    return Math.max(1500, base + goalAdjust);
  }, [personalStats.gender, personalStats.goal, userGoal]);

  const macroTotal = analysis ? analysis.protein + analysis.carbs + analysis.fat : 0;
  const mealPercent = analysis ? Math.min(100, Math.round((analysis.calories / dailyTarget) * 100)) : 0;

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysis(null);
    setAnalysisSource('');
    setError('');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Hãy chụp hoặc chọn ảnh bữa ăn trước khi phân tích.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    const primaryKey = getGeminiKey();
    const backupKey = getBackupGeminiKey();

    try {
      if (!primaryKey && !backupKey) {
        setAnalysis(null);
        setAnalysisSource('');
        setError('Chưa tìm thấy Gemini API key. Hãy set VITE_GEMINI_API_KEY trong .env hoặc lưu key vào localStorage với tên gemini_api_key.');
        return;
      }

      const imageBase64 = await fileToBase64(selectedFile);
      const keys = [primaryKey, backupKey].filter(Boolean);
      let result = null;
      let lastError = null;

      for (const key of keys) {
        try {
          result = await analyzeWithGemini(key, imageBase64, selectedFile.type || 'image/jpeg', personalStats, userGoal);
          if (result) break;
        } catch (err) {
          lastError = err;
        }
      }

      if (!result) {
        throw lastError || new Error('AI chưa trả về định dạng phân tích hợp lệ.');
      }

      setAnalysis({
        ...sampleAnalysis,
        ...result,
        healthWarnings: Array.isArray(result.healthWarnings) ? result.healthWarnings : sampleAnalysis.healthWarnings,
      });
      setAnalysisSource('Gemini 2.5 Flash');
    } catch (err) {
      console.error(err);
      setAnalysis(null);
      setAnalysisSource('');
      setError(`Không gọi được Gemini API: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetMeal = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setAnalysis(null);
    setAnalysisSource('');
    setError('');
  };

  return (
    <div className="meal-nutrition-page fade-in">
      <div className="meal-hero-card card">
        <div className="meal-brand-row">
          <span className="profile-brand-title">LevelUp</span>
          <button className="meal-link-btn" onClick={() => setActivePage('coach')}>
            AI Coach
          </button>
        </div>

        <div className="meal-hero-copy">
          <div className="meal-hero-icon">
            <Utensils size={22} color="#ffffff" />
          </div>
          <div>
            <span className="meal-eyebrow">AI Nutrition Coach</span>
            <h2>Chụp bữa ăn, nhận lời khuyên tập luyện</h2>
            <p>
              LevelUp phân tích món ăn, ước tính macro và match với mục tiêu, sức khỏe, bài tập hôm nay của {userName}.
            </p>
          </div>
        </div>
      </div>

      <div className="meal-upload-card card">
        <label className={`meal-photo-dropzone ${previewUrl ? 'has-preview' : ''}`}>
          {previewUrl ? (
            <img src={previewUrl} alt="Bữa ăn đã chọn" className="meal-photo-preview" />
          ) : (
            <div className="meal-dropzone-empty">
              <div className="meal-camera-circle">
                <Camera size={24} />
              </div>
              <strong>Chụp ảnh bữa ăn</strong>
              <span>Hoặc chọn ảnh từ thư viện</span>
            </div>
          )}
          <input type="file" accept="image/*" capture="environment" onChange={handleImageChange} />
        </label>

        <div className="meal-action-row">
          <button className="btn btn-primary meal-analyze-btn" onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? <Loader2 className="meal-spinner" size={16} /> : <BrainCircuit size={16} />}
            {isAnalyzing ? 'Đang phân tích...' : 'Phân tích bằng AI'}
          </button>
          <button className="meal-icon-btn" onClick={resetMeal} aria-label="Làm lại">
            <ImagePlus size={18} />
          </button>
        </div>

        {error && (
          <div className="meal-error-note">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="meal-context-grid">
        <div className="meal-context-card card">
          <HeartPulse size={17} color="#EF4444" />
          <span>Sức khỏe</span>
          <strong>BMI {personalStats.bmi || 22.9}</strong>
        </div>
        <div className="meal-context-card card">
          <Dumbbell size={17} color="#0056C6" />
          <span>Mục tiêu</span>
          <strong>{userGoal || personalStats.goal || 'Tăng cơ'}</strong>
        </div>
        <div className="meal-context-card card">
          <Flame size={17} color="#FA5A15" />
          <span>Ngân sách kcal</span>
          <strong>{dailyTarget}</strong>
        </div>
      </div>

      {analysis ? (
        <div className="meal-analysis-stack fade-in">
          <div className="meal-result-card card">
            <div className="meal-result-header">
              <div>
                <span className="meal-eyebrow">Kết quả nhận diện</span>
                <h3>{analysis.mealName}</h3>
                {analysisSource && <small className="meal-source-pill">Phân tích bằng {analysisSource}</small>}
              </div>
              <div
                className="meal-score-ring"
                style={{ background: `conic-gradient(#10b981 0 ${mealPercent}%, #e2e8f0 ${mealPercent}% 100%)` }}
              >
                <span>{mealPercent}%</span>
                <small>kcal ngày</small>
              </div>
            </div>

            <div className="meal-calorie-row">
              <span>{analysis.calories}</span>
              <small>kcal ước tính</small>
            </div>

            <div className="meal-macro-list">
              {[
                ['protein', 'Protein', analysis.protein],
                ['carbs', 'Carb', analysis.carbs],
                ['fat', 'Fat', analysis.fat],
              ].map(([key, label, value]) => (
                <div key={key} className="meal-macro-item">
                  <div className="meal-macro-top">
                    <span>{label}</span>
                    <strong>{value}g</strong>
                  </div>
                  <div className="meal-macro-track">
                    <div
                      className="meal-macro-fill"
                      style={{
                        width: `${macroTotal ? Math.round((value / macroTotal) * 100) : 0}%`,
                        background: macroColors[key],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="meal-coach-card card">
            <div className="meal-coach-header">
              <div className="coach-avatar-large meal-mini-avatar">
                <Sparkles size={18} color="#ffffff" />
              </div>
              <div>
                <h3>Coach Aura khuyên</h3>
                <span>Dựa trên ảnh, hồ sơ sức khỏe và data bài tập</span>
              </div>
            </div>
            <p>{analysis.coachAdvice}</p>
          </div>

          <div className="meal-recommend-card card">
            <div className="meal-recommend-title">
              <CheckCircle2 size={17} color="#10B981" />
              <h3>Match với lịch tập</h3>
            </div>
            <p>{analysis.workoutMatch}</p>
            <div className="meal-hydration-pill">{analysis.hydration}</div>
          </div>

          <div className="meal-warning-list">
            {analysis.healthWarnings.map((warning, index) => (
              <div key={`${warning}-${index}`} className="meal-warning-item card">
                <Salad size={16} color="#10B981" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="meal-empty-card card">
          <BrainCircuit size={22} color="#0056C6" />
          <h3>AI sẽ phân tích sau khi có ảnh</h3>
          <p>Ảnh càng rõ phần ăn, ánh sáng càng tốt thì ước tính calo và macro càng sát.</p>
        </div>
      )}
    </div>
  );
}

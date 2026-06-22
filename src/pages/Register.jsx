import React, { useState } from 'react';
import { ArrowLeft, Zap, Eye, EyeOff } from 'lucide-react';

export default function Register({ onRegisterSuccess, onNavigateToLogin, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    if (password.length < 6) {
      alert('Mật khẩu phải chứa ít nhất 6 ký tự!');
      return;
    }
    // Success: proceed to onboarding
    onRegisterSuccess();
  };

  return (
    <div className="login-screen fade-in"> {/* Reuse login screen class for matching styles */}
      {/* Decorative Background Mesh */}
      <div className="auth-bg-gradient"></div>

      {/* Header Navigation */}
      <div className="auth-header-nav-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="auth-header-logo-text">LevelUp</span>
        <div style={{ width: 28 }}></div>
      </div>

      {/* Welcome Banner */}
      <div className="auth-welcome-banner" style={{ marginBottom: '20px' }}>
        <div className="auth-logo-circle mini">
          <Zap size={20} fill="currentColor" />
        </div>
        <h2 className="auth-welcome-title">Đăng ký tài khoản</h2>
        <p className="auth-welcome-sub">Bắt đầu hành trình tập luyện lành mạnh ngay hôm nay.</p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="auth-form-container">
        {/* Full Name */}
        <div className="form-field-group">
          <label className="form-field-label">Họ và Tên</label>
          <input
            type="text"
            className="auth-input-field"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Address */}
        <div className="form-field-group">
          <label className="form-field-label">Địa chỉ Email</label>
          <input
            type="email"
            className="auth-input-field"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="form-field-group">
          <label className="form-field-label">Mật khẩu</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input-field password-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-field-group">
          <label className="form-field-label">Xác nhận mật khẩu</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="auth-input-field password-input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary auth-submit-btn" style={{ marginTop: '12px' }}>
          Đăng ký & Tiếp tục
        </button>
      </form>

      {/* Footer Link */}
      <div className="auth-footer-section" style={{ marginTop: '24px', marginBottom: '8px' }}>
        <p className="auth-switch-text">
          Đã có tài khoản?{' '}
          <button className="auth-link-btn" onClick={onNavigateToLogin}>
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
}

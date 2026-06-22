import React, { useState } from 'react';
import { ArrowLeft, Zap, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLoginSuccess, onNavigateToSignUp, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }
    // Mock successful login
    onLoginSuccess();
  };

  const handleForgotPassword = () => {
    alert('Một liên kết đặt lại mật khẩu đã được gửi đến địa chỉ email của bạn!');
  };

  return (
    <div className="login-screen fade-in">
      {/* Decorative Background Mesh */}
      <div className="auth-bg-gradient"></div>

      {/* Header Navigation */}
      <div className="auth-header-nav-row">
        <button className="back-btn-icon" onClick={onBack} aria-label="Quay lại">
          <ArrowLeft size={18} />
        </button>
        <span className="auth-header-logo-text">LevelUp</span>
        <div style={{ width: 28 }}></div> {/* Spacer for alignment */}
      </div>

      {/* Welcome Banner */}
      <div className="auth-welcome-banner">
        <div className="auth-logo-circle mini">
          <Zap size={20} fill="currentColor" />
        </div>
        <h2 className="auth-welcome-title">Chào mừng trở lại</h2>
        <p className="auth-welcome-sub">Đăng nhập để tiếp tục hành trình tập luyện.</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="auth-form-container">
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
          <div className="password-label-row">
            <label className="form-field-label">Mật khẩu</label>
            <button 
              type="button" 
              className="forgot-password-link" 
              onClick={handleForgotPassword}
            >
              Quên mật khẩu?
            </button>
          </div>
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

        {/* Submit button */}
        <button type="submit" className="btn btn-primary auth-submit-btn">
          Đăng nhập
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider" style={{ margin: '20px 0 16px 0' }}>
        <div className="divider-line"></div>
        <span className="divider-text">HOẶC TIẾP TỤC VỚI</span>
        <div className="divider-line"></div>
      </div>

      {/* Social Login */}
      <div className="auth-social-row" style={{ marginBottom: '24px' }}>
        <button className="social-auth-btn google-btn" onClick={onLoginSuccess} aria-label="Đăng nhập bằng Google">
          <span className="social-icon-placeholder">G</span>
        </button>
        <button className="social-auth-btn facebook-btn" onClick={onLoginSuccess} aria-label="Đăng nhập bằng Facebook">
          <span className="social-icon-placeholder">F</span>
        </button>
      </div>

      {/* Footer Link */}
      <div className="auth-footer-section" style={{ marginTop: 'auto' }}>
        <p className="auth-switch-text">
          Chưa có tài khoản?{' '}
          <button className="auth-link-btn" onClick={onNavigateToSignUp}>
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, Zap, Eye, EyeOff } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

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
    onLoginSuccess();
  };

  const handleForgotPassword = () => {
    alert('Một liên kết đặt lại mật khẩu đã được gửi đến địa chỉ email của bạn!');
  };

  return (
    <div className="login-screen fade-in">
      {/* Decorative Background Mesh */}
      <div className="auth-bg-gradient"></div>

      {/* Top Header Logo */}
      <div className="login-top-logo-row">
        <div className="auth-logo-circle mini">
          <Zap size={20} fill="#FFFFFF" color="#FFFFFF" />
        </div>
        <span className="auth-header-logo-text">LevelUp</span>
      </div>

      {/* White Card Container */}
      <div className="login-card-container card">
        <h2 className="auth-welcome-title">Chào mừng trở lại</h2>
        <p className="auth-welcome-sub">Đăng nhập để tiếp tục hành trình tập luyện.</p>

        <form onSubmit={handleSubmit} className="auth-form-container">
          {/* Email Field */}
          <div className="form-field-group">
            <label className="form-field-label">Địa chỉ email</label>
            <input
              type="email"
              className="auth-input-field"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
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

          {/* Login Submit Button */}
          <button type="submit" className="btn btn-primary auth-submit-btn">
            Đăng nhập
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider" style={{ margin: '20px 0 16px 0' }}>
          <div className="divider-line"></div>
          <span className="divider-text">HOẶC ĐĂNG NHẬP VỚI</span>
          <div className="divider-line"></div>
        </div>

        {/* Social Round Buttons */}
        <div className="auth-social-row">
          <button className="social-circle-btn" onClick={onLoginSuccess} title="Đăng nhập với Google">
            <GoogleIcon />
          </button>
          <button className="social-circle-btn" onClick={onLoginSuccess} title="Đăng nhập với Facebook">
            <FacebookIcon />
          </button>
        </div>

        {/* Footer Link */}
        <div className="auth-footer-section" style={{ marginTop: '16px' }}>
          <p className="auth-switch-text">
            Chưa có tài khoản?{' '}
            <button className="auth-link-btn" onClick={onNavigateToSignUp}>
              Đăng ký
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

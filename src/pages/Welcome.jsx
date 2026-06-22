import { Zap, ArrowRight } from 'lucide-react';
import googleLogo from '../assets/google.jpg';
import facebookLogo from '../assets/facebook.jpg';

export default function Welcome({ onSignUpEmail, onNavigateToLogin }) {
  return (
    <div className="welcome-screen fade-in">
      {/* Decorative Gradient Background Mesh */}
      <div className="auth-bg-gradient"></div>

      {/* Logo Section */}
      <div className="auth-logo-section">
        <div className="auth-logo-circle">
          <Zap size={32} fill="currentColor" />
        </div>
        <h1 className="auth-logo-text">LevelUp</h1>
        <p className="auth-subtitle">Bắt đầu hành trình tập luyện của bạn</p>
      </div>

      {/* Main Action Button */}
      <div className="auth-actions-group">
        <button className="btn btn-primary auth-main-btn" onClick={onSignUpEmail}>
          <span>Đăng ký bằng Email</span>
          <ArrowRight size={18} />
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <div className="divider-line"></div>
          <span className="divider-text">HOẶC TIẾP TỤC VỚI</span>
          <div className="divider-line"></div>
        </div>

        {/* Social Authentication */}
        <div className="auth-social-row">
          <button className="social-auth-btn google-btn" onClick={onSignUpEmail} aria-label="Đăng ký bằng Google">
            <img src={googleLogo} alt="Google" className="social-logo-img" />
          </button>
          <button className="social-auth-btn facebook-btn" onClick={onSignUpEmail} aria-label="Đăng ký bằng Facebook">
            <img src={facebookLogo} alt="Facebook" className="social-logo-img" />
          </button>
        </div>
      </div>

      {/* Footer & Legal */}
      <div className="auth-footer-section">
        <p className="auth-switch-text">
          Đã có tài khoản?{' '}
          <button className="auth-link-btn" onClick={onNavigateToLogin}>
            Đăng nhập
          </button>
        </p>
        <p className="auth-legal-disclaimer">
          BẰNG CÁCH TẠO TÀI KHOẢN, BẠN ĐỒNG Ý VỚI ĐIỀU KHOẢN DỊCH VỤ VÀ CHÍNH SÁCH BẢO MẬT CỦA CHÚNG TÔI
        </p>
      </div>
    </div>
  );
}

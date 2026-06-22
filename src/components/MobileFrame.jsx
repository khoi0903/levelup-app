import React, { useState, useEffect } from 'react';

export default function MobileFrame({ children, isDark }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="device-container">
      <div className="phone-mockup">
        {/* Phone Notch */}
        <div className="phone-notch"></div>
        
        {/* Status Bar */}
        <div className={`phone-header ${isDark ? 'dark-theme' : ''}`}>
          <span>{time || '09:41'}</span>
          <div className="phone-header-right">
            <span style={{ fontSize: '11px', marginRight: '2px' }}>LTE</span>
            <div className="battery-icon">
              <div className="battery-level" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        
        {/* Main App Content */}
        <div className={`app-container ${isDark ? 'dark-theme' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

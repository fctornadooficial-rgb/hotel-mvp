// src/components/Header.jsx
import React, { useState } from 'react';

const Header = ({ t, currentLang, changeLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="header__logo">MÖVENPICK</a>
        
        <button 
          className={`burger ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
        
        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="/">{t('nav_home')}</a>
          <a href="#services">{t('nav_services')}</a>
          <a href="bbq.html">BBQ</a>
          <a href="spa.html">SPA</a>
          <a href="transfer.html">Transfer</a>
          <a href="kids.html">Kids</a>
          <a href="romantic.html">Romantic</a>
        </nav>
        
        <div className="header__actions">
          <select 
            className="lang-btn" 
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="th">ไทย</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
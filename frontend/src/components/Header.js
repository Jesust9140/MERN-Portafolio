import React, { useEffect, useState } from 'react';
import '../css/Header.css';

const Header = ({ toggleDarkMode }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-logo">
          Jesus T.
        </div>
        
        <div className="header-nav-links">
          <a href="#home" className="header-nav-link">
            Home
          </a>
          <a href="#projects" className="header-nav-link">
            Projects
          </a>
          <a href="#about" className="header-nav-link">
            About
          </a>
          <a href="#contact" className="header-nav-link">
            Contact
          </a>
        </div>
        
        <div className="header-actions">
          <a 
            href="/resume.pdf" 
            download="resume.pdf"
            className="header-download-btn"
            title="Download Resume"
          >
            📥
          </a>
          <button
            onClick={toggleDarkMode}
            className="header-theme-toggle"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

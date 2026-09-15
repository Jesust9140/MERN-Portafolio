import React from 'react';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-logo">
          Jesus T.
        </div>

        <div className="header-nav-links">
          <a href="#projects" className="header-nav-link">
            Work
          </a>
          <a href="#about" className="header-nav-link">
            Services
          </a>
          <a href="#contact" className="header-nav-link">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;

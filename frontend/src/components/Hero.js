import React, { useState, useEffect } from 'react';
import '../css/Hero.css';

const Hero = () => {
  const [portfolioData, setPortfolioData] = useState(null);
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

  useEffect(() => {
    // Fetch portfolio data from backend
    fetch('http://localhost:5000/api/portfolio')
      .then(response => response.json())
      .then(data => setPortfolioData(data))
      .catch(error => {
        console.error('Error fetching portfolio data:', error);
        // Fallback data
        setPortfolioData({
          name: "Jesus T.",
          bio: "I build web experiences focused on accessibility and speed. I've started my software engineer career to help my ideas come true."
        });
      });
  }, []);

  if (!portfolioData) return <div>Loading...</div>;

  return (
    <section id="home" className={`hero ${isDark ? 'dark' : ''}`}>
      <div className="hero-container">
        <div className="hero-content">
          <div>
            <p className="hero-greeting">Hi there 👋 I'm</p>
            <h1 className="hero-title">
              {portfolioData.name}
            </h1>
            <h2 className="hero-subtitle">
              Software Engineer
            </h2>
          </div>
          
          <p className="hero-description">
            {portfolioData.bio}
          </p>
          
          <div className="hero-contact">
            <p className="hero-contact-label">Contact me:</p>
            <a 
              href="mailto:jesust9140@gmail.com" 
              className="hero-email-button"
            >
              jesust9140@gmail.com
            </a>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <div className="hero-image">
              <img 
                src="/images/me.jpeg" 
                alt="Jesus T." 
              />
            </div>
            <div className="hero-image-bg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

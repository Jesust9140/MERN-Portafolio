import React, { useState, useEffect } from 'react';
import '../css/Hero.css';

const Hero = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // TODO: maybe pull this to a custom hook later, it's getting repetitive in multiple components
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/portfolio`)
      .then(response => response.json())
      .then(data => setPortfolioData(data))
      .catch(error => {
        console.error('Error fetching portfolio data:', error);
        // Fallback - keep this just in case API is down
        setPortfolioData({
          name: "Jesus T.",
          bio: "I build web experiences focused on accessibility and speed. I've started my software engineer career to help my ideas come true."
        });
      });
  }, []);

  if (!portfolioData) return <div className="loading">Loading...</div>;
  // TODO: make this a proper loading skeleton maybe?

  return (
    <section id="home" className="hero">
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

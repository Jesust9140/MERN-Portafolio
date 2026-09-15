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
          bio: "Freelance developer specializing in websites, software, and custom tools. Turning complex ideas into clean, functional code."
        });
      });
  }, []);

  if (!portfolioData) return <div className="loading">Loading...</div>;
  // TODO: make this a proper loading skeleton maybe?

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            I build digital products
            <br />
            <span className="hero-title-gradient">that scale.</span>
          </h1>

          <p className="hero-description">
            {portfolioData.bio}
          </p>

          <a
            href="#contact"
            className="hero-email-button"
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

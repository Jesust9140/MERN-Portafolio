import React, { useState, useEffect } from 'react';
import '../css/Certifications.css';

const Certifications = () => {
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

  const certifications = [
    {
      id: 1,
      title: "Software Engineer Certificate",
      issuer: "General Assembly",
      date: "2024 - Present",
      description: "Full-stack development bootcamp covering MERN stack",
      badge: "🎓"
    },
    {
      id: 2,
      title: "Samsung Experience Consultant",
      issuer: "Samsung Certified",
      date: "2022 - Present",
      description: "Technical support and customer relations certification",
      badge: "📱"
    },
    {
      id: 3,
      title: "Geek Squad Agent",
      issuer: "Best Buy Certified",
      date: "2020 - 2022",
      description: "Technical support for computers, phones, and tablets",
      badge: "🛠️"
    } 
    //More buttons can be added here
  ];

  return (
    <section id="certifications" className={`certifications ${isDark ? 'dark' : ''}`}>
      <div className="certifications-container">
        <h2 className="certifications-title">
          Certifications
        </h2>
        
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="certification-card">
              <div className="certification-badge">{cert.badge}</div>
              <h3 className="certification-title">
                {cert.title}
              </h3>
              <p className="certification-issuer">
                {cert.issuer}
              </p>
              <p className="certification-date">
                {cert.date}
              </p>
              <p className="certification-description">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

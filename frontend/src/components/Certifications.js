import React, { useState, useEffect } from 'react';
import '../css/Certifications.css';

const Certifications = () => {
  const [isDark, setIsDark] = useState(true);

  const certificates = [
    {
      id: 1,
      name: "Technical Support Fundamentals",
      issuer: "Google (Coursera)",
      date: "Dec 2025"
    },
    {
      id: 2,
      name: "Introduction to Cyber Attacks",
      issuer: "New York University (Coursera)",
      date: "Feb 2025"
    },
    {
      id: 3,
      name: "Programming with JavaScript",
      issuer: "Meta (Coursera)",
      date: "Feb 2025"
    },
    {
      id: 4,
      name: "Introduction to Front-End Development",
      issuer: "Meta (Coursera)",
      date: "Jan 2023"
    }
  ];

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
    <section id="certifications" className={`certifications ${isDark ? 'dark' : ''}`}>
      <div className="certifications-container">
        <h2 className="certifications-title">
          Certifications
        </h2>
        
        <div className="certifications-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="certification-card">
              <h3 className="certification-title">
                {cert.name}
              </h3>
              <p className="certification-issuer">
                {cert.issuer}
              </p>
              <p className="certification-date">
                {cert.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

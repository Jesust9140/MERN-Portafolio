import React, { useState, useEffect } from 'react';
import '../css/Certifications.css';

const Certifications = () => {
  const [isDark, setIsDark] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetch('http://localhost:5000/api/certificates')
      .then(res => res.json())
      .then(data => {
        setCertificates(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching certificates:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section id="certifications" className="certifications">Loading...</section>;
  }

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

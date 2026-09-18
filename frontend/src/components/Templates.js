import React, { useState, useEffect } from 'react';
import '../css/Templates.css';
import templates from '../data/templates';

const Templates = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);

  useEffect(() => {
    if (!activeTemplate) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveTemplate(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeTemplate]);

  return (
    <section id="templates" className="templates-section">
      <div className="templates-container">
        <div className="templates-header">
          <h2 className="templates-title">Templates</h2>
          <p className="templates-intro">
            Concept builds showing what a site for your business could look like. Want one like this? Let's talk.
          </p>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <button
                type="button"
                className="template-card-image-wrapper"
                onClick={() => setActiveTemplate(template)}
                aria-label={`View ${template.name} full size`}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="template-card-image"
                />
                {!template.demo && (
                  <span className="template-card-badge">Concept</span>
                )}
                <span className="template-card-zoom-hint">View full size</span>
              </button>
              <h3 className="template-card-title">{template.name}</h3>
              <p className="template-card-category">{template.category}</p>
              {!template.demo && (
                <a href="#contact" className="template-card-cta">
                  Want one like this? Email me →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeTemplate && (
        <div
          className="template-lightbox"
          onClick={() => setActiveTemplate(null)}
        >
          <button
            type="button"
            className="template-lightbox-close"
            onClick={() => setActiveTemplate(null)}
            aria-label="Close"
          >
            ✕
          </button>

          <div
            className="template-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeTemplate.image}
              alt={activeTemplate.name}
              className="template-lightbox-image"
            />
            <div className="template-lightbox-footer">
              <div>
                <h3 className="template-lightbox-title">{activeTemplate.name}</h3>
                <p className="template-lightbox-category">{activeTemplate.category}</p>
              </div>
              {activeTemplate.demo ? (
                <a
                  href={activeTemplate.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="template-lightbox-link"
                >
                  Visit live site →
                </a>
              ) : (
                <a href="#contact" className="template-lightbox-link">
                  Want one like this? Email me →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Templates;

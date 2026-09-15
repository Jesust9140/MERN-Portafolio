import React from 'react';
import '../css/Templates.css';

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Midsummer Nail Spa",
      category: "Demo • Nail Salon",
      demo: "https://midsummernailspa.com",
      image: "/images/nailspa1.png"
    },
    {
      id: 2,
      name: "Bristol Opticians",
      category: "Demo • Optician Practice",
      demo: "https://bristolopticians.com",
      image: "/images/bristolopticians1.png"
    }
  ];

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
            <a
              key={template.id}
              href={template.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="template-card"
            >
              <div className="template-card-image-wrapper">
                <img
                  src={template.image}
                  alt={template.name}
                  className="template-card-image"
                />
              </div>
              <h3 className="template-card-title">{template.name}</h3>
              <p className="template-card-category">{template.category}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;

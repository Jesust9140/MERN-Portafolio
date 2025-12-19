import React, { useState } from 'react';
import '../css/Projects.css';

const Projects = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      id: 1,
      name: "LootDrop",
      description: "Full-stack Counter Strike marketplace web application with secure authentication, transactional workflows, and inventory management.",
      responsibilities: [
        "Built and maintained a full-stack web application with secure authentication, transactional workflows, and inventory management across 15+ REST API endpoints.",
        "Implemented secure authentication and session management using OpenID SSO, JWTs, HTTP-only cookies, and role-based access controls.",
        "Integrated third-party APIs (Steam, Stripe, PayPal) with server-side validation, error handling, and transaction tracking.",
        "Designed and managed MongoDB data models with indexing and schema validation to support scalable user, inventory, and transaction data.",
        "Developed an internal admin dashboard for monitoring users, transactions, and system activity to support troubleshooting and auditing.",
        "Applied input validation and centralized error handling to prevent malformed requests and improve system reliability.",
        "Deployed the application to a cloud environment with environment variable management and production database hosting."
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "PayPal", "Steam API", "JWT", "TailwindCSS"],
      github: "https://github.com/Jesust9140",
      demo: "https://lootdrop.vercel.app/",
      featured: true,
      images: ["/images/home1.png", "/images/loginout2.png", "/images/market.png"],
      duration: "Jan 2025 - Present"
    }
  ];

  const currentProject = projects[0];
  const images = currentProject.images;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Featured Project</h2>
        
        <div className="projects-grid">
          {/* Project Image Carousel */}
          <div className="projects-carousel">
            <div className="carousel-wrapper">
              <a
                href={currentProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="carousel-image-link"
              >
                <img 
                  src={images[currentImageIndex]} 
                  alt={`${currentProject.name} screenshot ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
              </a>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="carousel-button carousel-button-prev"
                aria-label="Previous image"
              >
                <svg className="carousel-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="carousel-button carousel-button-next"
                aria-label="Next image"
              >
                <svg className="carousel-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Indicators */}
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {currentProject.featured && (
                <div className="project-featured-badge">
                  Featured project
                </div>
              )}
            </div>
          </div>
          
          {/* Project Info */}
          <div className="project-info">
            <div className="project-header">
              <h3 className="project-name">
                {currentProject.name}
              </h3>
              <p className="project-duration">
                {currentProject.duration}
              </p>
              <p className="project-description">
                {currentProject.description}
              </p>
              
              <div className="project-contributions">
                <h4 className="contributions-title">Key Contributions:</h4>
                <ul className="contributions-list">
                  {currentProject.responsibilities.map((resp, index) => (
                    <li key={index} className="contribution-item">
                      <span className="contribution-bullet">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="project-tech">
              {currentProject.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="tech-badge"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="project-buttons">
              <a 
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                GitHub
              </a>
              {currentProject.demo !== "#" && (
                <a 
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                >
                  Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

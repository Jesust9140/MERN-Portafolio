import React, { useState } from 'react';
import '../css/Projects.css';

const Projects = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

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
      duration: "May 15th, 2025 - 80% Complete"
    },
    {
      id: 2,
      name: "SkinVerse",
      description: "Full-stack MERN marketplace for 10K+ CS2 skins with real-time Steam API integration, user authentication, and automated price tracking.",
      responsibilities: [
        "Secure payment processing (Stripe/PayPal) with OAuth 2.0 Steam auth, JWT tokens, CSRF protection, and DDoS rate limiting.",
        "Scalable backend architecture with 12+ Express.js controllers, MongoDB models, async job queues, and admin audit trails.",
        "Trading platform with bot integration for automated inventory sync, real-time transactions, and multi-step order fulfillment.",
        "Complete admin dashboard with user analytics, transaction monitoring, email automation (SendGrid), and system health checks."
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Steam API", "Stripe", "PayPal", "OAuth 2.0", "JWT", "SendGrid"],
      github: "https://github.com/Jesust9140",
      demo: "#",
      featured: true,
      images: ["/images/exchnage1.png", "/images/exchnage2.png", "/images/exhcnage3.png"],
      duration: "January 2nd, 2026 - 90% Complete"
    },
    {
      id: 3,
      name: "PracticeHere",
      description: "Full-stack practice session scheduling application with integrated timer functionality, progress tracking, and session analytics.",
      responsibilities: [
        "Interactive Practice Exam Platform – Built a full-featured quiz application using React and Vite with instant feedback, detailed explanations, and differentiated difficulty levels (easy, medium, hard) to help users prepare for AWS CLF-C02 certification",
        "Smart Exam Mode Selection – Implemented flexible testing options including 40-minute focused mode (with curated medium/hard questions) and 90-minute comprehensive mode to accommodate different study needs and time constraints",
        "Domain-Organized Content – Structured 50+ practice questions across key certification domains (Cloud Concepts, Security & Compliance, Technology, Billing) for comprehensive exam coverage and targeted learning paths",
        "Modern Tech Stack – Developed with React 19, Vite for fast dev/build performance, and Tailwind CSS for responsive design, demonstrating proficiency with current industry-standard tools and build optimization",
        "Clean, User-Friendly Interface – Created an intuitive question navigation system with immediate result feedback, explanation details, and tracking features to enhance the learning experience and retention"
      ],
      technologies: ["React", "Node.js", "Express", "JavaScript", "CSS"],
      github: "https://github.com/Jesust9140/practicehere",
      demo: "https://main.dope3l0ulgoms.amplifyapp.com/",
      featured: true,
      images: ["/images/PracticeHere.png", "/images/home2practicehere.png", "/images/80mins.png", "/images/45mins.png"],
      duration: "April 28, 2026"
    }, 
    {
      id:4,
      name: "Personal Portfolio",
      description: "Full-stack MERN portfolio website showcasing 3+ projects with dynamic content management, responsive design, and integrated backend API for real-time data updates across 8+ REST endpoints.",
      responsibilities: [
        "Full-Stack Architecture – Built a complete MERN application with React frontend and Node.js/Express backend, featuring 8+ REST API endpoints for dynamic content management and scalable data updates.",
        "Dynamic Content Management – Implemented API-driven content fetching to display project details, work experience, and skills with fallback mechanisms ensuring content delivery even during API downtime.",
        "Responsive Component Design – Developed reusable React components organized by feature (Hero, Projects, Experience, Contact) with TailwindCSS for consistent responsive design across all device sizes.",
        "Data Persistence & Scalability – Designed MongoDB data models to store portfolio content, enabling easy updates without code changes and supporting future feature expansion.",
        "Email Integration – Integrated email service (SendGrid) for contact form submissions with server-side validation, preventing spam and ensuring reliable communication.",
        "Production Deployment – Deployed full-stack application with environment variable management, CORS configuration, and optimized performance for custom domain (jesus-tabora.com)."
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "TailwindCSS", "CSS", "REST API", "SendGrid"],
      github: "https://github.com/Jesust9140/MERN-Portafolio",
      demo: "https://www.jesus-tabora.com",
      featured: true,
      images: ["/images/portfolio1.png", "/images/portfolio2.png", "/images/portfolio3.png", "/images/portfolio4.png"],
      duration: "Nov 6, 2025"

    }, 
      
     
  ];

  const currentProject = projects[currentProjectIndex];
  const images = currentProject.images;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImageIndex(0);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
        </div>

        <div className="projects-content">
          <button
            onClick={prevProject}
            className="projects-nav-button projects-nav-prev"
            aria-label="Previous project"
          >
            <svg className="projects-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="projects-display">
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
                      src={currentProject.images[currentImageIndex]} 
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
                    {currentProject.images.map((_, index) => (
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

          <button
            onClick={nextProject}
            className="projects-nav-button projects-nav-next"
            aria-label="Next project"
          >
            <svg className="projects-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="projects-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentProjectIndex(index);
                setCurrentImageIndex(0);
              }}
              className={`project-indicator ${index === currentProjectIndex ? 'active' : ''}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

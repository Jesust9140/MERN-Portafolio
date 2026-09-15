import React from 'react';
import '../css/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Raymond and Sons Handyman",
      category: "Full-Stack • Business Site",
      description: "Full-stack MERN business website for a Brooklyn handyman company, featuring an online quote-request and scheduling system with automated email notifications.",
      responsibilities: [
        "Built the frontend with React and Vite, and the backend with Node.js, Express, and Mongoose",
        "Designed and built a scheduling/quote-request system with automated email notifications via a Gmail-based mail service",
        "Deployed the backend on Render and the frontend on AWS Amplify",
        "Built a responsive service showcase (services, work gallery, service area) and a lead-generation quote form"
      ],
      technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "Mongoose", "Gmail API", "Render", "AWS Amplify"],
      github: "https://github.com/Jesust9140",
      demo: "https://www.raymondsonshandyman.com/",
      featured: true,
      images: ["/images/raymond2.png", "/images/raymond1.png"],
      duration: "2026"
    },
    {
      id: 2,
      name: "SkinBastion",
      category: "Full-Stack • Marketplace",
      description: "Full-stack Counter Strike marketplace web application with secure authentication, transactional workflows, and inventory management.",
      responsibilities: [
        "Implemented secure authentication via Steam OpenID SSO with JWT sessions (HTTP-only cookies) and role-based access control",
        "Integrated Stripe, PayPal, and Steam APIs for real-money transactions and automated in-game item delivery via trade bots",
        "Designed MongoDB schemas across 20+ collections with indexing for a scalable inventory/marketplace system",
        "Built a custom in-memory job queue with rate-limiting and deduplication to manage Steam inventory sync at scale",
        "Developed an internal admin dashboard for monitoring users, transactions, and system health"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "PayPal", "Steam API", "JWT", "TailwindCSS"],
      github: "https://github.com/Jesust9140",
      demo: "https://lootdrop.vercel.app/",
      featured: true,
      images: ["/images/skinbastion1.png", "/images/home1.png", "/images/loginout2.png", "/images/market.png"],
      duration: "May 15th, 2025 - 80% Complete"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-card-image-wrapper">
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="project-card-image"
                />
              </div>
              <h3 className="project-card-title">{project.name}</h3>
              <p className="project-card-category">{project.category}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

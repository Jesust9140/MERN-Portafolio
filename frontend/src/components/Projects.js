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
    <section id="projects" className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Featured Project
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Project Image Carousel */}
          <div>
            <div className="relative group">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-300 dark:bg-gray-700">
                <a
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full cursor-pointer block"
                >
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${currentProject.name} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {currentProject.featured && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured project
                </div>
              )}
            </div>
          </div>
          
          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentProject.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                {currentProject.duration}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {currentProject.description}
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Key Contributions:</h4>
                <ul className="space-y-2">
                  {currentProject.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                      <span className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <a 
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                GitHub
              </a>
              {currentProject.demo !== "#" && (
                <a 
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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

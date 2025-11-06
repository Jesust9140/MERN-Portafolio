import React, { useState, useEffect } from 'react';
import '../css/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  // const [isDark, setIsDark] = useState(true); // Default to dark

  // useEffect(() => {
  //   setIsDark(document.documentElement.classList.contains('dark'));
    
  //   const observer = new MutationObserver(() => {
  //     setIsDark(document.documentElement.classList.contains('dark'));
  //   });
  //   observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => {
        console.error('Error fetching projects:', error);
        // Fallback data
        setProjects([
          {
            id: 1,
            name: "LootDrop.com",
            description: "Personal portfolio website showcasing my skills and projects. Built with React frontend, Node.js/Express backend, and modern design principles.",
            technologies: ["React", "Node.js", "Express", "TailwindCSS", "MongoDB"],
            github: "https://github.com/Jesust9140",
            demo: "#",
            featured: true,
            image: "/images/me.jpeg" // Placeholder
          },
          {
            id: 2,
            name: "Shambles.com",
            description: "Full-stack application for managing recipes and ingredients. Features user authentication, recipe sharing, and pantry management.",
            technologies: ["MongoDB", "Express", "Node.js", "EJS", "JavaScript"],
            github: "https://github.com/Jesust9140/cookbook",
            demo: "#",
            featured: true,
            image: "/images/me.jpeg" // Placeholder
          },
          {
            id: 3,
            name: "BabyMogul.com",
            description: "Experience providing technical support for Samsung products, troubleshooting software issues, and customer service excellence.",
            technologies: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
            github: "#",
            demo: "#",
            featured: false,
            image: "/images/me.jpeg" // Placeholder
          },
          {
            id: 4,
            name: "ImageDriving.com",
            description: "Experience providing technical support for Samsung products, troubleshooting software issues, and customer service excellence.",
            technologies: ["Customer Service", "Technical Support", "Windows", "Android"],
            github: "#",
            demo: "#",
            featured: false,
            image: "/images/me.jpeg" // Placeholder
          }
        ]);
      });
  }, []);

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Some of my projects
        </h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="relative group">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured project
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, techIndex) => (
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
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    GitHub
                  </a>
                  {project.demo !== "#" && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Live Site
                    </a>
                        //More buttons can be added here

                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

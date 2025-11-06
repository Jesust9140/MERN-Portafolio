import React, { useState, useEffect } from 'react';
import '../css/About.css';

const About = () => {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isDark, setIsDark] = useState(true); // Default to dark

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Fetch data from backend
    Promise.all([
      fetch('http://localhost:5000/api/experience').then(res => res.json()),
      fetch('http://localhost:5000/api/education').then(res => res.json()),
      fetch('http://localhost:5000/api/skills').then(res => res.json())
    ])
    .then(([experienceData, educationData, skillsData]) => {
      setExperience(experienceData);
      setEducation(educationData);
      setSkills(skillsData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Fallback data
      setExperience([
        {
          id: 1,
          company: "Samsung",
          position: "Samsung Experience Consultant",
          duration: "Jan 2022 - Present",
          responsibilities: [
            "Developed strong communication skills and conflict resolution techniques.",
            "Troubleshoot software and computer peripherals, Active Directory and Group Policy.",
            "Created my own selling techniques and pitches for Samsung products.",
            "Provided technical support for computers, printers, and peripherals."
          ]
        }
      ]);
      setEducation([
        {
          id: 1,
          institution: "General Assembly Bootcamp",
          degree: "Software Engineer Certificate",
          duration: "2024 - Present",
          details: [
            "Learned full-stack development for complete web applications.",
            "Focused on both front-end and back-end technologies.",
            "Tools: JavaScript, HTML, CSS, Node.js, Express, MongoDB, React."
          ]
        }
      ]);
      setSkills([
        "JavaScript - My go-to language for both frontend and backend development",
        "React - I love building interactive UIs and this portfolio showcases my React skills",
        "Node.js & Express - Built the backend API for this portfolio to serve dynamic content",
        "MongoDB - Used for storing portfolio data, though this project uses in-memory data",
        "HTML & CSS - Foundation skills I use daily, plus Tailwind CSS for modern styling",
        "Git & GitHub - Version control is essential, all my projects are on GitHub"
      ]);
    });
  }, []);

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Personal Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                My Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Throughout my career, I've developed strong expertise in full-stack development, 
                customer relations, and technical support. I have hands-on experience delivering 
                web applications and working with modern technologies.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My focus is on building scalable, maintainable applications that follow clean 
                code principles. I'm passionate about creating user-friendly experiences and 
                solving complex technical challenges.
              </p>
            </div>
            
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Technologies I Work With
              </h3>
              <div className="space-y-3">
                {skills.slice(0, 6).map((skill, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.split(' - ')[0]}
                      </span>
                      {skill.includes(' - ') && (
                        <span className="block text-sm mt-1">
                          {skill.split(' - ')[1]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experience & Education */}
          <div className="space-y-8">
            {/* Experience */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((job) => (
                  <div key={job.id} className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="pb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {job.position}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {job.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {job.duration}
                      </p>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                        {job.responsibilities.slice(0, 2).map((resp, index) => (
                          <li key={index}>• {resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-green-200 dark:border-green-800">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
                    <div className="pb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {edu.duration}
                      </p>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                        {edu.details.slice(0, 3).map((detail, index) => (
                          <li key={index}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

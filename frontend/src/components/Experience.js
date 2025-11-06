import React, { useState, useEffect } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

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
        "Git & GitHub - Version control is essential, all my projects are on GitHub",
        "RESTful APIs - Designed and built the API endpoints you see working in this portfolio",
        "Responsive Design - This site works great on mobile, tablet, and desktop",
        "Dark Mode Implementation - I added the theme toggle you see in the header",
        "MERN Stack - This entire portfolio is a MERN application I built from scratch"
      ]);
    });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'work':
        return (
          <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6 space-y-10">
            {experience.map((job) => (
              <div key={job.id} className="relative">
                <span className="absolute -left-3 top-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-white dark:border-gray-900"></span>
                <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">{job.duration}</div>
                <h3 className="text-xl font-semibold">
                  {job.company} <span className="text-sm font-normal text-gray-400">({job.position})</span>
                </h3>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6 space-y-10">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <span className="absolute -left-3 top-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-white dark:border-gray-900"></span>
                <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">{edu.duration}</div>
                <h3 className="text-xl font-semibold">
                  {edu.institution} <span className="text-sm font-normal text-gray-400">({edu.degree})</span>
                </h3>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  {edu.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-6 space-y-6">
            <div className="relative">
              <span className="absolute -left-3 top-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-white dark:border-gray-900"></span>
              <h3 className="text-xl font-semibold mb-3">Technologies I Work With</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Here are the technologies I'm passionate about and use regularly. This portfolio itself demonstrates many of these skills!
              </p>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {skill.split(' - ')[0]}
                    </span>
                    {skill.includes(' - ') && (
                      <span className="ml-2">- {skill.split(' - ')[1]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="experience" className="py-4 px-6 max-w-4xl mx-auto animate-fadeIn border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('work')}
            className={`px-6 py-2 text-sm font-medium rounded-l-md ${
              activeTab === 'work'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
            }`}
          >
            Work
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-6 py-2 text-sm font-medium rounded-none ${
              activeTab === 'education'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-2 text-sm font-medium rounded-r-md ${
              activeTab === 'skills'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
            }`}
          >
            Skills
          </button>
        </div>
        {renderContent()}
    </section>
  );
};

export default Experience;

import React, { useState, useEffect } from 'react';
import '../css/About.css';

const About = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const experience = [
    {
      id: 1,
      company: "2020Companies",
      position: "Lead Samsung Experience Consultant (Lead SEC)",
      duration: "March 2022 - Present",
      location: "Brooklyn, NY",
      responsibilities: [
        "Led and supported a team of five Samsung Experience Consultants across four high-traffic Best Buy locations.",
        "Served as the primary escalation point for complex customer issues, product questions, and device troubleshooting.",
        "Maintained top regional performance for three consecutive years through consistent KPI achievement."
      ]
    },
    {
      id: 2,
      company: "2020Companies",
      position: "Samsung Technical Support Consultant (in-store)",
      duration: "Jan 2022 - Mar 2022",
      responsibilities: [
        "Acted as first point of contact for walk-in customers with technical guidance and demonstrations.",
        "Diagnosed customer needs and recommended appropriate devices and solutions.",
        "Recognized for reliability, communication skills, and ability to build rapport with customers."
      ]
    },
    {
      id: 3,
      company: "Best Buy",
      position: "Geek Squad Consultation Agent (CA)",
      duration: "Sept 2020 - Jan 2022",
      responsibilities: [
        "Provided Tier 1 technical support for customer devices including smartphones and laptops.",
        "Diagnosed hardware and software issues using diagnostic tools.",
        "Supported Windows, macOS, and basic Linux environments."
      ]
    }
  ];

  const education = [
    {
      id: 1,
      institution: "Google IT Support Professional Certificate",
      degree: "IT Support & Systems Fundamentals",
      duration: "8-Month Program",
      details: [
        "Google-developed IT support program covering troubleshooting methodologies.",
        "Mastered networking fundamentals, operating systems, and security.",
        "Hands-on labs and practical exercises."
      ]
    },
    {
      id: 2,
      institution: "Spring Creek Community School",
      degree: "Arts & Technologies",
      duration: "Sept 2016 - July 2020",
      details: [
        "Concentrations: Critical Thinking, New Technologies, Algebra I & II",
        "Related Coursework: HTML/CSS, NODE"
      ]
    }
  ];

  const skills = {
    technical: [
      "HTML, CSS, JavaScript, React",
      "Node.js, Express, MongoDB, Mongoose",
      "Windows & Linux fundamentals, OS concepts",
      "TCP/IP, DNS, basic networking & connectivity troubleshooting",
      "npm, REST APIs, debugging"
    ],
    professional: [
      "Customer Support & Technical Communication",
      "Technical Troubleshooting & Issue Resolution",
      "KPI Tracking, Reporting, & Documentation",
      "Team Leadership, Training, & Mentorship"
    ]
  };

  return (
    <section id="about" className="py-20 px-6 bg-white dark:bg-black">
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
                Technical Skills
              </h3>
              <div className="space-y-3">
                {skills.technical && skills.technical.map((skill, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                Professional Skills
              </h3>
              <div className="space-y-3">
                {skills.professional && skills.professional.map((skill, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {skill}
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

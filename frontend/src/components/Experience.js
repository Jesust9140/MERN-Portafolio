import React, { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');

  const experience = [
    {
      id: 1,
      company: "2020Companies",
      position: "Lead Samsung Experience Consultant (Lead SEC)",
      duration: "March 2022 - Present",
      location: "Brooklyn, NY",
      responsibilities: [
        "Led and supported a team of five Samsung Experience Consultants across four high-traffic Best Buy locations in Brooklyn and Manhattan.",
        "Served as the primary escalation point for complex customer issues, product questions, and device troubleshooting.",
        "Conducted weekly coaching sessions and 1:1 performance reviews focused on communication quality, issue resolution, and customer experience consistency.",
        "Delivered hands-on demonstrations of Samsung devices and ecosystem integrations, translating technical features into clear, real-world use cases.",
        "Coordinated with Samsung and Best Buy leadership to execute live events, in-store trainings, and technical walkthroughs.",
        "Maintained top regional performance for three consecutive years through consistent KPI achievement and strong team development."
      ]
    },
    {
      id: 2,
      company: "2020Companies",
      position: "Samsung Technical Support Consultant (in-store)",
      duration: "Jan 2022 - Mar 2022",
      location: "Garden City, NY",
      responsibilities: [
        "Acted as the first point of contact for walk-in customers, providing technical guidance, device explanations, and hands-on demonstrations.",
        "Diagnosed customer needs and recommended appropriate devices, configurations, and ecosystem solutions.",
        "Communicated technical concepts clearly to non-technical users, building trust and ensuring positive customer outcomes.",
        "Collaborated with cross-department teams to provide consistent, end-to-end customer support.",
        "Recognized for reliability, communication skills, and ability to quickly build rapport with customers."
      ]
    },
    {
      id: 3,
      company: "Best Buy",
      position: "Geek Squad Consultation Agent (CA)",
      duration: "Sept 2020 - Jan 2022",
      location: "Brooklyn, NY",
      responsibilities: [
        "Provided Tier 1 technical support for customer devices, including smartphones, laptops, and peripherals.",
        "Diagnosed hardware, software, and connectivity issues using Geek Squad and Apple diagnostic tools (GSX, GSX2, ATLAS).",
        "Supported Windows, macOS, and basic Linux environments, assisting users with OS configuration and troubleshooting.",
        "Assisted customers with productivity tools, including Microsoft Word, Excel, and OneDrive.",
        "Documented issues, troubleshooting steps, and resolutions according to Geek Squad service standards.",
        "Delivered clear explanations and preventative recommendations to help customers avoid recurring technical issues.",
        "Maintained strong customer satisfaction by communicating technical issues effectively, even when delivering unfavorable outcomes."
      ]
    }
  ];

  const education = [
    {
      id: 1,
      institution: "Google IT Support Professional Certificate",
      degree: "IT Support & Systems Fundamentals",
      duration: "8-Month Program",
      location: "Brooklyn, NY",
      details: [
        "Completed a Google-developed IT support program covering troubleshooting methodologies and customer service best practices.",
        "Mastered networking fundamentals, operating systems, system administration, and security.",
        "Reinforced learning through hands-on labs and practical exercises."
      ]
    },
    {
      id: 2,
      institution: "Spring Creek Community School",
      degree: "Arts & Technologies",
      duration: "Sept 2016 - July 2020",
      location: "Brooklyn, NY",
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

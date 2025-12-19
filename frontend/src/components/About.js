import React from 'react';
import '../css/About.css';

const About = () => {
  // TODO: pull this from API endpoint later so I can update without redeploying
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
      institution: "General Assembly",
      degree: "Software Engineer Bootcamp",
      duration: "Graduated",
      location: "New York, NY",
      details: [
        "Concentrations: Full-Stack Development",
        "Object-Oriented Programming, Computing in JS & Python, HTML/CSS, Node, Mathematics, AI"
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
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About Me</h2>
        
        <div className="about-grid">
          {/* Left Column: Education & Experience */}
          <div className="about-left">
            {/* Education */}
            <div className="about-education">
              <h3 className="about-subtitle">Education</h3>
              <div className="timeline timeline-education">
                {education.map((edu) => (
                  <div key={edu.id} className="timeline-item">
                    <div className="timeline-dot education-dot"></div>
                    <div className="timeline-content">
                      <h4 className="timeline-degree">
                        {edu.degree}
                      </h4>
                      <p className="timeline-school">
                        {edu.institution}
                      </p>
                      <p className="timeline-duration">
                        {edu.duration}
                      </p>
                      <ul className="timeline-list">
                        {edu.details.slice(0, 3).map((detail, index) => (
                          <li key={index}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="about-experience">
              <h3 className="about-subtitle">Work History</h3>
              <div className="timeline">
                {experience.map((job) => (
                  <div key={job.id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4 className="timeline-position">
                        {job.position}
                      </h4>
                      <p className="timeline-company">
                        {job.company}
                      </p>
                      <p className="timeline-duration">
                        {job.duration}
                      </p>
                      <ul className="timeline-list">
                        {job.responsibilities.slice(0, 2).map((resp, index) => (
                          <li key={index}>• {resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column: Skills */}
          <div className="about-right">
            <div className="about-skills">
              <h3 className="about-subtitle">Technical Skills</h3>
              <div className="skills-list">
                {skills.technical && skills.technical.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-dot technical"></div>
                    <div className="skill-text">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="about-subtitle skills-professional-title">Professional Skills</h3>
              <div className="skills-list">
                {skills.professional && skills.professional.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-dot professional"></div>
                    <div className="skill-text">
                      {skill}
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

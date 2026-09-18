import React from 'react';
import '../css/About.css';

const About = () => {
  // TODO: pull this from API endpoint later so I can update without redeploying
  // Former resume content (Education / Work History / Skills) — kept here in case
  // we want to bring back a resume-style About section later.
  /*
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
        "Coordinated with Samsung and Best Buy leadership to execute live events, in-store trainings, and technical walkthroughs."
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
  */

  const services = [
    {
      id: 1,
      title: "Custom-built sites",
      description: "No drag-and-drop templates — every site is coded from scratch to match your business and your brand."
    },
    {
      id: 2,
      title: "Full-stack, not just templates",
      description: "React/Vite on the frontend, Node/Express/Mongoose on the backend — real applications with real functionality: forms, scheduling, logins, and more."
    },
    {
      id: 3,
      title: "Fast turnaround & real support",
      description: "Deployed, tested, and live quickly — and I stick around after launch to fix issues or add features as your business grows."
    },
    {
      id: 4,
      title: "Custom tools",
      description: "Not sure what \"custom tool\" means? Here's a few examples:",
      examples: [
        "Online booking & scheduling systems",
        "Inventory & order tracking",
        "Admin dashboards & internal reports",
        "Automated email/notification workflows",
        "Customer accounts & login systems"
      ]
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">What I do</h2>
        <p className="about-intro">
          I build custom websites and web apps for small businesses — from the first line of code to a live site your customers can use.
        </p>

        <div className="about-grid">
          {services.map((service) => (
            <div key={service.id} className="about-left">
              <h3 className="about-subtitle">{service.title}</h3>
              <p>{service.description}</p>
              {service.examples && (
                <ul className="about-examples">
                  {service.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

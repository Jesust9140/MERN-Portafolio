const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

//routes 
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: "Jesus T.",
    title: "Software Engineer",
    bio: "I build web experiences focused on accessibility and speed. I've started my software engineer career to help my ideas come true.",
    contact: {
      email: "jesust9140@gmail.com",
      linkedin: "https://www.linkedin.com/in/Jesust9140",
      github: "https://github.com/Jesust9140"
    }
  });
});
app.get('/api/experience', (req, res) => {
  res.json([
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
  ]);
});

app.get('/api/education', (req, res) => {
  res.json([
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
      location: "Brooklyn, NY",
      details: [
        "Concentrations: Critical Thinking, New Technologies, Algebra I & II",
        "Related Coursework: HTML/CSS, NODE"
      ]
    }
  ]);
});

app.get('/api/certificates', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Technical Support Fundamentals",
      issuer: "Google (Coursera)",
      date: "Dec 2025"
    },
    {
      id: 2,
      name: "Introduction to Cyber Attacks",
      issuer: "New York University (Coursera)",
      date: "Feb 2025"
    },
    {
      id: 3,
      name: "Programming with JavaScript",
      issuer: "Meta (Coursera)",
      date: "Feb 2025"
    },
    {
      id: 4,
      name: "Introduction to Front-End Development",
      issuer: "Meta (Coursera)",
      date: "Jan 2023"
    }
  ]);
});

app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      name: "MERN Portfolio Website",
      description: "Personal portfolio website showcasing my skills and projects. Built with React frontend, Node.js/Express backend, and modern design principles. Features dark mode, responsive design, and RESTful API integration.",
      technologies: ["React", "Node.js", "Express", "TailwindCSS", "MongoDB", "JavaScript"],
      github: "https://github.com/Jesust9140",
      demo: "#",
      featured: true,
      image: "/images/me.jpeg"
    },
    {
      id: 2,
      name: "Cookbook CRUD App",
      description: "Full-stack application for managing recipes and ingredients. Features user authentication, recipe sharing, and pantry management. Built with MongoDB for data persistence and EJS for templating.",
      technologies: ["MongoDB", "Express", "Node.js", "EJS", "JavaScript", "CSS"],
      github: "https://github.com/Jesust9140/cookbook",
      demo: "#",
      featured: true,
      image: "/images/me.jpeg"
    },
    {
      id: 3,
      name: "Samsung Technical Support Platform",
      description: "Experience providing comprehensive technical support for Samsung products including troubleshooting software issues, Active Directory management, and customer service excellence. Achieved #1 performance in the U.S.",
      technologies: ["Customer Service", "Technical Support", "Windows", "Android", "Active Directory"],
      github: "#",
      demo: "#",
      featured: false,
      image: "/images/me.jpeg"
    }
  ]);
});


app.get('/api/skills', (req, res) => {
  res.json({
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
  });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Log the message (in production, send email or save to database)
  console.log('New contact message:', {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  });

  // Send success response
  res.json({ 
    success: true, 
    message: 'Message received! I will get back to you soon.' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// MongoDB connection (optional - uncomment if you want to use MongoDB)
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };
// connectDB();
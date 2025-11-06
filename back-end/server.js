const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlware 
app.use(helmet());
app.use(cors());
app.use(express.json());

//rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);


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
      company: "Samsung",
      position: "Samsung Experience Consultant",
      duration: "Jan 2022 - Present",
      responsibilities: [
        "Developed strong communication skills and conflict resolution techniques to handle challenging customer interactions.",
        "Troubleshoot software and computer peripherals, Active Directory and Group Policy.",
        "Created my own selling techniques and pitches for Samsung products.",
        "Provided technical support for computers, printers, and peripherals."
      ]
    },
    {
      id: 2,
      company: "2020Companies",
      position: "Sales Samsung Experience Consultant",
      duration: "Aug 10, 2022 - Jan 15, 2025",
      responsibilities: [
        "Managed revenue growth, metrics, and 30/60/90 plans.",
        "Collaborated with Samsung, 2020Companies, and BestBuy CEOs.",
        "Maintained a 95% goal minimum, achieving #1 in the U.S.",
        "Attended exclusive Samsung events as a top performer."
      ]
    },
    {
      id: 3,
      company: "BestBuy",
      position: "Geek Squad Agent",
      duration: "Oct 2020 - Jan 2022",
      responsibilities: [
        "Provided technical support for computers, phones, and tablets.",
        "Enhanced sales and communication skills by promoting memberships.",
        "Worked collaboratively in a fast-paced environment with physical duties.",
        "Built expertise in operating systems: macOS, OneUI, Linux."
      ]
    }
  ]);
});

app.get('/api/education', (req, res) => {
  res.json([
    {
      id: 1,
      institution: "General Assembly Bootcamp",
      degree: "Software Engineer Certificate",
      duration: "2024 - Present",
      details: [
        "Learned full-stack development for complete web applications.",
        "Focused on both front-end and back-end technologies.",
        "Emphasized version control, TDD, and algorithmic problem-solving.",
        "Tools: JavaScript, HTML, CSS, Node.js, Express, MongoDB, React."
      ]
    },
    {
      id: 2,
      institution: "Spring Creek Community High School",
      degree: "High School Diploma",
      duration: "2013 – 2022",
      details: [
        "Completed AP Computer Science (Java).",
        "Participated in coding clubs and tech workshops.",
        "Created mini web projects using HTML/CSS.",
        "Excelled in logic, math, and structured programming fundamentals."
      ]
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
  res.json([
    "JavaScript - My go-to language for both frontend and backend development",
    "React - I love building interactive UIs and this portfolio showcases my React skills",
    "Node.js & Express - Built the backend API for this portfolio to serve dynamic content",
    "MongoDB - Used for storing portfolio data, though this project uses in-memory data",
    "HTML & CSS - Foundation skills I use daily, plus Tailwind CSS for modern styling",
    "Git & GitHub - Version control is essential, all my projects are on GitHub",
    "RESTful APIs - Designed and built the API endpoints you see working in this portfolio",
    "Responsive Design - This site works great on mobile, tablet, and desktop",
    "Dark Mode Implementation - I added the theme toggle you see in the header",
    "MERN Stack - This entire portfolio is a MERN application I built from scratch",
    "Customer Relations - From my Samsung experience, I know how to communicate effectively",
    "Problem Solving - I enjoy debugging and finding creative solutions to technical challenges"
  ]);
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
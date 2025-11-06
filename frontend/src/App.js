import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Initialize dark mode immediately
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(true); // Default to dark if no saved preference
      localStorage.setItem('theme', 'dark'); // Save dark as default
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Projects />
            <Certifications />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

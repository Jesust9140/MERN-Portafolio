import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Templates from './components/Templates';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PaymentSuccess from './components/PaymentSuccess';
import Admin from './components/Admin';

const HomePage = () => (
  <>
    <Header />
    <Hero />
    <Projects />
    <Templates />
    <About />
    <Pricing />
    <Contact />
    <Footer />
  </>
);

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

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Mechanism from './sections/Mechanism';
import Process from './sections/Process';
import Points from './sections/Points';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import CommunitySim from './pages/CommunitySim';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 主页组件
const HomePage = () => {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Community Mechanism Section */}
        <section id="mechanism">
          <Mechanism />
        </section>

        {/* Delegation Process Section */}
        <section id="process">
          <Process />
        </section>

        {/* Community Points Section */}
        <section id="points">
          <Points />
        </section>

        {/* CTA Section */}
        <section id="cta">
          <CTA />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#1a1a1a] text-[#e9e4df] overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunitySim />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

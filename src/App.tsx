import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useScroll } from './context/ScrollContext';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Ticker from './sections/Ticker';
import SectionsServices from './sections/Services';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import HowItWorks from './sections/HowItWorks';
import Booking from './sections/Booking';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Page imports
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import ServicesPage from './pages/Services';

gsap.registerPlugin(ScrollTrigger);

function prefersNativeScroll() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 767px)').matches
  );
}

// Home Page Component
function HomePage() {
  const { registerLenis, scrollToSection } = useScroll();
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (prefersNativeScroll()) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      duration: 1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    registerLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    rafCallbackRef.current = onTick;
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      registerLenis(null);
      lenis.destroy();
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
      }
    };
  }, [registerLenis]);

  return (
    <div className="relative">
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Content Layer */}
      <div className="relative z-[1]">
        <Navbar />
        <Hero onNavigate={scrollToSection} />
        <Ticker />
        <SectionsServices />
        <Gallery />
        <Testimonials />
        <HowItWorks />
        <Booking />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const location = useLocation();

  // Page transition animation
  useEffect(() => {
    gsap.fromTo(
      'main',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, [location.pathname]);

  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/services"
          element={
            <div className="relative min-h-screen">
              <ParticleCanvas />
              <div className="relative z-[1]">
                <Navbar />
                <ServicesPage />
                <Footer />
                <WhatsAppButton />
              </div>
            </div>
          }
        />
        <Route
          path="/pricing"
          element={
            <div className="relative min-h-screen">
              <ParticleCanvas />
              <div className="relative z-[1]">
                <Navbar />
                <Pricing />
                <Footer />
                <WhatsAppButton />
              </div>
            </div>
          }
        />
        <Route
          path="/faq"
          element={
            <div className="relative min-h-screen">
              <ParticleCanvas />
              <div className="relative z-[1]">
                <Navbar />
                <FAQ />
                <Footer />
                <WhatsAppButton />
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

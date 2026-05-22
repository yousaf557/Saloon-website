import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../context/ScrollContext';

const navLinks = [
  { label: 'Home', id: 'home', path: '/' },
  { label: 'Services', id: 'services', path: '/services' },
  { label: 'Pricing', id: 'pricing', path: '/pricing' },
  { label: 'FAQ', id: 'faq', path: '/faq' },
  { label: 'Book Now', id: 'booking', path: '/#booking' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollToSection } = useScroll();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: (typeof navLinks)[number]) => {
    if (!link.path.includes('#')) return;
    e.preventDefault();
    const sectionId = link.path.split('#')[1] || link.id;
    scrollToSection(sectionId);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power3.out' }
    );
  }, []);

  const isActive = (path: string) => {
    if (path.includes('#')) {
      return location.pathname === '/' && location.hash === path.split('#')[1];
    }
    return location.pathname === path;
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          height: 72,
          background: scrolled
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(196, 164, 132, 0.25)',
        }}
      >
        <div className="flex items-center justify-between h-full px-6 lg:px-10 max-w-[1400px] mx-auto">
          <Link
            to="/"
            className="font-serif text-xl tracking-tight text-white hover:text-gold transition-colors duration-300"
          >
      Luxe On Wheels
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative font-sans text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-300 group ${
                  isActive(link.path) ? 'text-gold' : 'text-gray-300 hover:text-gold'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ease-[cubic-bezier(0.33,0,0.2,1)] ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-slate-800 z-[1001] transition-transform duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: mobileOpen ? '-4px 0 20px rgba(0,0,0,0.3)' : 'none' }}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-8 pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              onClick={(e) => {
                handleLinkClick(e, link);
                setMobileOpen(false);
              }}
              className={`font-sans text-base font-medium uppercase tracking-[0.08em] transition-colors duration-300 text-left ${
                isActive(link.path) ? 'text-gold' : 'text-gray-300 hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-charcoal/20 z-[1000] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

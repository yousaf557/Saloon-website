import { useEffect, useRef, type MouseEvent } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook } from 'lucide-react';
import { useScroll } from '../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Services', path: '/#services' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Book Now', path: '/#booking' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollToSection } = useScroll();

  const handleQuickLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!path.includes('#')) return;
    e.preventDefault();
    const sectionId = path.split('#')[1];
    if (sectionId) scrollToSection(sectionId);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-charcoal border-t border-gold/20">
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 sm:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand & Logo */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                <img
                  src="/Brand-logo.png"
                  alt="Luxe On Wheels Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-[28px] text-cream font-light">
                  Luxe On Wheels
                </h3>
                <p className="font-sans text-xs text-gold uppercase tracking-[0.12em]">
                  Beauty Van
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-cream/70 max-w-[320px] leading-relaxed">
              Premium mobile salon services delivering professional beauty
              treatments to your doorstep with luxury and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-gold mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleQuickLinkClick(e, link.path)}
                    className="font-sans text-sm text-cream/70 hover:text-gold transition-colors duration-200 leading-[2.2]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-gold mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="font-sans text-sm text-cream/70 leading-[2.2]">
                <a href="https://wa.me/923051685477" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  +92 305 1685477
                </a>
              </li>
              <li className="font-sans text-sm text-cream/70 leading-[2.2]">
                shumaisaaiman@gmail.com
              </li>
              <li className="font-sans text-sm text-cream/70 leading-[2.2]">
                Mon — Sat: 8am — 8pm
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.83a8.23 8.23 0 0 0 4.83 1.55v-3.5c-.05 0-.09-.19-.07-.19z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/20 pt-6 mt-[60px] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream/50">
            &copy; 2025 Luxe On Wheels. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="/privacy"
              className="font-sans text-xs text-cream/50 hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-cream/30">|</span>
            <a
              href="/terms"
              className="font-sans text-xs text-cream/50 hover:text-gold transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

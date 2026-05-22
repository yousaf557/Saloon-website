import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import type Lenis from 'lenis';

const NAVBAR_OFFSET = 72;

type ScrollContextValue = {
  registerLenis: (lenis: Lenis | null) => void;
  scrollToSection: (id: string) => void;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

function scrollNative(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pendingScrollRef = useRef<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const registerLenis = useCallback((lenis: Lenis | null) => {
    lenisRef.current = lenis;
    if (lenis && pendingScrollRef.current) {
      const id = pendingScrollRef.current;
      pendingScrollRef.current = null;
      const el = document.getElementById(id);
      if (el) {
        lenis.scrollTo(el, { offset: -NAVBAR_OFFSET, duration: 1.2 });
      }
    }
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const performScroll = () => {
        const el = document.getElementById(id);
        if (!el) return;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, {
            offset: -NAVBAR_OFFSET,
            duration: 1.2,
          });
        } else {
          scrollNative(el);
        }
      };

      if (location.pathname === '/') {
        requestAnimationFrame(performScroll);
      } else {
        pendingScrollRef.current = id;
        navigate('/');
      }
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    if (location.pathname !== '/' || !pendingScrollRef.current) return;

    const id = pendingScrollRef.current;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      pendingScrollRef.current = null;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -NAVBAR_OFFSET, duration: 1.2 });
      } else {
        scrollNative(el);
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;
    const id = location.hash.replace('#', '');
    if (!id) return;
    const timer = window.setTimeout(() => scrollToSection(id), 200);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, scrollToSection]);

  return (
    <ScrollContext.Provider value={{ registerLenis, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error('useScroll must be used within ScrollProvider');
  }
  return ctx;
}

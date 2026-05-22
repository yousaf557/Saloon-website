import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.32,
        ease: 'power3.out',
      });
      gsap.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.44,
        ease: 'power3.out',
      });
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.56,
        ease: 'power3.out',
      });

      // Image entrance
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.1, ease: 'power2.out' }
      );
      gsap.fromTo(
        imgInnerRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 1.2, delay: 0.1, ease: 'power2.out' }
      );

      // Parallax on image
      if (imgInnerRef.current) {
        gsap.to(imgInnerRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden bg-cream"
    >
      {/* Text Content - Left Side */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-[8vw] py-24 lg:py-0 lg:w-1/2 order-2 lg:order-1">
        <span
          ref={labelRef}
          className="opacity-0 translate-y-[40px] font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-taupe mb-6"
        >
          LUXURY MOBILE SALON
        </span>
        <h1
          ref={headlineRef}
          className="opacity-0 translate-y-[40px] font-serif font-light text-charcoal leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          <span className="block">Beauty</span>
          <span className="block">comes to</span>
          <span className="block">you</span>
        </h1>
        <p
          ref={subRef}
          className="opacity-0 translate-y-[40px] font-sans text-lg text-taupe max-w-[420px] mt-8 leading-relaxed"
        >
          Professional hair, makeup, nails &amp; spa services delivered to your
          doorstep. No travel, no wait — just pure indulgence.
        </p>
        <button
          ref={ctaRef}
          onClick={() => onNavigate('booking')}
          className="opacity-0 translate-y-[40px] mt-10 self-start font-sans text-sm font-medium uppercase tracking-[0.06em] text-cream bg-charcoal px-10 py-4 rounded-full hover:bg-gold transition-all duration-[400ms] ease-[cubic-bezier(0.33,0,0.2,1)]"
        >
          Book Appointment
        </button>
      </div>

      {/* Hero Image - Right Side */}
      <div
        ref={imageRef}
        className="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full h-[50vh] order-1 lg:order-2 overflow-hidden"
      >
        <img
          ref={imgInnerRef}
          src="/hero-img.jpg"
          alt="luxe on wheels - Luxury mobile salon at your doorstep"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Mobile gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent lg:hidden" />
      </div>
    </section>
  );
}

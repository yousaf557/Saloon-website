import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 'hair', name: 'Hair', image: '/service-hair.jpg' },
  { id: 'makeup', name: 'Makeup', image: '/service-makeup.jpg' },
  { id: 'nails', name: 'Nails', image: '/service-nails.jpg' },
  { id: 'spa', name: 'Mehandi', image: '/service-spa.jpg' },
  { id: 'bridal', name: 'Bridal', image: '/service-bridal.jpg' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );

      // Accordion panels entrance
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = useCallback(
    (index: number) => {
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const targetWidth = i === index ? '50%' : '12.5%';
        gsap.to(item, {
          width: targetWidth,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      });

      // Reveal mask animation
      revealRefs.current.forEach((reveal, i) => {
        if (!reveal) return;
        gsap.to(reveal, {
          width: i === index ? '0%' : '100%',
          duration: 0.8,
          ease: 'power3.inOut',
        });
      });

      // Opacity for unhovered items
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        gsap.to(img, {
          opacity: i === index ? 1 : 0.72,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      });

      // Title color
      titleRefs.current.forEach((title, i) => {
        if (!title) return;
        gsap.to(title, {
          color: i === index ? '#FFFFFF' : '#FBF7F4',
          duration: 0.8,
          ease: 'power3.inOut',
        });
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    itemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, {
        width: '20%',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    });

    revealRefs.current.forEach((reveal) => {
      if (!reveal) return;
      gsap.to(reveal, {
        width: '0%',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    });

    imgRefs.current.forEach((img) => {
      if (!img) return;
      gsap.to(img, {
        opacity: 0.78,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    });

    titleRefs.current.forEach((title) => {
      if (!title) return;
      gsap.to(title, {
        color: '#FBF7F4',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white py-[120px] lg:py-[120px] md:py-[80px] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <h2
          ref={headingRef}
          className="font-serif font-light text-charcoal text-center mb-[60px]"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          Our Services
        </h2>
      </div>

      {/* Desktop Accordion */}
      <div
        ref={accordionRef}
        className="hidden md:flex w-full h-[500px] px-4"
        onMouseLeave={handleMouseLeave}
      >
        {services.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="relative overflow-hidden h-full mx-2 rounded-2xl cursor-pointer"
            style={{ width: '20%' }}
            onMouseEnter={() => handleMouseEnter(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleMouseEnter(i);
            }}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                ref={(el) => { imgRefs.current[i] = el; }}
                src={service.image}
                alt={`${service.name} service`}
                className="w-full h-full object-cover will-change-opacity"
                style={{ opacity: 0.78 }}
                loading="lazy"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(45,41,38,0.45) 0%, transparent 55%)',
                }}
              />
              {/* Reveal mask - hidden by default, shows on hover */}
              <div
                ref={(el) => { revealRefs.current[i] = el; }}
                className="absolute top-0 right-0 h-full bg-black/45 pointer-events-none will-change-auto"
                style={{
                  width: '0%',
                  transition: 'none',
                }}
              />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-[2]">
              <h3
                ref={(el) => { titleRefs.current[i] = el; }}
                className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-cream"
              >
                {service.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Stacked cards */}
      <div className="md:hidden flex flex-col gap-4 px-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative overflow-hidden rounded-2xl h-[200px]"
          >
            <img
              src={service.image}
              alt={`${service.name} service`}
              className="w-full h-full object-cover will-change-opacity"
              style={{ opacity: 0.85 }}
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(45,41,38,0.4) 0%, transparent 55%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-cream">
                {service.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

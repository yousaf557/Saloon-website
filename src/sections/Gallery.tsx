import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: '/gallery-1.jpg', alt: 'The Beauty Van exterior', tall: true },
  { id: 2, src: '/gallery-2.jpg', alt: 'Interior salon setup', wide: true },
  { id: 3, src: '/gallery-3.jpg', alt: 'Makeup session', square: true },
  { id: 4, src: '/gallery-4.jpg', alt: 'Nail art application', square: true },
  { id: 5, src: '/gallery-5.jpg', alt: 'Hair styling', tall: true },
  { id: 6, src: '/gallery-6.jpg', alt: 'Happy client after service', wide: true },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Images stagger entrance
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full bg-cream py-[120px] lg:py-[120px] md:py-[80px]"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div ref={headingRef} className="mb-[60px]">
          <h2
            className="font-serif font-light text-charcoal"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            The Experience
          </h2>
          <p className="font-sans text-base text-taupe mt-3">
            A glimpse into luxury beauty on wheels
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              ref={(el) => { imagesRef.current[i] = el; }}
              className={`relative overflow-hidden rounded-2xl group ${
                img.tall ? 'sm:row-span-2' : ''
              } ${img.wide ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div
                className={`overflow-hidden rounded-2xl ${
                  img.tall ? 'h-[400px] sm:h-full' : 'h-[250px] sm:h-[280px]'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_60px_rgba(45,41,38,0.15)] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote:
      'The Beauty Van transformed my living room into a luxury salon. Best blowout I\'ve ever had!',
    name: 'Sarah M.',
    rating: 5,
    service: 'Hair Styling',
  },
  {
    id: 2,
    quote:
      'They arrived right on time for my wedding day. My bridal makeup was absolutely flawless.',
    name: 'Priya K.',
    rating: 5,
    service: 'Bridal Package',
  },
  {
    id: 3,
    quote:
      'I booked a mani-pedi during my lunch break. So convenient and the quality is incredible.',
    name: 'Jessica T.',
    rating: 5,
    service: 'Quick Services',
  },
  {
    id: 4,
    quote:
      'My team loved the corporate spa day. Professional, relaxing, and so well organized.',
    name: 'Amanda L.',
    rating: 5,
    service: 'Group Events',
  },
  {
    id: 5,
    quote:
      'The color transformation was exactly what I wanted. Highly professional and friendly staff!',
    name: 'Michelle R.',
    rating: 5,
    service: 'Hair Color',
  },
  {
    id: 6,
    quote:
      'Affordable luxury! The prices are fair and the service quality is exceptional. Will definitely rebook.',
    name: 'Emily H.',
    rating: 5,
    service: 'Premium Style',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wobbleTimelines = useRef<gsap.core.Tween[]>([]);

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

      // Cards entrance
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );

        // Continuous wobble
        const angle = i % 2 === 0 ? 2 : -2;
        const delay = i * 0.3;
        const tween = gsap.to(card, {
          rotation: angle,
          duration: 2 + Math.random(),
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        wobbleTimelines.current[i] = tween;
      });
    }, sectionRef);

    return () => {
      wobbleTimelines.current.forEach((t) => t?.kill());
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    const inner = innerRefs.current[index];
    if (!card || !inner) return;

    // Kill wobble temporarily
    wobbleTimelines.current[index]?.pause();

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.perspective = '800px';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    inner.style.transform = `translate3d(${rotateY * 0.5}px, ${rotateX * 0.5}px, 20px)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    const inner = innerRefs.current[index];
    if (!card || !inner) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale3d: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        // Resume wobble from neutral
        wobbleTimelines.current[index]?.resume();
      },
    });
    gsap.to(inner, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full bg-white py-[120px] lg:py-[120px] md:py-[80px] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <h2
          ref={headingRef}
          className="font-serif font-light text-charcoal text-center mb-[60px]"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          Loved By Many
        </h2>

        {/* Cards Row */}
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative w-[280px] h-[340px] rounded-lg overflow-hidden cursor-default"
              style={{
                boxShadow: '0 4px 20px rgba(45,41,38,0.08)',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {/* Card background - warm cream gradient */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #FAF3EC 0%, #F5EDE6 50%, #EDE4DA 100%)',
                }}
              />
              {/* Subtle grain overlay */}
              <div
                className="absolute inset-0 rounded-lg opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Inner content */}
              <div
                ref={(el) => { innerRefs.current[i] = el; }}
                className="relative z-10 flex flex-col h-full p-8"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-gold fill-gold"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className="font-serif italic text-lg text-charcoal leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Name */}
                <p className="font-sans text-[13px] font-medium uppercase tracking-[0.06em] text-taupe mt-4">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

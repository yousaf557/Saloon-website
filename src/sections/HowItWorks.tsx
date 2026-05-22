import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Truck, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Book Online',
    description:
      'Choose your service and preferred time slot through our easy booking system.',
    icon: Calendar,
  },
  {
    id: 2,
    number: '02',
    title: 'We Come to You',
    description:
      'Our fully-equipped beauty van arrives at your location — home, office, or event venue.',
    icon: Truck,
  },
  {
    id: 3,
    number: '03',
    title: 'Enjoy Your Service',
    description:
      'Relax and indulge in professional-grade treatments in the comfort of your own space.',
    icon: Sparkles,
  },
  {
    id: 4,
    number: '04',
    title: 'Look \u0026 Feel Amazing',
    description:
      'Step out feeling confident, refreshed, and absolutely radiant.',
    icon: Heart,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const icon = step.querySelector('.step-icon');
        gsap.fromTo(
          step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full bg-charcoal py-[120px] lg:py-[120px] md:py-[80px]"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <h2
          ref={headingRef}
          className="font-serif font-light text-cream text-center mb-[60px]"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="flex flex-col items-center text-center"
              >
                <span className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-gold mb-4">
                  {step.number}
                </span>
                <div
                  className="step-icon w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(196, 164, 132, 0.15)',
                    border: '1px solid #C4A484',
                  }}
                >
                  <Icon size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[22px] text-cream">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] text-cream/70 mt-3 max-w-[260px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

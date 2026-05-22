import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import {
  PageHeader,
  PageSection,
  btnPrimary,
  sectionHeading,
  sectionHeadingOnDark,
} from '../components/PageLayout';
import { useScroll } from '../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Express Cut',
    price: '$35',
    time: '30 mins',
    features: ['Professional haircut', 'Hair wash', 'Basic styling'],
    popular: false,
  },
  {
    name: 'Premium Style',
    price: '$65',
    time: '60 mins',
    features: [
      'Luxury haircut',
      'Deep conditioning',
      'Professional styling',
      'Blow dry finish',
      'Complimentary beverage',
    ],
    popular: true,
  },
  {
    name: 'Ultimate Makeover',
    price: '$120',
    time: '120 mins',
    features: [
      'Complete hair transformation',
      'Hair treatment',
      'Makeup consultation',
      'Styling session',
      'Personal photo session',
      'Premium refreshments',
      'Take-home care kit',
    ],
    popular: false,
  },
  {
    name: 'Bridal Package',
    price: '$180',
    time: '180 mins',
    features: [
      'Full bridal styling',
      'Trial session included',
      'Day-of appointment',
      'Makeup & hair',
      'Touch-up kit',
      'VIP treatment',
      'Champagne service',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { scrollToSection } = useScroll();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      const cards = cardsRef.current.filter(Boolean);
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;

      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      cards.forEach((card, index) => {
        const isPopular = packages[index]?.popular ?? false;
        const endScale = isPopular && isDesktop ? 1.05 : 1;

        cardTimeline.fromTo(
          card,
          { opacity: 0, y: 56, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: endScale,
            duration: 1.1,
            ease: 'power4.out',
          },
          index * 0.12
        );
      });

      cards.forEach((card, index) => {
        const isPopular = packages[index]?.popular ?? false;
        const baseScale = isPopular && isDesktop ? 1.05 : 1;

        const onEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: baseScale * 1.03,
            duration: 0.55,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: baseScale,
            duration: 0.65,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mouseenter', onEnter);
          card.removeEventListener('mouseleave', onLeave);
        });
      });
    }, sectionRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <PageHeader
        ref={headingRef}
        label="Pricing"
        title="Transparent Pricing"
        subtitle="Premium beauty services at competitive prices. All services delivered at your location."
      />

      <PageSection bg="white" className="!pt-0">
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {packages.map((pkg, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`relative rounded-2xl overflow-hidden will-change-transform border ${
                pkg.popular
                  ? 'pricing-card--popular bg-charcoal text-cream border-gold ring-2 ring-gold/50 md:scale-105'
                  : 'bg-cream border-gold/25 hover:border-gold/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gold text-charcoal px-4 py-2 text-xs font-sans font-medium uppercase tracking-[0.08em]">
                  Popular
                </div>
              )}

              <div className="p-8">
                <h3
                  className={`font-serif text-2xl font-light mb-2 ${
                    pkg.popular ? 'text-cream' : 'text-charcoal'
                  }`}
                >
                  {pkg.name}
                </h3>
                <div className="mb-6">
                  <span
                    className={`font-serif text-4xl font-light ${
                      pkg.popular ? 'text-gold' : 'text-charcoal'
                    }`}
                  >
                    {pkg.price}
                  </span>
                  <p
                    className={`font-sans text-sm mt-1 ${
                      pkg.popular ? 'text-cream/70' : 'text-taupe'
                    }`}
                  >
                    {pkg.time}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('booking')}
                  className={`w-full py-3 rounded-lg font-sans text-sm font-medium uppercase tracking-[0.06em] mb-8 transition-all duration-[400ms] ease-[cubic-bezier(0.33,0,0.2,1)] ${
                    pkg.popular
                      ? 'bg-gold text-charcoal hover:bg-cream'
                      : 'bg-charcoal text-cream hover:bg-gold'
                  }`}
                >
                  Book Now
                </button>

                <div className="space-y-4">
                  {pkg.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          pkg.popular ? 'text-gold' : 'text-gold'
                        }`}
                        strokeWidth={1.5}
                      />
                      <span
                        className={`font-sans text-sm leading-relaxed ${
                          pkg.popular ? 'text-cream/85' : 'text-taupe'
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection bg="charcoal">
        <h2
          className={sectionHeadingOnDark}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Mobile Salon',
              text: 'We come to you. Luxury beauty at your doorstep.',
            },
            {
              title: 'Expert Artists',
              text: 'Certified professionals with 10+ years experience.',
            },
            {
              title: 'Premium Products',
              text: 'Only luxury brands used. Cruelty-free & eco-friendly.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-8 rounded-2xl border border-gold/20"
              style={{ background: 'rgba(196, 164, 132, 0.08)' }}
            >
              <h3 className="font-serif text-xl text-cream mb-3">{item.title}</h3>
              <p className="font-sans text-sm text-cream/70 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection bg="cream" className="text-center">
        <h2
          className={`${sectionHeading} mb-6`}
          style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
        >
          Ready to Book?
        </h2>
        <p className="font-sans text-taupe max-w-md mx-auto mb-8">
          Choose your package and we&apos;ll bring the salon experience to you.
        </p>
        <button
          type="button"
          onClick={() => scrollToSection('booking')}
          className={btnPrimary}
        >
          Book Appointment
        </button>
      </PageSection>
    </div>
  );
}

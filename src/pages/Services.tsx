import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Users, Shield, Zap, Award, Heart } from 'lucide-react';
import {
  PageHeader,
  PageSection,
  btnPrimary,
  sectionHeading,
  sectionHeadingOnDark,
} from '../components/PageLayout';
import { useScroll } from '../context/ScrollContext';

gsap.registerPlugin(ScrollTrigger);

const serviceCategories = [
  {
    icon: Sparkles,
    title: 'Hair Styling',
    description:
      'Professional cuts, colors, treatments, and styling for all hair types',
    features: [
      'Precision cuts & shapes',
      'Color transformations',
      'Hair treatments & masks',
      'Blow-dry styling',
      'Special occasion styling',
    ],
    image: '/service-hair.jpg',
  },
  {
    icon: Heart,
    title: 'Makeup & Beauty',
    description:
      'Expert makeup application and beauty consultation services',
    features: [
      'Bridal makeup',
      'Party makeup',
      'Makeup consultation',
      'Eyebrow shaping',
      'Lash extensions',
    ],
    image: '/service-makeup.jpg',
  },
  {
    icon: Award,
    title: 'Premium Treatments',
    description:
      'Luxury wellness and beauty treatments for ultimate pampering',
    features: [
      'Facial treatments',
      'Scalp massage therapy',
      'Deep conditioning',
      'Anti-aging treatments',
      'Skin rejuvenation',
    ],
    image: '/service-spa.jpg',
  },
  {
    icon: Zap,
    title: 'Quick Services',
    description: 'Fast, efficient services perfect for busy schedules',
    features: [
      'Express haircuts',
      'Touch-ups',
      'Quick styling',
      'Nail care',
      'Eyebrow tinting',
    ],
    image: '/service-nails.jpg',
  },
  {
    icon: Users,
    title: 'Group Events',
    description:
      'Special packages for parties, weddings, and group celebrations',
    features: [
      'Event styling',
      'Bride & bridesmaids',
      'Bachelor/bachelorette',
      'Girls night out',
      'Custom packages',
    ],
    image: '/service-bridal.jpg',
  },
  {
    icon: Shield,
    title: 'Wellness & Care',
    description:
      'Health-conscious beauty services using premium products',
    features: [
      'Organic treatments',
      'Allergy-free options',
      'Eco-friendly products',
      'Personalized care plans',
      'Aftercare guidance',
    ],
    image: '/service-well.jpeg',
  },
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement[]>([]);
  const { scrollToSection } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        }
      );

      const cards = servicesRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <PageHeader
        ref={headingRef}
        label="What We Offer"
        title="Our Services"
        subtitle="Comprehensive beauty solutions delivered with expertise and elegance. From hair to makeup, we've got you covered."
      />

      <PageSection bg="white" className="!pt-0">
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCategories.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) servicesRef.current[i] = el;
                }}
                className="group relative overflow-hidden rounded-2xl min-h-[360px] border border-gold/20 hover:border-gold/40 transition-colors duration-[400ms]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.85 }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(45,41,38,0.85) 0%, rgba(45,41,38,0.35) 55%, transparent 100%)',
                  }}
                />
                <div className="relative z-10 flex flex-col h-full min-h-[360px] p-8 justify-end">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: 'rgba(196, 164, 132, 0.2)',
                      border: '1px solid rgba(196, 164, 132, 0.5)',
                    }}
                  >
                    <Icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-cream mb-2">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-cream/75 mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 font-sans text-sm text-cream/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </PageSection>

      <PageSection bg="cream">
        <h2
          className={sectionHeading}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          Why Choose Luxe On Wheels?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: 'Expert Artists',
              text: 'Our team consists of certified professionals with 10+ years of industry experience. We stay updated with latest trends and techniques.',
            },
            {
              title: 'We Come to You',
              text: 'No need to commute. We bring our fully equipped mobile salon to your home or office. Luxury at your doorstep.',
            },
            {
              title: 'Premium Products',
              text: 'We use only high-quality, cruelty-free, and eco-friendly products. Your safety and satisfaction are our priorities.',
            },
            {
              title: 'Convenient Timing',
              text: 'We offer flexible scheduling including early mornings, evenings, and weekends. Book at a time that works for you.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gold/25 rounded-2xl p-8 hover:border-gold/50 transition-colors duration-[400ms]"
            >
              <h3 className="font-serif text-xl font-light text-charcoal mb-4">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection bg="charcoal" className="text-center">
        <h2
          className={`${sectionHeadingOnDark} mb-6`}
          style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
        >
          Ready to Transform Your Look?
        </h2>
        <p className="font-sans text-cream/70 max-w-md mx-auto mb-8">
          Book your appointment today and experience luxury beauty at your
          doorstep.
        </p>
        <button
          type="button"
          onClick={() => scrollToSection('booking')}
          className={btnPrimary}
        >
          Book Your Appointment
        </button>
      </PageSection>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import {
  PageHeader,
  PageSection,
  btnPrimary,
} from '../components/PageLayout';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How far do you travel?',
    answer:
      'We service the entire metropolitan area and surrounding suburbs. Travel is included in your booking. Just provide your address!',
  },
  {
    question: 'Can I change my appointment time?',
    answer:
      'Yes! You can reschedule up to 24 hours before your appointment at no additional charge through our app or by calling us.',
  },
  {
    question: 'What if I have sensitive hair/scalp?',
    answer:
      'We use hypoallergenic, cruelty-free products. Please mention any sensitivities during booking, and our stylists will customize treatment accordingly.',
  },
  {
    question: 'Are the prices fixed or do you have hidden charges?',
    answer:
      'Our pricing is completely transparent. What you see is what you pay. No hidden charges. Travel is included for bookings over $50.',
  },
  {
    question: 'Do you offer group packages?',
    answer:
      'Absolutely! We offer special group rates for parties, events, and celebrations. Contact us for a custom quote.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, debit cards, digital wallets (Apple Pay, Google Pay), and bank transfers. 50% advance booking required.',
  },
  {
    question: 'Can you do color corrections or touch-ups?',
    answer:
      'Yes! Our experts specialize in color corrections and touch-ups. This is done after a consultation to assess your hair condition.',
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer:
      "Your satisfaction is our priority! If you're not happy with your service, we'll redo it for free or provide a full refund.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const faqsGridRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
      );

      gsap.fromTo(
        faqsRef.current.filter(Boolean),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: faqsGridRef.current,
            start: 'top 85%',
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
        label="Support"
        title="Frequently Asked Questions"
        subtitle="Have questions? We've got answers. Can't find what you're looking for? Contact us directly!"
      />

      <PageSection bg="white" className="!pt-0">
        <div ref={faqsGridRef} className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              ref={(el) => {
                if (el) faqsRef.current[i] = el;
              }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection bg="cream" className="!py-[80px]">
        <div className="max-w-3xl mx-auto text-center bg-charcoal rounded-2xl p-10 md:p-12 border border-gold/20">
          <h3
            className="font-serif font-light text-cream mb-4"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            Still have questions?
          </h3>
          <p className="font-sans text-cream/70 mb-8 max-w-md mx-auto leading-relaxed">
            Get in touch with our team. We&apos;re always happy to help!
          </p>
          <a
            href="https://wa.me/923051685477"
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </PageSection>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(buttonRef.current, {
        backgroundColor: 'rgba(196, 164, 132, 0.12)',
        duration: 0.3,
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(buttonRef.current, {
        backgroundColor: 'transparent',
        duration: 0.3,
      });
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-cream border border-gold/25 hover:border-gold/40 transition-colors duration-[400ms]">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
      >
        <span className="font-sans text-base font-medium text-charcoal">
          {question}
        </span>
        <div ref={iconRef} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-gold" strokeWidth={1.5} />
        </div>
      </button>

      <div
        ref={contentRef}
        style={{ height: 0, overflow: 'hidden', opacity: 0 }}
        className="px-6"
      >
        <p className="font-sans text-sm text-taupe pb-6 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

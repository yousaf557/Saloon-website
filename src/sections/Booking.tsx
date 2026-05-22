import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  'Hair',
  'Makeup',
  'Nails',
  'Spa',
  'Bridal Package',
];

const timeOptions = [
  'Morning (9am - 12pm)',
  'Afternoon (12pm - 4pm)',
  'Evening (4pm - 8pm)',
];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mask reveal animation
      if (maskRef.current) {
        gsap.fromTo(
          maskRef.current,
          { clipPath: 'inset(10% 10% 10% 10% round 24px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }

      // Heading slide in
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Form slide in
      gsap.fromTo(
        formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative w-full min-h-[100dvh] bg-cream"
    >
      <div
        ref={maskRef}
        className="relative w-full min-h-[100dvh] bg-cream"
        style={{ clipPath: 'inset(10% 10% 10% 10% round 24px)' }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[100dvh] max-w-[1400px] mx-auto px-6 sm:px-10 py-[120px] gap-12 lg:gap-20">
          {/* Left: Heading */}
          <div ref={headingRef} className="lg:w-1/2">
            <h2
              className="font-serif font-light text-charcoal leading-[0.95]"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              <span className="block">Book Your</span>
              <span className="block">Appointment</span>
            </h2>
            <p className="font-sans text-lg text-taupe max-w-[400px] mt-6 leading-relaxed">
              Experience luxury beauty services at your doorstep. Same-day
              appointments available.
            </p>
          </div>

          {/* Right: Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:w-1/2 w-full max-w-[500px] flex flex-col gap-4"
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">
                  Booking Requested!
                </h3>
                <p className="font-sans text-taupe">
                  We&apos;ll contact you shortly to confirm your appointment.
                </p>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal placeholder:text-taupe/60 focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal placeholder:text-taupe/60 focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal placeholder:text-taupe/60 focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200"
                />
                <select
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Service
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200"
                />
                <select
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Preferred Time
                  </option>
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Address / Location"
                  rows={3}
                  required
                  className="w-full bg-white border border-gold/30 rounded-lg px-4 py-[14px] font-sans text-[15px] text-charcoal placeholder:text-taupe/60 focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,164,132,0.15)] focus:outline-none transition-all duration-200 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-charcoal text-cream font-sans text-sm font-medium uppercase tracking-[0.06em] py-[18px] rounded-lg hover:bg-gold transition-all duration-[400ms] ease-[cubic-bezier(0.33,0,0.2,1)]"
                >
                  Request Booking
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

import { forwardRef, type ReactNode } from 'react';

type SectionBg = 'cream' | 'white' | 'charcoal';

const sectionBg: Record<SectionBg, string> = {
  cream: 'bg-cream',
  white: 'bg-white',
  charcoal: 'bg-charcoal',
};

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle: string;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader({ label, title, subtitle }, headerRef) {
  return (
    <section className="relative w-full bg-cream pt-[120px] pb-[60px] md:pb-[80px]">
      <div
        ref={headerRef}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 text-center"
      >
        {label && (
          <span className="block font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-taupe mb-6">
            {label}
          </span>
        )}
        <h1
          className="font-serif font-light text-charcoal leading-[0.95] mb-6"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          {title}
        </h1>
        <p className="font-sans text-lg text-taupe max-w-[560px] mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
});

interface PageSectionProps {
  children: ReactNode;
  bg?: SectionBg;
  className?: string;
  id?: string;
}

export function PageSection({
  children,
  bg = 'white',
  className = '',
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full py-[80px] lg:py-[120px] ${sectionBg[bg]} ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">{children}</div>
    </section>
  );
}

export const btnPrimary =
  'inline-flex items-center justify-center font-sans text-sm font-medium uppercase tracking-[0.06em] text-cream bg-charcoal px-10 py-4 rounded-full hover:bg-gold transition-all duration-[400ms] ease-[cubic-bezier(0.33,0,0.2,1)]';

export const btnOutline =
  'inline-flex items-center justify-center font-sans text-sm font-medium uppercase tracking-[0.06em] text-charcoal bg-transparent border border-gold/40 px-10 py-4 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-[400ms] ease-[cubic-bezier(0.33,0,0.2,1)]';

export const sectionHeading =
  'font-serif font-light text-charcoal text-center mb-[60px]';

export const sectionHeadingOnDark =
  'font-serif font-light text-cream text-center mb-[60px]';

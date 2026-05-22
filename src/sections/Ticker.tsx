const tickerText = 'Luxe On Wheels — MOBILE SALON SERVICES — LUXURY AT YOUR DOORSTEP — ';

export default function Ticker() {
  return (
    <div
      className="relative w-full h-12 overflow-hidden"
      style={{
        background: '#F5EDE6',
        borderTop: '1px solid rgba(196, 164, 132, 0.3)',
        borderBottom: '1px solid rgba(196, 164, 132, 0.3)',
      }}
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-ticker-scroll">
        <span className="font-sans text-[13px] font-medium uppercase tracking-[0.06em] text-charcoal leading-[48px] px-2 select-none">
          {tickerText.repeat(6)}
        </span>
        <span className="font-sans text-[13px] font-medium uppercase tracking-[0.06em] text-charcoal leading-[48px] px-2 select-none">
          {tickerText.repeat(6)}
        </span>
      </div>
    </div>
  );
}

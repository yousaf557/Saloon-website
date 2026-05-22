import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    // Entrance animation
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out', delay: 0.3 }
    );

    // Floating animation
    gsap.to(buttonRef.current, {
      y: -8,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Pulse animation
    gsap.to(buttonRef.current, {
      boxShadow:
        '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)',
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const whatsappNumber = '923051685477'; // WhatsApp number for Luxe On Wheels
  const message = 'Hi! I\'m interested in booking an appointment. Can you help me?';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      ref={buttonRef}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      
      {/* Floating Label */}
      <div className="absolute -left-48 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us on WhatsApp!
      </div>
    </a>
  );
}

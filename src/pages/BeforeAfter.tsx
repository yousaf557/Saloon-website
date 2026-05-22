import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterGallery() {
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  const transformations = [
    {
      name: 'Hair Color Transformation',
      before: 'https://images.unsplash.com/photo-1605497788044-dc75d7b28543?w=500&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    },
    {
      name: 'Bold Cut & Style',
      before: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1607003802025-97ec6a6b0ad0?w=500&h=600&fit=crop',
    },
    {
      name: 'Bridal Transformation',
      before: 'https://images.unsplash.com/photo-1595897917207-86db8ba27f3f?w=500&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1595897917207-aeb494043d54?w=500&h=600&fit=crop',
    },
    {
      name: 'Creative Color',
      before: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop',
      after: 'https://images.unsplash.com/photo-1522335617519-14d9f146b4da?w=500&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div ref={headingRef} className="text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif">
          Transformations
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          See the amazing transformations we've created for our clients
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4" ref={galleryRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {transformations.map((item, i) => (
            <BeforeAfterCard key={i} transformation={item} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Transformation?</h2>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
          Book Your Appointment Now
        </button>
      </div>
    </div>
  );
}

function BeforeAfterCard({ transformation, index }: any) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div ref={containerRef} className="bg-gray-800 rounded-xl overflow-hidden">
      <div
        className="relative w-full aspect-square cursor-ew-resize overflow-hidden group"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img src={transformation.after} alt="After" className="w-full h-full object-cover" />

        {/* Before Image (Overlay) */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img src={transformation.before} alt="Before" className="w-full h-full object-cover" />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white group-hover:w-2 transition-all duration-300"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-gray-900 font-bold">{'< >'}</span>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-white text-sm font-semibold">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-purple-600/80 px-3 py-1 rounded text-white text-sm font-semibold">
          After
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{transformation.name}</h3>
        <p className="text-gray-400 text-sm mt-2">Drag to compare the before and after</p>
      </div>
    </div>
  );
}

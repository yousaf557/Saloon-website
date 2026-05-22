import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InstagramFeed() {
  const headingRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        postsRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const instagramPosts = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1562596478-84b08e2e4c0a?w=400&h=400&fit=crop',
      likes: 1234,
      comments: 89,
      caption: 'Summer glow up ✨ #BeautyVan',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1603975915550-e323f7ebd32f?w=400&h=400&fit=crop',
      likes: 2156,
      comments: 145,
      caption: 'Bridal bliss 👰 #WeddingReady',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      likes: 1876,
      comments: 123,
      caption: 'Color transformation 🎨 #BeforeAfter',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1570157111519-bbf15da36d91?w=400&h=400&fit=crop',
      likes: 945,
      comments: 67,
      caption: 'Bold cuts for bold souls  #NewLook',
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1499203178059-a1aa35a73136?w=400&h=400&fit=crop',
      likes: 2341,
      comments: 198,
      caption: 'Luxury at your doorstep  #MobileSalon',
    },
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1460684885228-1c0b1f0b7f1b?w=400&h=400&fit=crop',
      likes: 1567,
      comments: 112,
      caption: 'Team love ❤️ #SalonFamily',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-serif">
            Follow Our Work
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community and see daily transformations
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            @beautyvan
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post, i) => (
            <div
              key={post.id}
              ref={(el) => {
                if (el) postsRef.current[i] = el;
              }}
              className="group relative rounded-lg overflow-hidden bg-gray-800 aspect-square cursor-pointer"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-center text-white">
                  <div className="flex justify-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-sm max-w-xs">{post.caption}</p>
                </div>
              </div>

              {/* Caption Overlay Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-medium truncate">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            View All on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

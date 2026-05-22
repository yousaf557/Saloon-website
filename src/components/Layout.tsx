import { ReactNode } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
  onNavigate?: (id: string) => void;
}

export default function Layout({ children, onNavigate }: LayoutProps) {
  const handleNavigate = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

import type { ReactNode } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
  onNavigate?: (id: string) => void;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

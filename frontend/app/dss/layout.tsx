// app/dss/layout.tsx
import { ReactNode } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';

interface DssLayoutProps {
  children: ReactNode;
}

export default function DssLayout({ children }: DssLayoutProps) {
  return (
    <div className="dss-application">
      <Header />
      <Navbar/>
      <main className="dss-content">{children}</main>
      <Footer />
    </div>
  );
}
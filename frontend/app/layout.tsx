// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
  
      <body>
        <Header/>
        <Navbar/>
        {children}</body>
        <Footer/>
    </html>
  );
}
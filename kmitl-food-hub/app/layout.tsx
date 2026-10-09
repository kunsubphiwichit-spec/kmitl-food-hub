import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { HeroUIProvider } from '@heroui/react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KMITL Food & Transport Hub',
  description: 'ศูนย์รวมข้อมูลร้านอาหาร & เครือข่ายรถรับส่ง อัจฉริยะ สจล.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="light">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 flex flex-col`}>
        <HeroUIProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </HeroUIProvider>
      </body>
    </html>
  );
}

'use client';

import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import { usePathname } from 'next/navigation';
import { EB_Garamond, DM_Mono, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-sans' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400','500'], style: ['normal','italic'], variable: '--font-serif' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSysPage = pathname === '/sys63';

  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable} ${dmMono.variable}`}>
      <body>
        {!isSysPage && <Nav />}
        <main>{children}</main>
        {!isSysPage && <Footer />}
        {!isSysPage && <ScrollIndicator />}
      </body>
    </html>
  );
}
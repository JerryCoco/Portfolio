'use client';

import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { EB_Garamond, DM_Mono, Geist } from 'next/font/google';
import { cn } from "@/lib/utils";
import useClickSpark from './hooks/useClickSpark';
import {
  House,
  UserRound,
  FolderOpen,
  PenLine,
  NotebookPen,
  MonitorDot,
} from 'lucide-react';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400','500'], style: ['normal','italic'], variable: '--font-serif' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' });

const navItems = [
  { icon: <House size={20} strokeWidth={1.5} />, label: 'Home', href: '/' },
  { icon: <UserRound size={20} strokeWidth={1.5} />, label: 'About', href: '/about' },
  { icon: <FolderOpen size={20} strokeWidth={1.5} />, label: 'Projects', href: '/projects' },
  { icon: <PenLine size={20} strokeWidth={1.5} />, label: 'Blog', href: '/blog' },
  { icon: <NotebookPen size={20} strokeWidth={1.5} />, label: 'Guestbook', href: '/guestbook', separator: true },
  { icon: <MonitorDot size={20} strokeWidth={1.5} />, label: 'Sys63', href: '/sys63' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSysPage = pathname === '/sys63';

  useClickSpark();

  return (
    <html lang="en" className={cn(ebGaramond.variable, dmMono.variable, "font-sans", geist.variable)}>
      <body>
        {!isSysPage && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6">
            <Nav
              items={navItems}
              magnification={1.6}
              distance={100}
              iconSize={44}
              gap={8}
              borderRadius={24}
              className="shadow-lg"
            />
          </div>
        )}
        <main className="pt-0">{children}</main>
        {!isSysPage && <Footer />}
      </body>
    </html>
  );
}
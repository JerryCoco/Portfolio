'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Index' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/learn', label: 'Learn' },
    { href: '/sys63', label: 'Sys63' },
  ];

  return (
    <>
      <style>{`
        .nav-center {
          position: fixed;
          top: 1.5rem;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          max-width: 760px;
          width: calc(100% - 2rem);
          margin: 0 auto;
          border-radius: 40px;
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0 1.5rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 1600px) {
          .nav-center {
            max-width: 860px;
          }
        }

        .nav-list {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-list li {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* ————— ALL VERTICAL DASHES / DIVIDERS REMOVED ————— */
        /* (no ::after pseudo-element) */

        .nav-link {
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 460;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          color: rgba(255, 255, 255, 0.5);
          white-space: nowrap;
        }

        .nav-link.active {
          color: rgba(255, 255, 255, 0.96);
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-link:hover:not(.active) {
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.03);
        }

        @media (max-width: 680px) {
          .nav-center {
            height: auto;
            min-height: 52px;
            border-radius: 32px;
            padding: 0.6rem 1rem;
            top: 1rem;
            max-width: calc(100% - 2rem);
          }
          .nav-list {
            gap: 1rem 1.2rem;
            flex-wrap: wrap;
            justify-content: center;
          }
          .nav-link {
            padding: 0.25rem 0.6rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 860px) and (min-width: 681px) {
          .nav-list {
            gap: 1.4rem;
          }
        }
      `}</style>

      <nav className="nav-center">
        <ul className="nav-list">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
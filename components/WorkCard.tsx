'use client';
import React from 'react';
import Link from 'next/link';

interface WorkCardProps {
  title: string;
  subtitle: string;
  href?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function WorkCard({ title, subtitle, href, children, style }: WorkCardProps) {
  const cardStyle: React.CSSProperties = {
    borderRadius: 16,
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'block',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    ...style,
  };

  const inner = (
    <>
      <div style={{
        aspectRatio: '3/4',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {children}
      </div>
      <div style={{
        padding: '1rem 1.25rem 1.25rem',
        background: 'rgba(0,0,0,0.6)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          fontSize: 15,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 3,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.01em',
        }}>
          {subtitle}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={cardStyle}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
        }}
      >
        {inner}
      </Link>
    );
  }

  return <div style={cardStyle}>{inner}</div>;
}
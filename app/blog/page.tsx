// app/blog/page.tsx
'use client';
import { useState } from 'react';

const posts = [
  { title: "Recreating Antimetal's Hero Animation...", date: "Apr 2026", category: 'all' },
  // ... all posts with category 'writings' or 'design'
];

const filters = ['All', 'Writings', 'Design'];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? posts : posts.filter(p => p.category === activeFilter.toLowerCase());

  return (
    <div className="page active" style={{ paddingTop: '52px' }}>
      <div style={{ padding: '4rem 2rem', maxWidth: 740, margin: '0 auto' }}>
        <h1 className="page-title">Blog</h1>
        <p className="page-sub">Experiments, prototypes, and creative explorations—filter by category or browse the list.</p>
        <div className="filter-tabs">
          {filters.map(f => (
            <button key={f} className={`filter-tab ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="blog-list">
          {filtered.map((post, i) => (
            <div key={i} className="blog-item">
              <span className="blog-item-title">{post.title}</span>
              <span className="blog-item-date">{post.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
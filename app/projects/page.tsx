// app/projects/page.tsx
'use client';
import { useState, useEffect } from 'react';

const projects = [
  { category: 'cgart', year: '2024', name: 'Aptos × Riso', desc: 'Limited-edition risograph posters...', bg: 'linear-gradient(135deg,#1a1a3a,#2a1a4a)', thumb: '🔷' },
  // ... define all projects from HTML
];

const filters = ['All', 'Product', 'Brand', 'Motion', 'CG Art', 'Wallpaper'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter.toLowerCase());

  return (
    <div className="page active" style={{ paddingTop: '52px' }}>
      <div className="projects-section">
        <h1 className="page-title">Projects</h1>
        <p className="page-sub">A full archive of case studies, identity systems, motion work, and visual explorations.</p>
        <div className="filter-tabs">
          {filters.map(f => (
            <button key={f} className={`filter-tab ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <div key={i} className="project-card" style={{ background: project.bg }}>
              <div className="project-thumb" style={{ background: 'transparent' }}>{project.thumb}</div>
              <div className="project-info">
                <div><span className="project-cat">{project.category}</span><span className="project-year">{project.year}</span></div>
                <div className="project-name">{project.name}</div>
                <div className="project-desc">{project.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
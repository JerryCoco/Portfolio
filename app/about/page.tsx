// app/about/page.tsx
export default function About() {
  return (
    <div className="page active" style={{ paddingTop: '52px' }}>
      <div className="about-section" style={{ maxWidth: '100%', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 640 }}>
          <h1 className="about-title">Thanks for stopping by!</h1>
          <div className="about-body">
            <p>I'm You Zhang, a design engineer and product designer specializing in 0→1 AI product development and scalable system architecture.</p>
            {/* ... rest of paragraphs */}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <div className="section-label">01. Experience</div>
            <div className="exp-item">
              <div><div className="exp-name">Microsoft (Windows AI, Systems & VISD)</div><div className="exp-role">Design Engineer & Product Designer</div></div>
              <div className="exp-date">2022 — Present</div>
            </div>
            <div className="exp-item">
              <div><div className="exp-name">ManvsMachine</div><div className="exp-role">Designer, Motion & Visual Storytelling</div></div>
              <div className="exp-date">Jan 2021 — Dec 2021</div>
            </div>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <div className="section-label">02. Expertises</div>
            <div className="expertise-grid">
              <div className="expertise-card"><div className="expertise-num">01</div><div className="expertise-name">0→1 Product Architecture</div><div className="expertise-desc">Taking ambiguous ideas from a blank canvas to fully shipped, functional AI apps.</div></div>
              {/* ... add other expertises */}
            </div>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <div className="section-label">03. The Stack & Skills</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div className="skills-group"><div className="skills-label">Front-End Engineering & UI</div><div className="skill-tags">{['⚛ React','N Next.js','⬡ TypeScript','✦ Tailwind CSS','✏ Shadcn/ui','⊞ CSS','◈ Figma','⋮ Git','↝ Motion'].map(skill=><span key={skill} className="skill-tag">{skill}</span>)}</div></div>
                {/* add other skill groups */}
              </div>
              <div>
                <div className="skills-group"><div className="skills-label">Systems & Architecture</div><div className="skill-tags">{['Design Systems','Semantic Tokens','Component Architecture','UI Frameworks','Interaction Patterns'].map(s=><span key={s} className="skill-tag">{s}</span>)}</div></div>
                {/* add motion skills */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
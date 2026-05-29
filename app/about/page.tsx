// app/about/page.tsx
// About page — updated with expanded skills across all categories.
'use client';

import React from 'react';

// ── Shared: Section label ─────────────────────────────────────────────────────
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div style={{
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.35)',
      marginBottom: '1.5rem',
      fontFamily: 'Geist, Inter, sans-serif',
    }}>
      {number}. {title}
    </div>
  );
}

// ── Shared: Skill pill ────────────────────────────────────────────────────────
function SkillPill({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      border: '0.5px solid rgba(255,255,255,0.15)',
      borderRadius: 20,
      fontSize: 12,
      color: 'rgba(255,255,255,0.6)',
      background: '#141414',
      fontFamily: 'Geist, Inter, system-ui, sans-serif',
    }}>
      {icon}
      {label}
    </span>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const PremierIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <rect width="24" height="24" rx="3" fill="#00005B"/>
    <path d="M6 17V7h3.5c2.5 0 4 1.3 4 3.3 0 2.2-1.6 3.4-4.2 3.4H8v3H6zm2-4.8h1.4c1.4 0 2.1-.6 2.1-1.8S10.8 8.7 9.4 8.7H8v3.5zM15 17V9.5h1.8v1c.5-.8 1.2-1.2 2.2-1.2v1.8c-1.3 0-2.2.7-2.2 2.2V17H15z" fill="#9999FF"/>
  </svg>
);

const CapCutIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <rect width="24" height="24" rx="4" fill="#000"/>
    <path d="M12 4a8 8 0 100 16A8 8 0 0012 4zm0 2a6 6 0 110 12A6 6 0 0112 6z" fill="white"/>
    <path d="M10 9l5 3-5 3V9z" fill="white"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.1" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/>
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
    <circle cx="12" cy="12" r="10" fill="black"/>
    <path d="M7 17V7l10 12h-2.5L7 9.5V17H7z" fill="white"/>
    <path d="M14 7h2.5v6L14 7z" fill="white" opacity="0.5"/>
  </svg>
);

const TSIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <rect width="24" height="24" rx="3" fill="#3178C6"/>
    <path d="M14 10h-3v8H9v-8H6V8h8v2zm1.5 4.5c0 .7.5 1.2 1.4 1.2.7 0 1.2-.4 1.2-1 0-.5-.4-.8-1.3-1.1-1.6-.5-2.3-1.1-2.3-2.3 0-1.2 1-2 2.4-2 1.4 0 2.3.8 2.4 2h-1.4c-.1-.6-.5-1-1-1-.5 0-.9.3-.9.7 0 .5.4.7 1.3 1 1.6.5 2.1 1.1 2.1 2.2 0 1.3-1 2.1-2.5 2.1-1.4 0-2.4-.8-2.5-2h1.1z" fill="white"/>
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
    <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
    <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
    <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
    <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
  </svg>
);

const RiveIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
    <path d="M4 4h7C14 4 17 6.9 17 10s-3 6-6 6H9v4H4V4zm5 8h2c1.7 0 3-1.3 3-3s-1.3-3-3-3H9v6z"/>
    <path d="M16.5 12l4 8h-4.5l-3.5-7"/>
  </svg>
);

const HTML5Icon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
  </svg>
);

const CSS3Icon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" fill="#1572B6"/>
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
    <path d="M6.5 17.5c.4.7.9 1.2 1.9 1.2 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.5 0-1.7 1.3-3 3.4-3 1.5 0 2.5.5 3.3 1.8l-1.8 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.4 1.4l.6.3c2 .8 3.1 1.7 3.1 3.6 0 2.1-1.6 3.2-3.8 3.2-2.1 0-3.5-1-4.2-2.4L6.5 17.5zm8.5.3c.4.8 1 1.3 1.9 1.3 1 0 1.5-.5 1.5-2.3V10h2.2v6.9c0 3.1-1.8 4.5-4.4 4.5-2.3 0-3.7-1.2-4.4-2.7l2.2-1.4z" fill="#000"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.41 10.85 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.59 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.41 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.59 13.15 9.5 12 7 12z" fill="#38BDF8"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05033"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const VercelIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
    <path d="M24 22.525H0l12-21.05 12 21.05z"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z"/>
  </svg>
);

const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#D97757">
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.89-.17-.784-.097L.9 12l-.169-.462.17-.414.832-.072 1.018.024 1.843-.049 2.606-.072 2.34-.024.79-.049v-.097l-.08-.195-4.72-2.647-.978-.585-.61-.828.121-.998.707-.634.902.17 1.017.634 1.964 1.17 2.046 1.244 1.818 1.122.67.39h.194l-.097-.146-.488-1.854-1.017-3.78-.343-1.78.024-1.025.66-.827.854-.122.781.708.268.779.585 2.168.756 2.77.634 2.46.33 1.17h.19l.317-.61.927-1.854 1.598-3.172.829-1.488.902-1.098.998-.244.927.537.098.998-.317.756-.853 1.538-1.354 2.684-.976 1.927-.512 1.025.122.146h.121l.33-1.17.635-2.46.756-2.77.585-2.168.268-.78.78-.706.854.122.659.827.025 1.024-.342 1.78-1.017 3.78-.49 1.854-.096.146h.195l.67-.39 1.817-1.122 2.046-1.244 1.964-1.17 1.018-.635.9-.17.708.635.122.997-.61.828-.978.585-4.72 2.647-.08.195.08.097.79.049 2.34.024 2.606.072 1.843.049 1.018-.024.83.072.172.414-.17.462-.699.462-.783.097-1.891.17-2.34.097-2.697.073-.79.048h-.23l-.08.128.08.23 4.72 2.647.978.585.61.829-.122.997-.707.634-.9-.17-1.018-.634-1.964-1.17-2.046-1.244-1.818-1.122-.67-.39h-.194l.097.146.488 1.854 1.017 3.78.342 1.78-.024 1.025-.659.827-.854.122-.781-.708-.268-.779-.585-2.168-.756-2.77-.634-2.46-.33-1.17h-.19l-.317.61-.927 1.854-1.598 3.172-.829 1.488-.902 1.098-.998.244-.927-.537-.097-.998.317-.756.853-1.538 1.354-2.684.976-1.927.512-1.025-.122-.146h-.121l-.33 1.17-.635 2.46-.756 2.77-.585 2.168-.268.779-.78.708-.854-.122-.66-.827-.024-1.025.342-1.78 1.017-3.78.49-1.854.096-.146h-.195l-.67.39-1.817 1.122-2.046 1.244-1.964 1.17-1.018.634-.9.17-.708-.634-.122-.997.61-.829.978-.585z"/>
  </svg>
);

const NotionAIIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12">
    <rect width="24" height="24" rx="4" fill="#000"/>
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z" fill="white"/>
  </svg>
);

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .exp-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.2rem 0;
          border-bottom: 1px dashed rgba(255,255,255,0.1);
        }

        .skill-group {
          margin-bottom: 1.75rem;
        }

        .skill-group-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.75rem;
          font-weight: 500;
          font-family: Geist, Inter, sans-serif;
        }

        .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 2.5rem 2rem' }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '1.5rem',
            fontFamily: 'Instrument Serif, serif',
          }}>
            Thanks for stopping by!
          </h1>

          <div style={{ maxWidth: 640 }}>
            <div style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
              marginBottom: '2rem',
              fontFamily: 'Geist, Inter, system-ui, sans-serif',
            }}>
              <p style={{ marginBottom: '1.4rem' }}>
                  I’m Jeremiah Abban, a design Engineer focused on building 0 → 1 
                  digital experiences where design, engineering, 
                  and storytelling operate as a single system rather
                  than separate stages.
                </p>
              <p style={{ marginBottom: '1.4rem' }}>
                  I don’t design in static layers. I design in code 
                  as my creative environment, moving directly from 
                  concept to working interface. This lets me close 
                  the gap between idea and execution, building systems 
                  that are both visually intentional and technically 
                  sound from the start.
                </p>

                <p style={{ marginBottom: '1.4rem' }}>
                  My work is systems-driven. I think in components, patterns, 
                  and scalable structures. Every decision, including layout, 
                  spacing, typography, and interaction flow, is made with the 
                  larger system in mind. I care less about isolated screens and
                  more about how everything connects, behaves, and evolves as one 
                  unified product.
                </p>

                <p style={{ marginBottom: '1.4rem' }}>
                  Beyond core engineering, I’m interested in how AI is reshaping 
                  product design and development. I explore conversational interfaces,
                  AI-assisted workflows, and how tools like large language models are 
                  changing the way digital systems are built, tested, and iterated.
                </p>

                <p>
                  I’m also a digital creator, using storytelling, especially through 
                  football narratives, as a way to build emotionally engaging content 
                  that still follows structure, rhythm, and intent. It’s another form 
                  of systems thinking, just expressed through narrative instead of interfaces.
                </p>
            </div>
          </div>
        </div>

        {/* ── Sections ─────────────────────────────────────────────────── */}
        <div style={{ padding: '0 2.5rem 20px', maxWidth: 1000, margin: '0 auto' }}>

          {/* 01. Experience */}
          <div style={{ marginBottom: '3.5rem' }}>
            <SectionLabel number="01" title="Experience" />

            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
              <div className="exp-row">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'white', marginBottom: 4, fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    Content Creator & Football Storyteller
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    TikTok, Facebook & Digital Platforms
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist Mono, monospace', whiteSpace: 'nowrap', marginLeft: '2rem' }}>
                  Aug 2025 — Present
                </div>
              </div>

              <div className="exp-row">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'white', marginBottom: 4, fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    UI/UX Designer & Frontend Developer
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    Freelance / Personal Projects
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist Mono, monospace', whiteSpace: 'nowrap', marginLeft: '2rem' }}>
                  2024 — Present
                </div>
              </div>

              <div className="exp-row">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'white', marginBottom: 4, fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    IT Intern
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    CalBank
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist Mono, monospace', whiteSpace: 'nowrap', marginLeft: '2rem' }}>
                  Apr 2025 — May 2025
                </div>
              </div>
            </div>
          </div>

          {/* 02. Expertises */}
          <div style={{ marginBottom: '3.5rem' }}>
            <SectionLabel number="02" title="Expertises" />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}>
              {[
                { n: '01', title: '0→1 Product Architecture', desc: 'Taking ambiguous ideas from a blank canvas to fully shipped, functional AI apps.' },
                { n: '02', title: 'Design Engineering & Systems', desc: 'Bypassing messy Figma handoffs by building scalable, production-ready UI directly in code.' },
                { n: '03', title: 'Interaction Design & Motion', desc: 'Crafting fluid animations, dynamic micro-interactions, and interfaces that actually feel alive.' },
                { n: '04', title: 'Brand Identity & Visual DNA', desc: 'Designing the logos, typography, and core visual language that build immediate user trust.' },
              ].map((item) => (
                <div key={item.n} style={{
                  background: '#1a1a1a',
                  padding: '1.5rem',
                  borderRadius: 12,
                  border: '0.5px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist, Inter, sans-serif', marginBottom: '0.75rem' }}>
                    {item.n}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: '0.5rem', fontFamily: 'Instrument Serif, serif', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 03. The Stack & Skills — now 2×2 balanced grid */}
          <div style={{ marginBottom: '3.5rem' }}>
            <SectionLabel number="03" title="The Stack & Skills" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 4rem' }}>

              {/* Column 1 — Front-End & Systems */}
              <div>
                <div className="skill-group">
                  <div className="skill-group-label" style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: '0.85rem' }}>Front-End Engineering & UI</div>
                  <div className="skill-pills">
                    <SkillPill label="React.js" icon={<ReactIcon />} />
                    <SkillPill label="Next.js" icon={<NextIcon />} />
                    <SkillPill label="TypeScript" icon={<TSIcon />} />
                    <SkillPill label="Tailwind CSS" icon={<TailwindIcon />} />
                    <SkillPill label="Shadcn/ui" />
                    <SkillPill label="HTML5" icon={<HTML5Icon />} />
                    <SkillPill label="CSS3" icon={<CSS3Icon />} />
                    <SkillPill label="JavaScript" icon={<JavaScriptIcon />} />
                    <SkillPill label="Figma" icon={<FigmaIcon />} />
                    <SkillPill label="Git" icon={<GitIcon />} />
                    <SkillPill label="Responsive Web Design" />
                    <SkillPill label="Component-Based UI" />
                    <SkillPill label="UI Animation" />
                    <SkillPill label="Mobile-First Design" />
                    <SkillPill label="Wireframing & Prototyping" />
                    <SkillPill label="Design Systems" />
                  </div>
                </div>

                <div className="skill-group">
                  <div className="skill-group-label" style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: '0.85rem' }}>Systems & Architecture</div>
                  <div className="skill-pills">
                    <SkillPill label="Design Systems" />
                    <SkillPill label="Semantic Tokens" />
                    <SkillPill label="Component Architecture" />
                    <SkillPill label="UI Frameworks" />
                    <SkillPill label="Interaction Patterns" />
                    <SkillPill label="Client-Server Architecture" />
                    <SkillPill label="REST API Integration" />
                    <SkillPill label="Frontend Architecture" />
                    <SkillPill label="State Management" />
                    <SkillPill label="Web Performance" />
                  </div>
                </div>
              </div>

              {/* Column 2 — AI Product Design & Tools/Workflow */}
              <div>
                <div className="skill-group">
                  <div className="skill-group-label" style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: '0.85rem' }}>AI Product Design</div>
                  <div className="skill-pills">
                    <SkillPill label="Generative AI UX" />
                    <SkillPill label="Agentic Interfaces" />
                    <SkillPill label="LLM Latency & Motion" />
                    <SkillPill label="Prompt Engineering" />
                    <SkillPill label="AI-Assisted UI/UX" />
                    <SkillPill label="Conversational UI" />
                    <SkillPill label="AI Workflow Automation" />
                    <SkillPill label="Human-Centered AI" />
                    <SkillPill label="AI-Powered Prototyping" />
                    <SkillPill label="ChatGPT" icon={<ChatGPTIcon />} />
                    <SkillPill label="Claude" icon={<ClaudeIcon />} />
                    <SkillPill label="Notion AI" icon={<NotionAIIcon />} />
                  </div>
                </div>

                <div className="skill-group">
                  <div className="skill-group-label" style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: '0.85rem' }}>Tools & Workflow</div>
                  <div className="skill-pills">
                    <SkillPill label="Adobe Premiere Pro" icon={<PremierIcon />} />
                    <SkillPill label="CapCut" icon={<CapCutIcon />} />
                    <SkillPill label="Notion" icon={<NotionIcon />} />
                    <SkillPill label="Vercel" icon={<VercelIcon />} />
                    <SkillPill label="GitHub" icon={<GitHubIcon />} />
                    <SkillPill label="Design-to-Code" />
                    <SkillPill label="Research & Discovery" />
                    <SkillPill label="User Flow Planning" />
                    <SkillPill label="Prototype Testing" />
                    <SkillPill label="Deployment & Optimization" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
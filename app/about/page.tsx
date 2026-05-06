'use client';

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        {/* About Header */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '8rem 2.5rem 2rem',     
          }}>
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
            <div style={{
              maxWidth: 640,
            }}>
              <div style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
                marginBottom: '2rem',
                fontFamily: 'Geist, Inter, system-ui, -apple-system, sans-serif',
              }}>
                <p style={{ marginBottom: '1.4rem' }}>
                  I'm Jeremiah Abban, a UI/UX Designer specializing in 0→1 product development and scalable system architecture.
                </p>
                <p style={{ marginBottom: '1.4rem' }}>
                  Driven by a love for design, I design and build experiences that feel right, 
                  where storytelling sits at the core, shaped by a unique blend of design and data.
                </p>
                <p style={{ marginBottom: '1.4rem' }}>
                  Currently focused on AI-native interfaces, design systems, and helping products 
                  find their visual voice from zero to one.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding: '0rem 2.5rem 6rem', maxWidth: 1000, margin: '0 auto' }}>
          {/* Experience Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1.5rem',
              fontFamily: 'Instrument Serif, serif',
            }}>
              01. Experience
            </div>
            
            <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '1.2rem 0',
                borderBottom: '0.5px solid rgba(255,255,255,0.08)',
              }}>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'white',
                    marginBottom: '4px',
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>UI/UX Designer (Freelance)</div>
                  <div style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Self-employed</div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  whiteSpace: 'nowrap',
                  marginLeft: '2rem',
                }}>2023 — Present</div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '1.2rem 0',
                borderBottom: '0.5px solid rgba(255,255,255,0.08)',
              }}>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'white',
                    marginBottom: '4px',
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Product Design Intern</div>
                  <div style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Creative Studio</div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  whiteSpace: 'nowrap',
                  marginLeft: '2rem',
                }}>Jan 2022 — Dec 2022</div>
              </div>
            </div>
          </div>

          {/* Expertises Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1.5rem',
              fontFamily: 'Instrument Serif, serif',
            }}>
              02. Expertises
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                background: '#141414',
                padding: '1.5rem',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  marginBottom: '0.75rem',
                }}>01</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>0→1 Product Design</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>Taking ambiguous ideas from concept to fully shipped products.</div>
              </div>
              <div style={{
                background: '#141414',
                padding: '1.5rem',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  marginBottom: '0.75rem',
                }}>02</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>Design Systems</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>Building scalable, maintainable systems for product growth.</div>
              </div>
              <div style={{
                background: '#141414',
                padding: '1.5rem',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  marginBottom: '0.75rem',
                }}>03</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>UI Engineering</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>Bridging design and development with interactive prototypes.</div>
              </div>
              <div style={{
                background: '#141414',
                padding: '1.5rem',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  marginBottom: '0.75rem',
                }}>04</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>Visual Storytelling</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}>Crafting compelling narratives through design and motion.</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '1.5rem',
              fontFamily: 'Instrument Serif, serif',
            }}>
              03. The Stack & Skills
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
            }}>
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Front-End Engineering & UI</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui', 'Framer Motion', 'Figma', 'Git', 'HTML/CSS'].map(skill => (
                      <span key={skill} style={{
                        padding: '4px 10px',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        borderRadius: 20,
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.55)',
                        background: '#141414',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Motion & Interaction</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['After Effects', 'Cinema 4D', 'Rive', 'Lottie', 'CSS Animations'].map(skill => (
                      <span key={skill} style={{
                        padding: '4px 10px',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        borderRadius: 20,
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.55)',
                        background: '#141414',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Systems & Architecture</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['Design Systems', 'Semantic Tokens', 'Component Architecture', 'UI Frameworks', 'Interaction Patterns'].map(skill => (
                      <span key={skill} style={{
                        padding: '4px 10px',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        borderRadius: 20,
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.55)',
                        background: '#141414',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                  }}>Tools & Workflow</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['VS Code', 'Git/GitHub', 'Vercel', 'Notion', 'Linear', 'Jira'].map(skill => (
                      <span key={skill} style={{
                        padding: '4px 10px',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        borderRadius: 20,
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.55)',
                        background: '#141414',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                      }}>{skill}</span>
                    ))}
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
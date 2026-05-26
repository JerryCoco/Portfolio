export type Project = {
  name: string;
  desc: string;
  category: string;
  year: string;
  icon: string;
  slug: string;
  tagline: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  liveUrl?: string;
  images: string[]; // put your actual image paths here later
};

export const allProjects: Project[] = [
  {
    name: 'Holovita AI',
    desc: '0→1 health companion product',
    category: 'ui-ux',
    year: '2025',
    icon: '💊',
    slug: 'holovita-ai',
    tagline: 'Designing a health companion from zero to one.',
    tags: ['UI/UX', 'Product Design', '0→1'],
    overview:
      'Holovita AI is a health companion app designed from scratch — from initial concept and user research through to a fully shipped product. The goal was to make personalised health guidance feel human, not clinical.',
    challenge:
      'Health apps often overwhelm users with data and lack empathy. The challenge was to design an experience that felt genuinely supportive while surfacing useful insights without adding cognitive load.',
    solution:
      'I designed a conversational UI that puts the user\'s wellbeing at the centre, using gentle micro-interactions, a warm colour palette, and a progressive disclosure pattern so users only see what they need at any given moment.',
    outcome:
      'The product launched in early 2025 and received strong early retention metrics. Users consistently described the experience as "calming" and "easy to stick to" in feedback sessions.',
    images: [],
    liveUrl: '',
  },
  {
    name: 'Hyperlink (Nexa AI)',
    desc: 'Brand and coded UI for on‑device AI',
    category: 'brand',
    year: '2025',
    icon: '🔗',
    slug: 'hyperlink-nexa',
    tagline: 'Building a brand identity for the next era of on-device AI.',
    tags: ['Branding', 'UI Design', 'AI'],
    overview:
      'Nexa AI needed a full brand system and a coded UI for their on-device AI product, Hyperlink. The brief called for something that felt fast, intelligent, and distinctly different from the sea of generic AI interfaces.',
    challenge:
      'The on-device AI space is crowded and visually homogeneous — everything looks like a chatbot. The challenge was to build a visual identity that communicated raw processing power while remaining approachable.',
    solution:
      'I developed a brand system rooted in kinetic typography and high-contrast minimalism, paired with a coded UI that uses subtle animation to make the AI feel alive and responsive without being distracting.',
    outcome:
      'The brand system was adopted across all Nexa AI touchpoints. The UI shipped on-device and was featured in several AI design round-ups.',
    images: [],
    liveUrl: '',
  },
  {
    name: 'Sys63',
    desc: 'WebOS designed in code',
    category: 'development',
    year: '2025',
    icon: '🖥️',
    slug: 'sys63',
    tagline: 'A fully functional WebOS, built and designed in code.',
    tags: ['Development', 'UI Design', 'Web'],
    overview:
      'Sys63 is a browser-based operating system — a personal project exploring what it would look like to build a fully functional desktop OS environment entirely in the browser using modern web technologies.',
    challenge:
      'Recreating OS-level interactions (window management, file systems, app switching) in a browser is technically complex and easy to get wrong. The design had to feel genuine, not like a novelty.',
    solution:
      'Built with React and CSS custom properties, Sys63 implements a composable window manager, a virtual file system, and a suite of mini-apps. Every interaction was designed and built simultaneously to keep the feel coherent.',
    outcome:
      'Sys63 attracted attention from the developer design community, earning shares across Twitter/X and several design newsletters. It stands as a demonstration of what\'s possible when design and engineering are treated as one discipline.',
    images: [],
    liveUrl: '',
  },
  {
    name: 'Windows 11',
    desc: 'Design at Windows Design Team',
    category: 'ui-ux',
    year: '2025',
    icon: '🪟',
    slug: 'windows-11',
    tagline: 'Contributing to the design language of Windows 11.',
    tags: ['UI/UX', 'Systems Design', 'Microsoft'],
    overview:
      'Worked with the Windows Design Team on the Windows 11 design system — focusing on component refinement, accessibility improvements, and new UI patterns for the evolving desktop experience.',
    challenge:
      'Designing for a platform used by hundreds of millions of people means every change carries enormous weight. The challenge was to push the design forward meaningfully without breaking the mental models users already rely on.',
    solution:
      'Contributed to the Fluent Design System with a focus on fluency between light and dark modes, improved contrast ratios for accessibility, and new interactive component states that feel native across both touch and pointer input.',
    outcome:
      'Work shipped as part of Windows 11 updates. Contributed components are now part of the official Fluent design toolkit used by product teams across Microsoft.',
    images: [],
    liveUrl: '',
  },
  {
    name: 'Creative Agency Platform',
    desc: 'Full‑service agency website with CMS',
    category: 'development',
    year: '2024',
    icon: '🎨',
    slug: 'creative-agency',
    tagline: 'A content-driven platform for a full-service creative agency.',
    tags: ['Development', 'CMS', 'Web Design'],
    overview:
      'Designed and built a full-service website for a creative agency, complete with a headless CMS so the team could manage content independently without touching code.',
    challenge:
      'Agencies need to be able to update their work quickly as new projects are completed, but most custom-built sites lock content behind developers. The challenge was to build something custom-looking that the team could actually maintain.',
    solution:
      'Built on Next.js with a Sanity CMS backend. The design uses editorial-style layouts with large typography and generous whitespace, giving the site a premium feel that reflects the agency\'s positioning.',
    outcome:
      'The client team was managing content independently within a week of handoff. The site\'s bounce rate dropped significantly compared to their previous platform.',
    images: [],
    liveUrl: '',
  },
  {
    name: 'Fintech Dashboard',
    desc: 'Data‑rich financial interface',
    category: 'ui-ux',
    year: '2024',
    icon: '📊',
    slug: 'fintech-dashboard',
    tagline: 'Making complex financial data actually readable.',
    tags: ['UI/UX', 'Data Design', 'Fintech'],
    overview:
      'Designed a financial dashboard for a fintech startup that needed to surface complex multi-asset portfolio data in a way that both professional traders and everyday investors could understand.',
    challenge:
      'Financial data is inherently dense. Most dashboards either oversimplify to the point of being useless or overwhelm users with numbers and charts that require expertise to parse.',
    solution:
      'Used a layered information architecture — a top-level summary view for quick orientation, with progressive drill-down into detailed analytics. Colour was used strictly as a signal, not decoration, keeping the interface readable under stress.',
    outcome:
      'User testing showed a significant reduction in time-to-insight compared to the previous interface. The dashboard was shipped and became a core selling point in the product\'s go-to-market positioning.',
    images: [],
    liveUrl: '',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
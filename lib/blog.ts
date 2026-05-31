// ─────────────────────────────────────────────────────────────────────────────
// lib/blog.ts
// Single source of truth for all blog posts.
// Both homepage and /blog page import from here — dates and slugs stay in sync.
// ─────────────────────────────────────────────────────────────────────────────

export type Post = {
  slug: string;
  title: string;
  date: string;      // display format: "Apr 2026"
  category: string;  // "design" | "writings" | "sports" | "life"
  tags?: string[];
  excerpt?: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: 'dele-alli',
    title: "The Kid From Tottenham: The Dele Alli Story",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Tottenham', 'Players'],
    excerpt: 'From the streets of Milton Keynes to the bright lights of the Premier League — the rise, the fall, and the fight back of Dele Alli.',
    content: `Coming soon.`,
  },
  {
    slug: 'vincent-kompany',
    title: "The Wall of Manchester: Vincent Kompany's Journey",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Manchester City', 'Players'],
    excerpt: 'A captain, a leader, a wall. How Vincent Kompany became the heartbeat of Manchester City\'s greatest era.',
    content: `Coming soon.`,
  },
  {
    slug: 'victor-moses',
    title: "From Lagos to the World: The Victor Moses Story",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Chelsea', 'Nigeria', 'Players'],
    excerpt: 'Orphaned at 11, shipped to England at 14 — Victor Moses turned every setback into a stepping stone.',
    content: `Coming soon.`,
  },
  {
    slug: 'mohamed-salah',
    title: "The Egyptian King: Mohamed Salah's Rise to Glory",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Liverpool', 'Egypt', 'Players'],
    excerpt: 'From being written off at Chelsea to becoming Liverpool\'s greatest ever — the unstoppable Mohamed Salah.',
    content: `Coming soon.`,
  },
  {
    slug: 'wayne-rooney',
    title: "The Boy From Croxteth: Wayne Rooney's Football Life",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Manchester United', 'Everton', 'Players'],
    excerpt: 'England\'s greatest ever — the raw, brilliant, complicated football life of Wayne Rooney.',
    content: `Coming soon.`,
  },
];

// Get a single post by its slug — used in /blog/[blog]/page.tsx
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
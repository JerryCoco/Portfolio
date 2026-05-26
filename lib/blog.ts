// content/posts.ts
// ─────────────────────────────────────────────────────────────
// This is where you write your blog posts.
// Each post maps to its slug (used in the URL: /blog/[slug])
// Replace the placeholder content with your own writing.
// Supports basic markdown: ## headers, **bold**, `code`, and paragraphs.
// ─────────────────────────────────────────────────────────────

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  content: string; // your writing goes here — plain text / markdown
};

export const posts: Post[] = [
  {
    slug: 'antimetal-hero',
    title: "Recreating Antimetal's Hero Animation With a Canvas Dot Grid",
    date: 'Apr 2026',
    category: 'design',
    content: `
I came across Antimetal's website and couldn't stop staring at the hero section. There's something hypnotic about a perfectly tuned dot grid that responds to mouse movement — it feels alive without being distracting.

## What Caught My Eye

The animation is deceptively simple: a grid of small dots, each one scaling and brightening based on proximity to the cursor. No WebGL, no Three.js — just a \`<canvas>\` element and a \`requestAnimationFrame\` loop.

## Setting Up the Canvas

The first step is getting the canvas to fill its container and respond to window resizes without going blurry on retina screens.

\`\`\`ts
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
\`\`\`

## The Dot Grid

// Replace this section with your own breakdown of how you built the grid.

## What I'd Do Differently

// Your reflections here.

## Final Thoughts

// Wrap up here.
    `.trim(),
  },
  {
    slug: 'ascii-art-engine',
    title: 'A Procedural ASCII Art Engine with 27 Animations',
    date: 'Apr 2026',
    category: 'writings',
    content: `
// Write your post here. Tell the story of how this came together.

## The Idea

## Building the Engine

## The 27 Animations

## What I Learned
    `.trim(),
  },
  {
    slug: 'collab-layer',
    title: 'Building a Real-Time Collaboration Layer in Next.js',
    date: 'Mar 2026',
    category: 'design',
    content: `
// Write your post here.

## The Problem

## Architecture Decisions

## The Implementation

## Lessons
    `.trim(),
  },
  {
    slug: 'type-systems',
    title: 'Type Systems Are the Best UI Design Tool',
    date: 'Mar 2026',
    category: 'writings',
    content: `
// Write your post here.

## Why Types and Design Are the Same Thing

## A Concrete Example

## Where This Breaks Down

## The Takeaway
    `.trim(),
  },
  {
    slug: 'sys63-architecture',
    title: 'The Architecture Behind My Sys63 OS Interface',
    date: 'Feb 2026',
    category: 'design',
    content: `
// Write your post here.

## What Is Sys63?

## The Window Manager

## State Without a Framework

## What's Next
    `.trim(),
  },
];

// Helper — get a single post by slug
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
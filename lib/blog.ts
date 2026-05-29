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
    slug: 'antimetal-hero',
    title: "Recreating Antimetal's Hero Animation With a Canvas Dot Grid",
    date: 'Apr 2026',
    category: 'design',
    tags: ['Creative-Coding', 'Canvas', 'Halftone', 'Animation'],
    excerpt:
      "A study in recreating Antimetal's three.js hero through pure Canvas2D — swapping video-driven shaders for layered amplitude fields, with Claude as a pair programmer.",
    content: `
I kept coming back to antimetal.com just to watch their hero animation. The breathing core, the orbiting blobs, the dot-grid halftone texture that reacts to your cursor — it has this calm, confident motion that says "we know what we're doing" before you've read a single word of copy. So I asked Claude to help me rebuild it from scratch as a study piece, and this is where I ended up.

## The Inspiration (And Why I Didn't Copy Their Approach)

Antimetal's hero runs on **three.js with a video texture driving a fragment shader**. They author the motion offline in After Effects or similar, export it as a grayscale video, and then the shader samples the video's luminance per pixel to decide dot size and brightness. It's a great pipeline — the designer keeps full control in a tool they know, and the shader is essentially a dumb renderer that maps brightness to dots.

That's elegant, but it's also a lot of moving parts for what I wanted: a single self-contained component I could drop into a blog post. A video file adds weight, WebGL adds a context, and the design is locked to whatever was painted in the video. I wanted something tunable live — the whole animation, math all the way down — so I picked the opposite trade-off: **everything is procedural Canvas2D, driven by summed amplitude fields instead of a pre-rendered luminance map.**

No shaders, no video, no three.js. Just a dot grid and some math.

## The Working With Claude Part

I've been treating Claude as a design-engineering collaborator more and more, and this piece was a good stress test. A few things that worked:

- **Describe the feeling first, then the math.** "Blobs that drift from outside toward the center and fade in a bell curve" got me better first drafts than "gaussian with an envelope function". Claude is good at turning vibes into equations, but only if you give it a vibe.

- **Iterate on one layer at a time.** I built the core disc first, got it looking right, then added ring 1, then ring 2, then cells, then shapes, then the cursor trail. Trying to debug all six layers at once is a mess; debugging them in isolation is fast.

- **Keep the knobs, then tune by hand.** The values you see in the dialkit panel are a mix of Claude's first guesses and an hour of me dragging sliders. Claude's math got me 80% of the way; the last 20% was a human looking at the thing and going "too fast", "too sharp", "more breath".

One thing that didn't work: asking Claude to describe the final look without letting me see it. The loop is tight — sketch, render, stare at it, adjust — and trying to skip the "stare at it" step with verbal descriptions is a false economy.

## How It Works

Every frame iterates a hex-offset dot grid. For each dot position, the loop sums amplitudes from multiple sources — cells, ring waves, core noise, cursor trail, and shape fields — and maps the final amplitude to a dot radius and color. Work is culled aggressively: cells and trail points only touch dots inside their 2.8σ–3σ bounding box, and dots with near-zero amplitude are skipped before the fill call. On a 1024px-wide canvas that's roughly 20,000 dots, and the profiler says the whole frame fits comfortably in a 60fps budget.

The design lesson here: **aggregate before you draw.** The naive version computes one draw per source per dot per frame. The fast version computes one final amplitude per dot and one draw per dot. Same visual, one-tenth the work.

## Structure Layers

Three concentric structures anchor the composition:

- **Core disc** — a warped sum-of-sines noise field inside \`rInner\`, passed through a double smoothstep for an S-curve contrast. The radius breathes with two out-of-phase sinusoids (\`sin(t · 1.1) · cos(t · 0.7)\`) so the loop never repeats perfectly.

- **Ring 1 and Ring 2** — thin annuli with angular waves plus bright "runners" that sweep around, implemented as angular gaussians whose centers rotate with time. Each ring layers a slow sine, a faster sine, and a dominant runner, all multiplied by a fade profile so the ring is thinnest at its inner and outer edges.

## Cells and Shapes

The big drifting blobs in the Antimetal hero are the most distinctive part, and they were the hardest to re-derive without peeking. What I landed on is two species of gaussian cells animating radially:

- **Inward cells** spawn near \`iRing2\`, ease toward the center with a cubic-in curve, and wobble with damped sinusoidal angle offsets.
- **Outward cells** spawn near the core and fast-start toward \`iRing2\` with an eased-out curve.

Each cell contributes an \`exp(-d² / 2σ²)\` kernel — same math as a 2D gaussian blob — with a bell-shaped scale envelope over its lifetime so it fades in, peaks mid-travel, and fades out.

## Cursor Trail

Pointer moves push timestamped samples into a ring buffer. Each sample fades with a squared age curve and an index weight — the newest point is full brightness, the oldest nearly invisible.

## What I'd Do Differently

If I were shipping this as a real hero for a real site, I'd probably:

- **Move the hot inner loop to a worker** or offscreen canvas, so scrolling past it doesn't jitter.
- **Add an \`IntersectionObserver\`** to pause the rAF when the component is out of view.
- **Steal Antimetal's actual approach** for the big blobs — authoring their motion in After Effects and sampling a video texture — because procedural cells will never have the same edited rhythm as something a motion designer keyframed.

Either way: it's been a while since a marketing site's hero made me want to spend a weekend rebuilding it. Credit to whoever designed the original.
    `.trim(),
  },
  {
    slug: 'ascii-art-engine',
    title: 'A Procedural ASCII Art Engine with 27 Animations',
    date: 'Apr 2026',
    category: 'writings',
    tags: ['ASCII', 'Canvas', 'Animation', 'Generative'],
    excerpt: 'Building a self-contained ASCII renderer with 27 distinct animation modes, all driven by a single loop.',
    content: `
## The Idea

ASCII art has this beautiful constraint: you're painting with characters, not pixels. Every cell is either a character or empty, and the density of characters creates the illusion of shading and form.

## Building the Engine

The core loop is simple: for each cell in the grid, compute an amplitude value between 0 and 1, then map that to a character from a density ramp — from space (empty) up through ·:;=+xX$ and so on.

## The 27 Animations

Each animation is just a different amplitude function. Some are purely mathematical — Lissajous curves, Perlin noise fields, reaction-diffusion. Others simulate physical systems — wave interference, fluid dynamics approximations, particle systems.

## What I Learned

The hardest part wasn't the math. It was the font. Monospace fonts aren't actually monospace in most browsers — the character cells have slightly different widths depending on the character. The fix is to measure each character's actual width at runtime and nudge the grid spacing accordingly.
    `.trim(),
  },
  {
    slug: 'collab-layer',
    title: 'Building a Real-Time Collaboration Layer in Next.js',
    date: 'Mar 2026',
    category: 'design',
    tags: ['Next.js', 'WebSockets', 'Collaboration', 'Architecture'],
    excerpt: 'How I wired live cursors, presence, and conflict-free edits into a Next.js app without a backend rewrite.',
    content: `
## The Problem

The app was already built. Adding real-time felt like surgery — you don't want to touch the state management, the routing, or the data layer. You want to bolt collaboration on top of what exists.

## Architecture Decisions

The key insight: treat collaboration as a separate concern. Don't let it touch your core state. Instead, run a parallel "presence" layer that knows about users and cursors, and a "sync" layer that handles conflict resolution on specific document fields.

## The Implementation

WebSockets for presence (low latency, fire-and-forget). CRDTs for document state (conflict-free, works offline). The two layers never talk to each other directly — they both talk to React state, which is the single source of truth.

## Lessons

The hardest bug was the "thundering herd" problem on reconnect. When 50 users reconnect simultaneously after a server restart, they all try to sync state at once. Solution: randomized exponential backoff with jitter, and a server-side rate limit on initial sync payloads.
    `.trim(),
  },
  {
    slug: 'type-systems',
    title: 'Type Systems Are the Best UI Design Tool',
    date: 'Mar 2026',
    category: 'writings',
    tags: ['TypeScript', 'Design', 'DX', 'Opinion'],
    excerpt: 'A type is a constraint. A constraint is a design decision. So types are design decisions — and that means your type system is a design tool.',
    content: `
## Why Types and Design Are the Same Thing

A button can be in one of four states: default, hover, active, disabled. If your type for a button component accepts any string for the variant prop, you've made a design decision — any string is valid. That's almost certainly wrong.

## A Concrete Example

A modal dialog has this lifecycle: closed → opening → open → closing → closed. If you model that as \`isOpen: boolean\`, you've collapsed the opening and closing states into the open and closed states. Animations break. Race conditions appear. Users see flickers.

Model it as a union type — \`'closed' | 'opening' | 'open' | 'closing'\` — and the impossible states become unrepresentable. The type system enforces the design constraint.

## Where This Breaks Down

Types can't express timing. They can't express the feel of an interaction. They can't tell you if the animation is too slow or the click target is too small. They're a necessary but not sufficient design tool.

## The Takeaway

Write your types before you write your components. The process of defining what states are possible, what props are valid, and what transitions are allowed is a design process. Treat it like one.
    `.trim(),
  },
  {
    slug: 'sys63-architecture',
    title: 'The Architecture Behind My Sys63 OS Interface',
    date: 'Feb 2026',
    category: 'design',
    tags: ['Architecture', 'OS', 'UI', 'Experiment'],
    excerpt: 'What happens when you build a window manager in the browser, from scratch, without a framework.',
    content: `
## What Is Sys63?

Sys63 is a fake operating system interface that runs in the browser. It has windows, a dock, a menu bar, a file system, and a terminal. It's not useful. It's a study in how OS interfaces work and how much of that you can implement in pure browser APIs.

## The Window Manager

Each window is an absolutely-positioned div. Dragging is handled with pointer events and a global drag state. Z-index is managed with a stack — focusing a window moves it to the top of the stack, and the stack maps to z-index values.

The hard part: resize handles. Each window has eight resize handles (corners + edges), each with its own drag behavior. The corner handles change both width/height, the edge handles change one dimension.

## State Without a Framework

No Redux, no Zustand, no React context. Just a global state object and a custom event bus. Windows subscribe to the events they care about. The file system publishes change events when files are created or deleted.

This worked fine until it didn't — the terminal needed to subscribe to file system events, the file manager needed to subscribe to window events, and suddenly I had a spaghetti event graph. The fix: a proper command pattern where every state change goes through a central dispatcher.

## What's Next

A proper process model. Right now every "app" is just a component. I want each app to be an isolated worker that communicates with the OS via a message-passing API — closer to how real OS processes work.
    `.trim(),
  },
];

// Get a single post by its slug — used in /blog/[blog]/page.tsx
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
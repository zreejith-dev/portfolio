# Design Notes — Sreejith R Portfolio

*Original hand-coded design system. Not a template clone.*

## Concept

Dark premium + bold. The site feels like a developer's product landing page — high
contrast, confident typography, minimal chrome, and a single strong accent pair.

## Design Decisions

### 1. Hero — image left, copy right
- Circular headshot (`sreejith.jpg`) sits on the left with an availability badge.
- Headline "Build Boldly. / Ship Smart." leads the right column, followed by the
  positioning line and two CTAs (Build with me / See my work).
- Role eyebrow: "Designer · Developer · AI Builder" — captures the
  designer-developer identity.

### 2. Typography
- Space Grotesk (display) + Inter (body), self-hosted variable fonts — zero external requests.
- Fluid `clamp()` type scale: hero title `clamp(3rem, 8vw, 5.6rem)`.
- `.outline` and `.grad` accents give the big headlines their bold, editorial feel.

### 3. Color
- Background: near-black `#0a0a0b`; elevated surfaces `#121214` / `#161619`.
- Accent gradient: `#6c5ce7 → #00d4ff` used sparingly (CTAs, highlights, glows).
- Subtle border system: white at 9% / 16% alpha for depth without noise.

### 4. Sections
- Hero → Tech ticker → Projects → Services → About → FAQ → Contact.
- Testimonials removed (per request).
- Discovery-call booking calendar was built and then hidden from the main pages
  (per request) — the FAQ CTA still invites a discovery call via `#contact`.

### 5. Two versions
- `index.html` — with photos (circular hero headshot + transparent portrait in About).
- `index-nophoto.html` — identical content, no images (`no-photo` body class,
  full-width typographic hero).

### 6. Performance & access
- 100% self-contained: no CDN, no analytics, no build step.
- Fonts: 2 × woff2 (~70 KB total).
- Skip link, ARIA labels, keyboard nav, `prefers-reduced-motion` support.

### 7. Interactive 3D hero
- Three.js (r128 UMD) is bundled locally as `assets/three.min.js` — zero external requests,
  works fully offline on GitHub Pages.
- An animated wireframe torus knot (cyan `#00d4ff` outer, purple `#6c5ce7` inner) plus a
  650-particle field floats behind the hero copy as a full-bleed background layer.
- Mouse-parallax: the camera eases toward the pointer, so the scene subtly follows the cursor.
- Accessibility & performance:
  - `prefers-reduced-motion` renders a single static frame (no animation loop).
  - Renders offscreen stops the animation loop (IntersectionObserver) to save battery.
  - Device pixel ratio capped at 2; the canvas sits behind content (`pointer-events: none`),
    so it never blocks clicks or text selection.
- Applied to both `index.html` and `index-nophoto.html`.
- No discovery-call / booking feature was added to the hero (per request).

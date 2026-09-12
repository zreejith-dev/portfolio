# Sreejith R — Portfolio

Personal portfolio for **Sreejith R** — Designer, Android Developer & AI Builder.

> Built as an **original, hand-coded site** — inspired by a Framer template's aesthetic, but with clean architecture and no framework dependency.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Main portfolio (dark premium bold design, circular hero headshot) |
| `index-nophoto.html` | Same site without any photos |

## Structure

```
├── index.html            # Main page (with photos)
├── index-nophoto.html    # Alternate page (no photos)
├── css/
│   └── style.css         # Design system + responsive layout
├── js/
│   ├── main.js           # Nav, scroll reveal, counters
│   └── hero-3d.js        # Interactive 3D hero scene (Three.js)
├── assets/
│   ├── sreejith.jpg      # Hero headshot
│   ├── sreejith-hero.png # Transparent portrait (About section)
│   ├── three.min.js      # Three.js r128 (self-hosted, no CDN)
│   ├── fonts/            # Self-hosted variable fonts (Inter, Space Grotesk)
│   └── Sreejith_R_Resume.pdf
└── DESIGN.md             # Design decisions & rationale
```

## Features

- **Interactive 3D hero** — animated wireframe torus knot + particle field with
  mouse-parallax, via locally-bundled Three.js (zero external requests).
- Zero external requests — fully self-contained (fonts + 3D bundled locally).
- Vanilla HTML / CSS / JS — no build step, no dependencies.
- Accessible: skip link, ARIA labels, keyboard nav, `prefers-reduced-motion` support.
- Fully responsive (mobile nav, fluid type scale).

## Deploy

Works on any static host. Push this directory as-is to GitHub Pages, Vercel, or Netlify.

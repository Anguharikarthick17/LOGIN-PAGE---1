# LOGIN-PAGE---1

> **GENZLOG Project #001 — LOGIN PAGE**
> An architectural, developer-first monochrome authentication UI kit and interactive 3D centerpiece built with React, TypeScript, Tailwind CSS, and Three.js.

---

## Overview

**GENZLOG Project #001 — LOGIN PAGE** is an open-source, production-ready authentication interface designed for modern web applications. Engineered with disciplined minimalism and a strict monochrome palette, it balances high-contrast typography, accessible form controls, and an interactive real-time 3D Torus Knot sculpture with studio lighting and physics-based state reactivity.

---

## Key Features

- **Strict Monochrome Palette:** Meticulously tailored `#050505` background, `#111111` card surfaces, `#303030` structural borders, `#FFFFFF` primary text, and `#A3A3A3` secondary text.
- **Interactive 3D Chrome Sculpture:** Real-time Three.js Torus Knot and concentric orbital gyro-ring with neutral studio lighting, ACES filmic tone mapping, and cursor-tracked camera parallax.
- **State-Reactive Animations:**
  - *Idle:* Slow, deliberate floating rotation.
  - *Email Focus:* Mechanical lean toward the credential input.
  - *Valid Email:* Understated specular gleam pulse traveling along the outer orbit ring.
  - *Password Focus:* Transitions into a tighter, enclosed geometric state.
  - *Password Visibility Toggle:* Subtle mechanical tilt acknowledging reveal status.
  - *Submission:* Axis alignment, harmonic spin acceleration, and convergence into verified demo state.
- **Accessible Credential Form:**
  - Type-safe validation powered by **React Hook Form** and **Zod**.
  - Password visibility toggle with accessible ARIA labeling.
  - Fixed-height validation error containers preventing vertical layout shift.
  - Monochromatic high-contrast `ShineButton` with a continuous traveling specular sweep.
- **Graceful WebGL Fallback:** Clean vector geometry fallback if WebGL is unavailable in the client environment.
- **Client-Side Simulation:** Honest demo validation state with explicit simulation notices for seamless integration into production auth providers (Supabase, Auth0, Firebase, Clerk, or NextAuth).

---

## Technology Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Form Management & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/)

---

## Prerequisites

- **Node.js:** v18.0.0 or later (Node 20+ recommended)
- **Package Manager:** `npm` (v9+), `pnpm`, or `yarn`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anguharikarthick17/LOGIN-PAGE---1.git
cd LOGIN-PAGE---1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with hot module replacement (HMR). |
| `npm run build` | Type-checks code with `tsc` and creates an optimized production bundle in `dist/`. |
| `npm run lint` | Runs ESLint across the codebase. |
| `npm test` | Runs the Vitest test suite. |
| `npm run preview` | Locally previews the production build. |

---

## Project Structure

```
.
├── public/
│   ├── genzlog-logo.png        # Official GENZLOG brand logo mark
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/               # LoginForm and LoginSuccess components
│   │   ├── brand/              # BrandIdentity and logo handling
│   │   ├── canvas/             # Interactive Three.js sculpture
│   │   └── ui/                 # Input, ShineButton, and InteractiveTypography
│   ├── config/                 # Brand and theme configurations
│   ├── tests/                  # Unit and integration test suites
│   ├── types/                  # TypeScript interface and Zod schema definitions
│   ├── utils/                  # Utility helpers (cn, class merging)
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Design tokens, keyframes, and base styles
│   └── main.tsx                # Application mount point
├── eslint.config.js            # ESLint rules
├── index.html                  # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Authentication & Production Integration

This repository delivers a client-side interaction kit. By design, no backend credentials or secrets are bundled.

To connect this interface to your production authentication backend:
1. Open [`src/components/auth/LoginForm.tsx`](src/components/auth/LoginForm.tsx).
2. Replace the simulated submit handler inside `handleFormSubmit` with your auth client SDK (e.g., `supabase.auth.signInWithPassword`, `signIn('credentials', ...)` in NextAuth, or Clerk's `signIn.create`).
3. Handle session token storage and route redirection based on your application architecture.

---

## License

MIT License — Feel free to customize and integrate this UI kit into personal or commercial projects.

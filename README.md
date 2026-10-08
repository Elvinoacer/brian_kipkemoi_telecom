# Brian Kipkemoi — Electrical & Telecommunications Engineering Portfolio

A single-page, evidence-led engineering portfolio for **Brian Kipkemoi**, B.Eng. Electrical &
Telecommunications Engineering graduate (Moi University, Kenya), focused on wireless networks,
communication systems and connected infrastructure.

Built to the specification in `BRIAN_KIPKEMOI_ELECTRICAL_TELECOM_PORTFOLIO_SPEC.md`.

---

## ✨ Highlights

### Signature experience (elite layer)

- **Boot-sequence preloader** — a ~1.7s "establishing uplink" handshake (progress counter,
  boot log, signal bars) that wipes away with an expo curtain reveal.
- **Custom magnetic cursor** — instant dot + lagging ring that expands over interactive
  elements and shows an `OPEN` label over project cards (fine-pointer devices only).
- **Kinetic hero typography** — giant `BRIAN` (hollow outline) / `KIPKEMOI` (animated
  signal gradient) in Syne display type with masked word-by-word entrance, rotating role
  line, and scroll-linked parallax exit.
- **Living network constellation** — a canvas particle field with proximity links, traveling
  packet sparks and mouse attraction (DPR-capped, pauses offscreen / on hidden tabs).
- **Live telemetry strip** — RX power, SNR, packet delivery and latency values that tick
  with a gentle random walk, echoed on the portrait's floating chips.
- **Dual display marquees** — giant `FROM SIGNALS TO SERVICE` ribbon over a reversed
  protocol ticker.
- **Magnetic CTAs & tilt cards** — buttons gravitate toward the cursor; project cards tilt
  in 3D with a moving glare highlight, sheen sweep and index watermarks.
- **Right-rail dot navigation** — travelling active indicator with mono tooltips (XL+).
- **Finale** — `GOT A SIGNAL / WORTH CARRYING?` giant outline + gradient sign-off with
  magnetic contact buttons.
- **Film grain + aurora** — fixed SVG-noise overlay and slow-drifting gradient blobs add
  atmosphere without stealing attention.

### Core portfolio

- **Dark, high-contrast telecom design language** — deep-navy `#081018` surfaces, telecom-cyan /
  signal-green / RF-violet / warning-amber accents, Syne display + Geist Sans + Geist Mono.
- **Flagship final-year case study** — LoRa long-range telemetry system with animated system
  architecture, link-budget calculations, RSSI/SNR + PDR charts (Recharts), power analysis and a
  full field-test table.
- **Six filterable project case studies** — each opens a 13-section engineering case study
  (Problem → Requirements → Constraints → Architecture → Calculations → Hardware/Software →
  Protocols → Testing → Results → Limitations → Lessons → Improvements).
- **Interactive instruments** — animated RF spectrum analyzer (hover to inspect), breathing QPSK
  constellation, layer-map visualizations, animated skill proficiency dots (no percentages).
- **Motion everywhere, respectfully** — Framer Motion scroll reveals, staggered grids, marquee
  protocol ribbon, scroll-progress bar, active-section nav, count-up stats, timeline spine that
  draws itself — all honoring `prefers-reduced-motion`.
- **Recruiter-ready** — one-page CV PDF download, SEO metadata + JSON-LD Person schema,
  semantic HTML, keyboard-accessible cards/dialogs, ARIA labels, WCAG-AA contrast.

## 🧱 Tech Stack

| Layer      | Choice                                        |
|------------|-----------------------------------------------|
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript 5 |
| Styling    | Tailwind CSS 4 + shadcn/ui (New York)        |
| Motion     | Framer Motion 12                              |
| Charts     | Recharts (RSSI/SNR, PDR, BER curves)         |
| Fonts      | Syne (display) + Geist + Geist Mono (next/font) |
| Extras     | lucide-react icons, custom canvas/SVG visuals |

## 🚀 Getting Started

```bash
bun install        # or npm install / pnpm install
bun run dev        # or npm run dev → http://localhost:3000
```

Production build:

```bash
bun run build
bun run start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx            # SEO metadata, JSON-LD Person schema, fonts
│   ├── globals.css           # Design tokens: dark telecom theme + animations
│   └── page.tsx              # Single-page assembly + case-study dialog state
├── components/
│   └── portfolio/
│       ├── nav.tsx                 # Sticky glass nav, scroll progress, active section
│       ├── hero.tsx                # Name, headline, portrait, CTAs, marquee
│       ├── snapshot.tsx            # Candidate stats with count-up
│       ├── featured-project.tsx    # Flagship LoRa project w/ evidence tabs
│       ├── projects.tsx            # Filterable project grid
│       ├── project-dialog.tsx      # 13-section engineering case study
│       ├── experience.tsx          # Industrial attachment + 6 laboratories
│       ├── capabilities.tsx        # 5 focus areas + spectrum + reasoning frameworks
│       ├── skills.tsx              # Proficiency-graded skills + tools grid
│       ├── education.tsx           # Degree card + coursework explorer
│       ├── timeline.tsx            # 2021→2026 scroll-drawn timeline
│       ├── learning.tsx            # Currently-learning tracks
│       ├── philosophy.tsx          # "Follow the signal" statement
│       ├── contact.tsx             # Contact CTAs, footer, back-to-top
│       ├── motion.tsx              # Reveal / stagger / count-up primitives
│       ├── waveform-canvas.tsx     # Live oscilloscope hero background
│       ├── signal-path.tsx         # Animated end-to-end signal path
│       ├── lora-architecture.tsx   # Animated telemetry chain diagram
│       ├── constellation-plot.tsx  # Animated QPSK constellation
│       ├── spectrum-analyzer.tsx   # Interactive RF spectrum canvas
│       └── charts.tsx              # RSSI/SNR, PDR, BER Recharts components
├── data/
│   └── portfolio.ts          # ← ALL content lives here (typed data model)
└── hooks/
    └── use-scroll.ts         # Active-section + scroll-progress hooks

public/
├── images/portfolio/        # Portrait, generated art, curated telecom photography
└── cv/brian-kipkemoi-cv.pdf # Downloadable one-page CV
```

## ✏️ Customizing Content

All copy, projects, skills, experience, education, timeline and learning tracks live in
**`src/data/portfolio.ts`** — a single typed data layer. Edit that file to update anything on
the site; no component changes required.

**Verification policy** (per spec): this build is a demonstration prototype. Before publishing:

- Replace the placeholder email / LinkedIn / GitHub in `profile`.
- Replace representative field-test values (RSSI/SNR/PDR tables, link-budget numbers) with real
  measurements — each is labeled as a sample dataset in the UI.
- Replace the generated portrait and demo CV with Brian's real photo and CV.
- Verify the industrial-attachment organization before naming it.

## 🌙 Theme

The site is a deliberate single dark theme (no toggle). Core tokens in `globals.css`:

| Token        | Value     | Use                          |
|--------------|-----------|------------------------------|
| background   | `#081018` | Page base                    |
| surface      | `#101923` | Cards                        |
| elevated     | `#162230` | Raised surfaces              |
| signal-cyan  | `#38BDF8` | Primary telecom accent       |
| signal-green | `#34D399` | Success / PDR / availability |
| signal-amber | `#FBBF24` | Warnings / transmission      |
| signal-violet| `#A78BFA` | DSP / secondary accents      |

## 📄 License

Personal portfolio project for Brian Kipkemoi. Photography sourced for demonstration;
generated artwork created for this prototype.

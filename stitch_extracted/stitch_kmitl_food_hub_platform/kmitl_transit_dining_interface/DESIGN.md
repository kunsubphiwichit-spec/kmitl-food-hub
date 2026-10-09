---
name: KMITL Transit & Dining Interface
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#5a4139'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#8e7067'
  outline-variant: '#e2bfb4'
  surface-tint: '#ad3300'
  primary: '#a93200'
  on-primary: '#ffffff'
  primary-container: '#d1430a'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59e'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006194'
  on-tertiary: '#ffffff'
  tertiary-container: '#007bb9'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#842500'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a hyper-clean, enterprise-grade digital experience for King Mongkut's Institute of Technology Ladkrabang (KMITL) students, faculty, and campus visitors navigating food courts, cafes, and inter-campus transit (EV shuttles, red songthaews, railway crossings). 

The emotional signature is high-velocity, reliable, and deeply structured:
- **Atmosphere:** Modern technical minimalism reminiscent of HeroUI and NextUI—combining deep contrast, razor-sharp geometric micro-borders (`border-zinc-200/80` or `border-zinc-800/80`), and calibrated frosted translucent backdrops (`backdrop-blur-md`).
- **Visual Discipline:** Strictly zero emoji usage. System status, food dietary tags, transit routes, and navigational indicators must rely solely on precise, monoline geometric SVG vector iconography (such as Lucide) at uniform stroke weights (1.5px to 2px).
- **Target Audience:** Engineering, IT, architecture, and science campus communities operating in high-distraction, quick-decision transit environments (e.g., checking live bus arrival countdowns while walking between lectures or scanning canteen stall queues).

## Colors

The palette balances KMITL’s institutional identity with high-performance utility:

- **Primary (`#F15A24` - KMITL Vermilion Orange):** The primary interaction and focal anchor. Reserved for primary call-to-actions, active route overlays, live ETA badges, and high-priority states. Must maintain WCAG AA contrast (minimum 4.5:1 against surfaces).
- **Secondary (`#0F172A` - Slate 900):** Provides anchor contrast. In light mode, it serves as the foundational text and header tone, grounding floating frosted surfaces with absolute legibility.
- **Tertiary (`#0284C7` - Sky Blue):** Dedicated to transit telematics, EV vehicle telemetry, track monitoring, and route status cues, creating an immediate semantic divide between food services (warm primary) and transit movements (cool tertiary).
- **Neutral (`#71717A` - Zinc Neutral Core):** Scaled across pure white `#FFFFFF` canvases, layered cards (`rgba(255, 255, 255, 0.75)` / `rgba(24, 24, 27, 0.75)`), subtle borders (`#E4E4E7`), and muted metadata text (`#52525B`).
- **Semantic Accents:** Emerald Green (`#059669`) for available seats/open stalls; Amber (`#D97706`) for transit delays; Rose (`#E11D48`) for cancellations or closed vendors.

## Typography

The type system prioritizes swift bilingual scanning across English and Thai script environments:

- **Primary Typeface (Inter):** Serves headlines and standard body copy. The tall x-height and neutral grotesque construction harmonize naturally with geometric modern Thai typefaces (such as Sukhumvit Tadmai / IBM Plex Sans Thai), preserving line balance when mixing currencies (฿), campus building acronyms (HM, ECC, KLLC), and food names.
- **Data & Label Typeface (Space Grotesk):** Deployed for bus route identifiers (`BUS-EV-01`), live departure clocks (`04 MIN`), ratings counters (`4.8 / 5.0`), and tabular pricing tags. Its tech-forward metrics infuse campus transit displays with an instrument-grade aesthetic.
- **Hierarchy Rules:** Large display elements must rely on tightened negative tracking (`-0.02em` to `-0.03em`) to deliver modern editorial weight, while small tabular tags use uppercase letter spacing (`+0.04em` to `+0.06em`).

## Layout & Spacing

A responsive 12-column fluid grid governs structural rhythm, translating effortlessly from dense mobile handheld viewports to desktop campus monitors:

- **Mobile Viewport (< 640px):** 4-column layout with `1rem` (16px) margins and `0.75rem` (12px) gutters. Focuses on single-column feed stacks for dining vendors and full-width telemetry cards for campus transit trackers.
- **Tablet Viewport (640px – 1024px):** 8-column layout with `2rem` (32px) margins and `1.5rem` (24px) gutters. Accommodates split views featuring live route maps alongside dining cards.
- **Desktop Viewport (> 1024px):** 12-column layout bounded by a `1280px` maximum container width, using `3rem` (48px) margins and `2rem` (32px) gutters.
- **Component Geometry:** Padding uses an 8pt base grid (`space-sm` at 8px, `space-md` at 16px, `space-lg` at 24px). Micro-spacings (`space-xs` at 4px) anchor inline icon-to-label alignment.

## Elevation & Depth

This system avoids heavy drop shadows, instead utilizing layered frosted depth, ambient surface tinting, and microscopic borders:

- **Surface Layer 0 (Canvas):** Crisp base background (`#F8FAFC` in light mode, `#09090B` in dark mode).
- **Surface Layer 1 (Base Cards & Containers):** Semi-translucent panels (`rgba(255, 255, 255, 0.85)` / `rgba(24, 24, 27, 0.75)`) combined with `backdrop-blur-md` and a fine `1px` structural boundary (`border-zinc-200/80` or `border-zinc-800/80`).
- **Surface Layer 2 (Floating Popovers, Menus, Live Pill Trackers):** Elevated via an ultra-subtle tinted shadow: `box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Active Interactions:** Hover and pressed states introduce a distinct 1px border shift to primary brand orange (`#F15A24`) or slate outline rather than casting dramatic drop shadows.

## Shapes

The design system embraces a calibrated medium-rounded aesthetic (`level 2`), echoing the refined soft geometry of modern UI kits:

- **Default UI Components:** 0.5rem (8px) corner radius applied to text input fields, small badges, notification toasts, and standard buttons.
- **Content Cards & Media Surfaces:** 1rem (16px) corner radius (`rounded-lg`) applied to restaurant summary cards, transit stop schedule modules, and food item photographs.
- **Floating Modals & Overlays:** 1.5rem (24px) corner radius (`rounded-xl`) applied to full-page bottom-sheets on mobile viewports, campus map control panels, and interactive checkout trays.
- **Filter Chips & Live Transit Badges:** Explicit pill capsules (`9999px`) to immediately signal interactive toggles and status markers.

## Components

### Buttons
- **Primary:** Solid `#F15A24` background with crisp white typography, font-weight 600, 8px corner radius (`rounded-md`), subtle ring transitions on focus (`ring-2 ring-primary/40`). Accompanying icons must be strict 18px SVG lines.
- **Secondary / Flat:** Translucent Slate/Zinc base (`rgba(15, 23, 42, 0.06)`), 8px corner radius, text `#0F172A`. High-velocity tap targets (minimum 44px height).
- **Ghost:** Transparent canvas with a clean `1px` border in `#E4E4E7`, switching to `#F15A24` on hover.

### Chips & Badges
- Pill-shaped (`rounded-full`) metadata tags.
- Food dietary tags (e.g., Halal, Vegetarian) use neutral zinc fills with geometric icons (e.g., leaf, wheat-off vectors; no emojis).
- Transit Status: Live EV shuttles carry pulsing 6px dots next to monospaced ETA typography (`Space Grotesk`, `label-md`).

### Cards
- **Food Vendor Card:** Frosted white or charcoal glass surface, top-fitted 16:9 aspect image container, 16px corner radius, hairline 1px border. Bottom meta row displays rating (star SVG + numerical score), walking distance (footprints/navigation arrow SVG), and queue wait-time indicator.
- **Transit Telematics Card:** High-contrast card with vehicle route numbers, real-time stop progress line diagrams, and high-visibility countdown clocks.

### Input Fields
- Clean recessed containers with a 1px border `#E4E4E7`, shifting to a crisp `#F15A24` outline with an ambient 3px glow (`ring-4 ring-orange-500/10`) on active focus.
- Left-aligned geometric search/pin vector icons (stroke width: 1.5px).

### Selection Controls (Checkboxes & Radios)
- Checkboxes: 20px rounded squares (4px radius) filled with solid `#F15A24` and a white checkmark SVG on selection.
- Radios: 20px circular containers with a centered 10px solid dot indicator.

### Dedicated Platform Modules
- **Transit Route Timeline:** Vertical track with solid 2px pathing lines and node circles indicating campus stops (e.g., Pra-Chom-Klao Hospital, ECC Building, Faculty of Architecture).
- **Canteen Stall Availability Gauge:** Segmented progress bar indicating kitchen order density (Green: `< 5 min`, Amber: `5-15 min`, Red: `> 15 min`).
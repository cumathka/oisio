# oiSio — Design System & Visual Tokens Specification

---

## 1. Principles

- **Clarity over Decoration**: Every pixel must serve data comprehension and decision-making.
- **Progressive Disclosure**: Surface primary metrics first; reveal evidence, raw tags, and deep traces on demand.
- **Evidence-Backed Aesthetics**: AI insights are marked with subtle, high-trust accents, never gaudy purple neon effects.
- **Speed & Tactility**: All interactive surfaces have distinct hover, active, focus-visible, and disabled states with 150ms ease transitions.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Neutral Surfaces (Dark Theme Default)

| Token                 | Hex / Value                 | Usage                            |
| --------------------- | --------------------------- | -------------------------------- |
| `--bg-canvas`         | `#080c14`                   | Main application background      |
| `--bg-surface`        | `#0d1424`                   | Primary cards, sidebars, headers |
| `--bg-surface-hover`  | `#131b2e`                   | Interactive hover states         |
| `--bg-surface-active` | `#1a243d`                   | Active / selected states         |
| `--border-subtle`     | `rgba(255, 255, 255, 0.08)` | Standard component dividers      |
| `--border-muted`      | `rgba(255, 255, 255, 0.14)` | Card borders, table headers      |
| `--border-focus`      | `#6366f1`                   | Keyboard focus rings             |

### 2.2 Text & Content Tokens

| Token              | Hex / Value | Usage                                     |
| ------------------ | ----------- | ----------------------------------------- |
| `--text-primary`   | `#f8fafc`   | Headlines, primary KPI numbers            |
| `--text-secondary` | `#94a3b8`   | Subtitles, descriptions, table cells      |
| `--text-muted`     | `#64748b`   | Timestamps, character counters, footnotes |

### 2.3 Semantic & Status Accents

| Semantic Role                 | Background Token           | Border Token               | Text Token          |
| ----------------------------- | -------------------------- | -------------------------- | ------------------- |
| **Pass / Success (Do First)** | `rgba(16, 185, 129, 0.10)` | `rgba(16, 185, 129, 0.25)` | `#34d399` (Emerald) |
| **Info / Plan**               | `rgba(59, 130, 246, 0.10)` | `rgba(59, 130, 246, 0.25)` | `#60a5fa` (Blue)    |
| **Warning / Optional**        | `rgba(245, 158, 11, 0.10)` | `rgba(245, 158, 11, 0.25)` | `#fbbf24` (Amber)   |
| **Danger / Critical**         | `rgba(244, 63, 94, 0.10)`  | `rgba(244, 63, 94, 0.25)`  | `#fb7185` (Rose)    |
| **AI Intelligence**           | `rgba(99, 102, 241, 0.12)` | `rgba(99, 102, 241, 0.30)` | `#a5b4fc` (Indigo)  |

---

## 3. Typography & Numerical Scales

- **Font Family**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
- **Numerical Formatting**: Tabular Numerals (`font-variant-numeric: tabular-nums;`) applied to all analytics scores, character counts, and metrics.
- **Scale**:
  - `Display`: `32px` / line-height `1.2` / font-weight `700`
  - `Heading 1`: `24px` / line-height `1.3` / font-weight `600`
  - `Heading 2`: `18px` / line-height `1.4` / font-weight `600`
  - `Body`: `14px` / line-height `1.5` / font-weight `400`
  - `Caption / Mono`: `12px` / line-height `1.4` / font-weight `500`

---

## 4. UI Component Primitives (`src/components/ui/`)

1. **Button**: Variants (`primary`, `secondary`, `ghost`, `danger`, `ai`), Sizes (`sm`, `md`, `lg`), with loading spinner support.
2. **Badge**: Status indicators (`success`, `warning`, `danger`, `info`, `ai`, `neutral`).
3. **Card**: Clean surface card with optional header, footer, and hover border elevation.
4. **Table**: Sticky header, compact rows, sort indicators, empty state fallback.
5. **Drawer / SlideOver**: Right-hand slide-over panel for deep evidence & traces.
6. **Tabs**: Segmented control with smooth active indicator.
7. **Dropdown / Select**: Accessible dropdown for project, language, and currency selection.
8. **Command Palette (`Cmd+K`)**: Modal dialog with fuzzy search for rapid navigation and actions.
9. **Progress Bar**: Accessible horizontal meter for health scores and character lengths.
10. **Tooltip**: Floating label for icon-only and collapsed sidebar states.

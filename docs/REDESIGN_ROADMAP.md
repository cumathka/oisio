# oiSio — Phased Redesign & Implementation Roadmap

---

## Phase Plan & Execution Gates

### Phase 1: Audit & Documentation (Completed)

- [x] Codebase inspection & baseline verification (`npm test`, `npm run typecheck`, `npm run build`)
- [x] `docs/UX_AUDIT.md` authored
- [x] `docs/DESIGN_SYSTEM.md` authored
- [x] `docs/INFORMATION_ARCHITECTURE.md` authored
- [x] `docs/REDESIGN_ROADMAP.md` authored

### Phase 2: Design Tokens & Atomic UI Primitives (`src/components/ui/*`)

- [ ] Implement `Button.tsx` (Variants, sizes, loading, focus rings)
- [ ] Implement `Badge.tsx` (Status accents for priority, source, confidence)
- [ ] Implement `Card.tsx` (Elevated surface, header, content, footer)
- [ ] Implement `Table.tsx` (Sticky header, sorting, compact padding)
- [ ] Implement `Drawer.tsx` (Slide-over evidence drawer for SEO traces)
- [ ] Implement `Tabs.tsx` (Segmented control navigation)
- [ ] Implement `Dropdown.tsx` (Accessible select for language, currency, project)
- [ ] Implement `Modal.tsx` & `CommandPalette.tsx` (`Cmd+K` keyboard navigator)
- [ ] Implement `ProgressBar.tsx` (Tabular progress meters)

### Phase 3: Layout, Navigation & Command Palette

- [ ] Implement `Sidebar.tsx` (Collapsible, grouped sections, tooltips, active states)
- [ ] Implement `Header.tsx` (Project switcher, date filter, language/currency dropdowns, Copilot trigger)
- [ ] Implement `MobileNav.tsx` (Bottom 5-tab navigation bar)
- [ ] Implement `AppLayout.tsx` unifying layout state

### Phase 4: Marketing Command Center (Overview Dashboard)

- [ ] Overall Health Score banner with short AI explanation
- [ ] Top 3 Priority Actions (DO FIRST, PLAN, OPTIONAL with WHAT/WHY/IMPACT/ACTION)
- [ ] Compact horizontal breakdown of channels (Technical, On-Page, SEA, Content, CRO)
- [ ] Contextual AI Growth Opportunity Banner

### Phase 5: Technical SEO & Keyword Suite

- [ ] Technical SEO audit view with Critical (3), Warnings (11), Passed (84) tabs
- [ ] SEO Issue Cards with "View Evidence" trigger that opens slide-over Drawer
- [ ] Interactive Keyword Intelligence table with search, intent tags, sortable volume/CPC
- [ ] Content Opportunity Board (TOFU / MOFU / BOFU funnel categorization)

### Phase 6: Google Ads SEA Suite & Split RSA Builder

- [ ] Step-by-step Campaign Builder wizard (Goal -> Market -> Budget -> Keywords -> RSA -> Review)
- [ ] Split layout RSA Live Google Preview
- [ ] Deterministic character validator (`<= 30` / `<= 90`) with one-click AI Auto-Shorten action
- [ ] Policy risk shield warning indicators

### Phase 7: Intelligence Suite & Collapsible Copilot

- [ ] Omnipresent right-side slide-in AI Marketing Copilot
- [ ] Context-aware prompt shortcuts ("Why did my SEO score change?", "Swiss localization check")
- [ ] AI Opportunity 4-quadrant Priority Matrix view

### Phase 8: Multi-Language & Multi-Currency Expansion

- [ ] Expand translation dictionaries for all 6 languages (`EN`, `DE`, `TR`, `FR`, `IT`, `ES`)
- [ ] Currency support across all views (`CHF`, `EUR`, `USD`, `GBP`, `TRY`)

### Phase 9: Verification, Testing & GitHub Push

- [ ] Run full Vitest suite (`npm test`)
- [ ] Static typecheck (`npm run typecheck`)
- [ ] Production build (`npm run build`)
- [ ] Browser interactive validation
- [ ] Git commit & push to GitHub

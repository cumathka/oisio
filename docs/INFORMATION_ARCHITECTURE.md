# oiSio — Information Architecture & Navigation Hierarchy

---

## 1. Global Navigation Structure

```
oiSio App (Workspace)
│
├── 1. Overview (Marketing Command Center)
│   ├── Overall Marketing Health Score (74/100)
│   ├── Compact Channel Health Bars (Technical, On-Page, SEA, Content, CRO)
│   ├── Top 3 Priority Actions (DO FIRST, PLAN, OPTIONAL)
│   ├── Contextual AI Growth Insight Banner
│   └── Live Activity & Quick Audit Trigger
│
├── 2. SEO Suite
│   ├── SEO Overview (Audits, Health Trends, Crawl Status)
│   ├── Technical SEO (Critical / Warnings / Passed tabs + Slide-Over Evidence Drawer)
│   ├── Keyword Intelligence (Intent, Volume, Difficulty, CPC, Position & Filtering)
│   ├── Content Authority & Topic Clusters (TOFU / MOFU / BOFU Opportunity Board)
│   └── Competitor Benchmark (Gap Scores & Topical Authority Comparison)
│
├── 3. Google Ads & SEA Suite
│   ├── SEA Overview (Ad Quality Score, Spend Efficiency, Conversion Lift)
│   ├── Step-by-Step Campaign Builder Wizard (10 Guided Steps)
│   ├── RSA Ad Builder & Split Live Google Preview (Headlines <= 30, Descriptions <= 90)
│   ├── Deterministic Character Validator with AI Auto-Shorten Action
│   └── Policy Risk Shield & Negative Keywords Generator
│
├── 4. Conversion & CRO Suite
│   ├── Landing Page Friction & Message Match Analyzer
│   └── A/B Experiment Cards (Hypothesis, Baseline vs Variant, Confidence)
│
├── 5. Intelligence & Copilot
│   ├── AI Opportunity Priority Matrix (Impact vs Effort 4-Quadrant View)
│   └── Omnipresent Collapsible Marketing Copilot (Context-Aware Q&A)
│
├── 6. Reports
│   ├── Executive White-Label PDF Builder
│   └── Scheduled Delivery & Email Automations
│
└── 7. Settings & Integrations
    ├── Workspace & Brand Voice Configuration
    ├── Connected Accounts (Google Search Console, Google Ads, GA4)
    ├── Team & RBAC Permissions (Owner, Admin, Manager, Editor, Viewer)
    └── Subscription & Usage Quota Metering
```

---

## 2. Global Header & Context Controls

- **Project / Domain Switcher**: `[ Project: Swiss SaaS Demo (example.ch) ▼ ]`
- **Command Palette (`Cmd+K`)**: Rapid search across pages, keywords, campaigns, and actions.
- **Date Range Selector**: `[ Last 28 Days ▼ ]` (7d, 28d, 90d, 12m, Custom).
- **Language Dropdown**: `[ 🌐 Deutsch (DE) ▼ ]` (Native names: English, Deutsch, Türkçe, Français, Italiano, Español).
- **Currency Dropdown**: `[ CHF ▼ ]` (CHF, EUR, USD, GBP, TRY).
- **Notification Center**: Dropdown for security audits, crawl notifications, and anomalies.
- **AI Assistant Toggle**: Instant button to open/close right-hand Copilot panel.

---

## 3. Responsive Breakpoints & Mobile IA

- **Desktop (>= 1024px)**: Full collapsible sidebar + top header + main content + optional right Copilot drawer.
- **Tablet (768px - 1023px)**: Icon-collapsed sidebar with tooltips + full main content.
- **Mobile (< 768px)**: Compact bottom navigation bar (`Overview`, `SEO`, `Ads`, `Copilot`, `More`) with native touch feel.

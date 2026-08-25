# AI MARKETING INTELLIGENCE PLATFORM (OISIO)

## MASTER ARCHITECTURE & TECHNICAL SPECIFICATION V2

---

### 1. COMPLETE SYSTEM ARCHITECTURE

```mermaid
graph TD
    Client[Client Apps: Web Browser / Mobile Browser / Admin] --> CDN[Cloudflare Edge / SSL / WAF / DDoS Protection]
    CDN --> Gateway[Next.js API Gateway / Reverse Proxy]

    subgraph Frontend [Presentation Layer - Next.js 15 / React 19 / Tailwind]
        AppRouter[App Router: /[locale]/dashboard, /[locale]/audit, /[locale]/ads]
        DesignSys[Design System: Tokens, Components, Light/Dark/System]
        i18nCore[i18n Engine: Language, Country, Currency, Locale Routing]
        StateStore[Zustand Store + TanStack React Query]
    end

    subgraph SecurityShield [Security & Boundary Control Layer]
        AuthGuard[NextAuth / JWT Session Validation]
        RBACEngine[RBAC & Permission Evaluator]
        SSRFShield[SSRF & Private IP Filter Guardrail]
        RateLimiter[Upstash Redis Sliding Window Rate Limiter]
        InputSanitizer[Zod Schema Validation & Prompt Injection Neutralizer]
    end

    subgraph CoreServices [Application Domain Services]
        ProjectService[Project & Domain Intelligence Service]
        CrawlerService[Enterprise Static/Headless Crawler Orchestrator]
        TechSEOService[Deterministic Technical SEO Rule Engine]
        KeywordService[Keyword & Intent Intelligence Service]
        ContentService[Topic Cluster & Content Authority Engine]
        GoogleAdsService[SEA & RSA Policy/Quality Engine]
        CROService[Landing Page & CRO Experiment Engine]
        DecisionEngine[AI Marketing Decision & Prioritization Matrix Engine]
        ReportService[White-Label PDF & Automated Report Generator]
        BillingService[Stripe Metered Subscription & Entitlement Engine]
    end

    subgraph AIOrchestration [AI & Model Routing Gateway]
        CostRouter[Model Tier Router: Mini / Reasoning / Generation]
        PromptSanitizer[Untrusted Content Barrier & Injection Guard]
        RAGVector[Postgres pgvector / Semantic Memory & Context Search]
        FactVerifier[Hallucination & Confidence Guardrail]
        AIProviders[OpenAI / Anthropic / Groq / Google Gemini APIs]
    end

    subgraph DataStorage [Persistence & Async Queue Layer]
        PrimaryDB[(PostgreSQL 16 Multi-Tenant DB)]
        RedisQueue[(Redis / BullMQ Async Jobs)]
        S3Storage[(S3 / Cloudflare R2: Crawl HTML / PDF Reports / Assets)]
    end

    Gateway --> SecurityShield
    SecurityShield --> CoreServices
    CoreServices --> AIOrchestration
    AIOrchestration --> AIProviders
    CoreServices --> DataStorage
    CoreServices --> RedisQueue
```

---

### 2. FOLDER STRUCTURE

```
oiSio/
├── .github/
│   └── workflows/              # CI/CD pipelines (test, lint, security, deploy)
├── docs/
│   └── architecture/          # Complete architectural blueprints & ERDs
├── src/
│   ├── app/                   # Next.js App Router with i18n dynamic routes
│   │   ├── [locale]/
│   │   │   ├── (auth)/        # Login, Register, Reset, Verify
│   │   │   ├── (dashboard)/   # Main Dashboard, Projects, Audits, Ads, SEO, Reports
│   │   │   ├── (marketing)/  # Landing Page, Pricing, Features, Legal (GDPR/Swiss)
│   │   │   └── layout.tsx
│   │   └── api/
│   │       └── v1/            # Versioned REST API endpoints
│   ├── components/
│   │   ├── ui/                # Atomic design system tokens & primitives
│   │   ├── dashboard/         # Dashboard widgets, KPI cards, Priority Matrix
│   │   ├── seo/               # Technical SEO cards, Issue inspectors, Evidence modals
│   │   ├── sea/               # Google Ads RSA builder, Character counter, Policy check
│   │   ├── ai/                # Marketing Copilot chat, Explanation modals
│   │   └── reports/           # White-label PDF templates & previews
│   ├── config/                # Environment variables, Plan limits, Supported locales
│   ├── core/
│   │   ├── ai/                # Model routing, prompt engineering, RAG, fact verification
│   │   ├── crawler/           # Multi-threaded crawler, robots.txt, canonical & sitemap parser
│   │   ├── seo/               # Deterministic SEO audit engine & scoring formulas
│   │   ├── sea/               # Google Ads campaign generator & RSA validator
│   │   └── security/          # SSRF protector, Prompt injection barrier, RBAC, Encryption
│   ├── db/
│   │   ├── schema/            # Drizzle/Prisma schema definitions
│   │   ├── migrations/        # SQL migration scripts
│   │   └── client.ts          # Database connection pool manager
│   ├── lib/
│   │   ├── i18n/              # Translation catalogs (EN, DE, TR, FR, IT, ES)
│   │   ├── queue/             # BullMQ background job runners
│   │   └── utils/             # Formatters, currency converters, unicode string meters
│   └── types/                 # Shared TypeScript interfaces & DTOs
├── tests/
│   ├── unit/                  # Business logic, score formulas, validator tests
│   ├── integration/           # API routes, Database transactions, Auth flow tests
│   ├── security/              # SSRF guard, Prompt injection, Rate limit tests
│   └── ai-eval/               # Deterministic AI quality & hallucination evaluation tests
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

### 3. DATABASE ERD (ENTITY RELATIONSHIP DIAGRAM)

```mermaid
erDiagram
    ORGANIZATION ||--o{ USER : contains
    ORGANIZATION ||--o{ SUBSCRIPTION : holds
    ORGANIZATION ||--o{ PROJECT : owns
    USER ||--o{ AUDIT_LOG : generates
    PROJECT ||--o{ CRAWL_SESSION : triggers
    CRAWL_SESSION ||--o{ CRAWLED_PAGE : stores
    CRAWLED_PAGE ||--o{ SEO_ISSUE : has
    PROJECT ||--o{ KEYWORD_TARGET : tracks
    PROJECT ||--o{ CAMPAIGN : designs
    CAMPAIGN ||--o{ AD_GROUP : groups
    AD_GROUP ||--o{ RSA_AD : produces
    PROJECT ||--o{ AI_RECOMMENDATION : generates
    PROJECT ||--o{ WHITE_LABEL_REPORT : exports

    ORGANIZATION {
        uuid id PK
        string name
        string slug
        string white_label_logo_url
        string brand_primary_color
        string custom_domain
        timestamp created_at
    }

    USER {
        uuid id PK
        uuid organization_id FK
        string email
        string password_hash
        string role "OWNER | ADMIN | MANAGER | EDITOR | VIEWER"
        string locale "en | de | tr | fr | it | es"
        boolean is_active
        timestamp created_at
    }

    PROJECT {
        uuid id PK
        uuid organization_id FK
        string domain
        string name
        string business_type
        string target_country
        string target_language
        string default_currency
        string brand_voice
        jsonb ai_memory
        float marketing_health_score
        timestamp created_at
    }

    CRAWL_SESSION {
        uuid id PK
        uuid project_id FK
        string status "PENDING | CRAWLING | ANALYZING | COMPLETED | FAILED"
        int total_pages
        int max_depth
        float crawl_duration_sec
        jsonb crawl_config
        timestamp created_at
    }

    CRAWLED_PAGE {
        uuid id PK
        uuid crawl_session_id FK
        string url
        int http_status
        string title
        string meta_description
        string canonical_url
        boolean is_indexable
        jsonb headers
        jsonb structured_data
        float load_time_ms
        string content_hash
    }

    SEO_ISSUE {
        uuid id PK
        uuid crawled_page_id FK
        string category "TECHNICAL | ON_PAGE | CONTENT | SPEED | SECURITY"
        string severity "CRITICAL | WARNING | NOTICE"
        string code
        string message
        jsonb evidence
        string confidence "HIGH | MEDIUM | LOW"
        boolean is_resolved
    }

    CAMPAIGN {
        uuid id PK
        uuid project_id FK
        string name
        string campaign_type "SEARCH | PMAX | DISPLAY"
        string bidding_strategy
        float target_cpa
        string status
    }

    RSA_AD {
        uuid id PK
        uuid ad_group_id FK
        jsonb headlines "array of 15 strings <= 30 chars"
        jsonb descriptions "array of 4 strings <= 90 chars"
        float quality_score
        jsonb policy_risks
    }

    AI_RECOMMENDATION {
        uuid id PK
        uuid project_id FK
        string title
        text description
        string impact "HIGH | MEDIUM | LOW"
        string effort "HIGH | MEDIUM | LOW"
        string priority "DO_FIRST | PLAN | OPTIONAL | IGNORE"
        string source "CRAWLER | SEARCH_CONSOLE | ADS_API | ESTIMATE"
        float confidence
        jsonb action_payload
        string status "PENDING | APPROVED | APPLIED | DISMISSED"
    }
```

---

### 4. API SPECIFICATION (/api/v1/)

All endpoints adhere to strict JSON schema validation, versioning, JWT Bearer authentication, and rate limiting:

| Method | Endpoint                         | Description                                        | Auth Scope     |
| ------ | -------------------------------- | -------------------------------------------------- | -------------- |
| POST   | `/api/v1/auth/login`             | Authenticate user & issue JWT/Session              | Public         |
| POST   | `/api/v1/auth/register`          | Register new organization & owner                  | Public         |
| GET    | `/api/v1/projects`               | List all accessible workspace projects             | Read Project   |
| POST   | `/api/v1/projects`               | Create new marketing intelligence project          | Write Project  |
| GET    | `/api/v1/projects/:id`           | Get project detail & marketing health score        | Read Project   |
| POST   | `/api/v1/crawl/start`            | Trigger asynchronous enterprise website crawl      | Execute Crawl  |
| GET    | `/api/v1/crawl/:sessionId`       | Poll crawl progress & discovered page stream       | Read Crawl     |
| GET    | `/api/v1/seo/audit/:projectId`   | Get deterministic technical & on-page SEO results  | Read SEO       |
| POST   | `/api/v1/keywords/research`      | Analyze keywords with intent, difficulty & CPC     | Read/Write SEO |
| POST   | `/api/v1/campaigns/google-ads`   | Generate Google Search Campaign & RSA Ads          | Write Ads      |
| POST   | `/api/v1/campaigns/validate-rsa` | Validate RSA length, Unicode & Google Ads policies | Read Ads       |
| GET    | `/api/v1/ai/recommendations`     | Get prioritized matrix recommendations             | Read AI        |
| POST   | `/api/v1/ai/copilot`             | Context-aware Marketing Copilot conversational Q&A | Execute AI     |
| POST   | `/api/v1/reports/pdf`            | Generate white-label PDF executive report          | Export Report  |
| GET    | `/api/v1/billing/usage`          | Inspect token, page crawl & API limits             | Read Billing   |

---

### 5. AI AGENT & MULTI-MODEL ORCHESTRATION ARCHITECTURE

1. **Untrusted Data Boundary**: Website content parsed by crawler is placed in quarantined raw blocks labeled `<UNTRUSTED_CONTENT>`. System prompts strictly forbid code execution or overriding system instructions.
2. **Deterministic-First Rule**: Scores (SEO Health, SEA Quality, RSA compliance) are computed deterministically in TypeScript. AI provides strategic interpretation, actionable recommendations, and copy generation.
3. **Multi-Tier Model Routing**:
   - **Tier 1 (Fast/Economy - e.g., GPT-4o-mini / Claude 3.5 Haiku / Llama 3.3 70B)**: Keyword intent classification, character counting, negative keyword matching, categorization.
   - **Tier 2 (Balanced/Creative - e.g., GPT-4o / Claude 3.5 Sonnet)**: RSA ad generation, content cluster strategy, localized translation, landing page value proposition critique.
   - **Tier 3 (Deep Reasoning - e.g., o1 / o3-mini / Claude 3.7 Sonnet Thinking)**: Anomaly root-cause analysis, complex competitor gap resolution, cross-channel budget prioritization.
4. **No-Hallucination Policy**: When third-party API metrics (Search Volume, Real CPC, Live Traffic) are unavailable, the system explicitly returns `status: "INSUFFICIENT_DATA"` or `is_estimate: true` with confidence intervals.

---

### 6. CRAWLER ARCHITECTURE & SSRF RESILIENCE

- **Two-Stage Execution**:
  1. _Stage 1 (Lightweight Fast HTML)_: High-throughput Node.js streaming parser with HTTP connection pooling, stream limits, robots.txt parsing, canonical resolution, sitemap recursion.
  2. _Stage 2 (Headless JS Browser)_: Triggered selectively for dynamic client-rendered SPA frameworks (React/Vue/Angular).
- **Hardened SSRF Protection**:
  - DNS resolution pre-check: All target hostnames are resolved to IP before connection.
  - Blacklist RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), Loopback (127.0.0.0/8), Link-Local (169.254.0.0/16 - AWS/Cloud Metadata), IPv6 mapped addresses (`::ffff:127.0.0.1`), Multicast, and Cloud metadata hostnames.
  - Redirect validation: Each HTTP 3xx redirect re-checks destination IP against the SSRF filter before following.

---

### 7. DESIGN SYSTEM & ACCESSIBILITY (WCAG 2.2 AA)

- **Palette Tokens**: Neutral slate/zinc foundation, high-contrast semantic indicators (Emerald for Pass, Amber for Warning, Rose for Critical, Indigo for AI Insights).
- **Themes**: Light, Dark, System auto-detect with zero-flicker CSS variable initialization.
- **Components**: KPI Metric Cards, Priority Matrix (Impact vs Effort), RSA Live Previewer with Unicode character meters, Interactive Issue Evidence Drawer, Responsive horizontal-scroll data tables.
- **Accessibility**: Keyboard focus rings, ARIA landmark roles, semantic tags (`<main>`, `<nav>`, `<section>`), contrast ratios exceeding 4.5:1 for standard text and 3:1 for graphical UI components.

---

### 8. MULTI-LANGUAGE & LOCALIZATION (i18n)

- **Supported Initial Locales**: English (`en`), German (`de`), Turkish (`tr`), French (`fr`), Italian (`it`), Spanish (`es`).
- **Separation of Concerns**:
  - `UI Locale`: Language of the interface buttons, labels, tooltips.
  - `Target Market Country & Language`: Target audience location (e.g., Switzerland `CH` / German `de-CH`).
  - `Target Currency`: `CHF`, `EUR`, `USD`, `GBP`, `TRY`.
- **Content Generation**: AI generates copy matching target locale nuances (e.g., Swiss German spelling without `ß`, specific regional search queries).

---

### 9. AUTHENTICATION & AUTHORIZATION (RBAC)

- **Authentication**: Modern session management with JWT / HTTP-only secure cookies, password hashing with Argon2id / bcrypt (work factor 12), MFA readiness.
- **RBAC Matrix**:
  - `OWNER`: Full organization control, billing, team invites, project deletion.
  - `ADMIN`: Manage projects, team members, integrations, API keys.
  - `MANAGER`: Create/edit projects, run crawls, generate campaigns, export reports.
  - `EDITOR`: View projects, generate copy/ads with approval, edit keywords.
  - `VIEWER`: Read-only access to dashboards, audit logs, and reports.

---

### 10. SECURITY ARCHITECTURE

- **Input Validation**: Zero implicit trust; all inputs validated with strict Zod schemas.
- **Prompt Injection Defense**: Untrusted site extracts wrapped in delimiter barriers; system instructions forbid evaluating page text as system commands.
- **OAuth & API Key Storage**: AES-256-GCM authenticated encryption for third-party tokens (Google Ads, Google Search Console) at rest.
- **Audit Logging**: Immutable event stream recording user ID, action, resource ID, IP address, timestamp, and metadata.

---

### 11. BACKGROUND JOB ARCHITECTURE

- **Engine**: Redis + BullMQ resilient distributed job queue.
- **Worker Queues**:
  - `queue:crawl`: Asynchronous multi-page crawler with concurrency throttles.
  - `queue:seo-audit`: Deterministic rule evaluator for crawled pages.
  - `queue:ai-generation`: Rate-limited AI prompt execution with retry backoff.
  - `queue:report-pdf`: Headless PDF compilation and S3 upload.
  - `queue:scheduled-tasks`: Weekly/monthly automated audit cron triggers.

---

### 12. SUBSCRIPTION & USAGE METERING

- **Tiers**: `FREE`, `STARTER`, `PRO`, `AGENCY`, `ENTERPRISE`.
- **Metered Quotas**:
  - Active Projects limit.
  - Crawled Pages / month.
  - AI Generation Tokens / month.
  - White-label PDF Reports.
  - Team Seats.
- **Real-Time Entitlement Check**: Middleware evaluates remaining quota before starting expensive crawl/AI jobs.

---

### 13. MVP ROADMAP (PHASED EXECUTION)

- **Phase 1 (Foundation & Security Shield)**: Project scaffolding, SSRF protector, Security middleware, Data accuracy schemas, Deterministic scoring engines, Unit/Security tests.
- **Phase 2 (Crawler & Technical SEO Engine)**: Enterprise crawler, robots/sitemap parser, deterministic technical SEO auditor, issue classifier.
- **Phase 3 (Google Ads & SEA Engine)**: Campaign builder, Unicode RSA validator, Ad policy engine, Landing page CRO analyzer.
- **Phase 4 (AI Decision Matrix & Copilot)**: Multi-model router, impact/effort prioritization engine, Context-aware Marketing Copilot.
- **Phase 5 (Multi-language UI & White-label Reports)**: Next.js i18n Dashboard, Live previewers, PDF export engine.

---

### 14. TESTING & QUALITY ASSURANCE STRATEGY

- **Unit Tests**: Coverage for SEO scoring algorithms, Unicode character counters, RSA policy validators, SSRF IP range verifiers.
- **Security Tests**: SSRF bypass suites (RFC 1918, Cloud metadata 169.254.169.254, 0.0.0.0, DNS rebinding simulations), Prompt injection resilience tests.
- **Deterministic AI Evaluations**: Golden test fixtures checking keyword classification consistency, zero hallucination on missing data.

---

### 15. DEPLOYMENT & OBSERVABILITY

- **Target**: Cloud-native (Docker containerized, Vercel / AWS ECS / Azure Container Apps).
- **Monitoring**: OpenTelemetry structured JSON logging, Sentry error tracking, Prometheus/Datadog metrics for job latency, token consumption, and crawl error rates.

---

### 16. ENVIRONMENT VARIABLE SPECIFICATION

- `NODE_ENV`: `development` | `production` | `test`
- `PORT`: Server listen port (default 3000)
- `DATABASE_URL`: PostgreSQL connection string (`postgresql://user:pass@host:5432/oisio`)
- `REDIS_URL`: Redis connection string (`redis://localhost:6379`)
- `AUTH_SECRET`: Random 256-bit secret for JWT signing and session encryption
- `ENCRYPTION_KEY`: 32-byte hex key for AES-256-GCM token storage
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`: LLM provider credentials
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Payment processing keys
- `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_ENDPOINT`: Storage credentials

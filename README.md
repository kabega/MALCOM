# Mälcom Market Intelligence Platform

A professional, responsive React and TypeScript web application for evidence-led opportunity discovery, investor matching, compliance review, and executive reporting.

Developed by **Kabega Fin-TECH**  
Contact: **daviskabega8@gmail.com / 0784884750**

## Product classification

This project is a **software system** delivered through a responsive **web application**. It is not merely an informational website.

## Main capabilities

- Executive dashboard with operational KPIs
- Pipeline growth, sector exposure, confidence, and matching visualizations
- Persistent opportunity records using Cloudflare D1 and Drizzle ORM
- Opportunity registration and validation
- Search and sector filtering
- Compliance approval, review, and hold workflow
- Append-only decision audit events
- Investor mandate matching and fit scores
- Approved source registry
- CSV opportunity export
- Notification-rule controls
- Governance and security-status panels
- Responsive desktop, tablet, and mobile navigation
- Human approval requirement before investor distribution

## Technology

- React 19 with TypeScript
- Vinext and Vite
- Tailwind CSS
- Recharts
- Lucide React
- Cloudflare Workers and D1
- Drizzle ORM and generated SQL migrations

## Project structure

| Path | Purpose |
| --- | --- |
| app/page.tsx | Responsive application interface and dashboards |
| app/api/opportunities/route.ts | Opportunity CRUD and workflow API |
| app/globals.css | Global design system |
| db/schema.ts | Relational database schema |
| db/index.ts | D1 database connection |
| drizzle/ | Versioned database migrations |
| .openai/hosting.json | Hosting and D1 configuration |
| BUILD_PROMPT.md | Product specification and master engineering prompt |

## Requirements

- Node.js 22.13 or newer
- pnpm 11 or npm

## Installation

Install packages with pnpm install, then start development with pnpm dev. Open the local address printed in the terminal.

## Production validation

To run only the frontend locally, use `npm run dev:frontend` and open http://127.0.0.1:5173. This preview uses the dashboard's sample data; database saves and compliance updates require the full backend.

Run pnpm lint and pnpm build.

## Database migrations

After changing db/schema.ts, run pnpm db:generate. Never rewrite a migration already applied in production; add a new migration for later schema changes.

## Security and compliance boundaries

- Accept only public, licensed, or issuer-approved information.
- Do not ingest material non-public information, stolen information, personal data without a lawful basis, or private director communications.
- Human compliance approval is required before distribution.
- The application does not execute trades or provide guaranteed investment outcomes.
- Production deployment should add organization-specific access roles, sanctions/PEP providers, mail delivery, monitoring, backups, retention enforcement, penetration testing, and legal review.

## Deployment

### Render frontend

The root `render.yaml` configures a Render Static Site for the frontend. In Render, select **New > Blueprint**, connect `kabega/MALCOM`, select `main`, and deploy the Blueprint.

- Build command: `npx --yes pnpm@11.25.0 install --frozen-lockfile && npm run build:frontend`
- Publish directory: `dist/frontend`
- Local production build: `npm run build:frontend`

This deployment displays sample data. Opportunity creation, saved compliance decisions, and persistent audit events require the Cloudflare Workers/D1 backend; the static site does not deploy that API. Render's sign-in protects the dashboard, not the published frontend.

### Cloudflare full application

The project is configured for deployment as a private ChatGPT Site with D1 persistence. The hosting process applies migrations before publishing the Worker.

Current application: https://malcom-market-intelligence-platform.kabegadavismayiga.chatgpt.site

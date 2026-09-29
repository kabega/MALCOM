# Mälcom Market Intelligence Platform — Master Build Prompt

Act as a senior full-stack product engineer, security-conscious architect, UX designer, and QA lead. Build a production-ready, responsive **market-intelligence software system** called **Mälcom Market Intelligence Platform**, developed by **Kabega Fin-TECH**. It is an authenticated web application—not a brochure website—and its purpose is to identify lawful, evidence-backed capital opportunities and match them to compatible investor mandates.

## Product outcome

Create a decision workspace where analysts can ingest opportunities from public, licensed, or issuer-approved sources; normalize and score the evidence; review compliance risks; approve distribution; match approved opportunities to investors; queue concise email briefs; and audit every material decision.

## Hard guardrails

- Never collect, infer, store, expose, or distribute material non-public information, private director communications, credentials, personal data without a lawful basis, or unlawfully obtained content.
- Require human approval before an opportunity can be distributed.
- Preserve source URL, source type, publication time, issuer, analyst, evidence excerpt, consent basis, confidence score, status history, and review notes.
- Do not execute trades, promise returns, or present output as financial advice.
- Apply least privilege, secure sessions, input validation, rate limiting, encryption, secret management, immutable audit logs, retention rules, and incident-response hooks.

## Roles and workflow

Roles: Admin, Analyst, Compliance Reviewer, Relationship Manager, and Read-only Executive.

Workflow: source intake → validation → normalization → duplicate check → evidence/confidence scoring → compliance review → approve/hold/reject → investor mandate matching → brief preview → human send approval → delivery status → audit trail.

## MVP capabilities

- Executive overview with approved, pending, matched, and pipeline KPIs.
- Opportunity radar with search, filters, confidence, value, sector, geography, and state.
- Opportunity detail with evidence trail, suggested investors, and approval controls.
- Investor profiles with sector, geography, ticket range, stage, risk appetite, and exclusions.
- Explainable match scores with positive and negative factors.
- Compliance queue for provenance, consent, conflicts, duplication, sanctions/PEP checks, MNPI risk, and privacy review.
- Source registry and allow-list.
- Email-brief queue, delivery log, and suppression handling.
- Admin settings, append-only audit log, CSV/PDF reporting, and operational metrics.

## Data and architecture

Use relational tables for users, roles, organizations, sources, source_items, opportunities, opportunity_evidence, opportunity_status_history, investors, investor_mandates, matches, compliance_reviews, brief_drafts, deliveries, suppressions, audit_events, and scoring_rules. Keep raw evidence separate from analyst summaries.

Use a React/TypeScript frontend; server-side APIs with schema validation and idempotency; PostgreSQL-compatible storage; migrations and synthetic seed data; pluggable source and email adapters; structured logs, request IDs, health checks, metrics, and alerting. Add automated tests for permissions, matching, compliance transitions, duplicate detection, and critical UI flows.

## Design direction

Use a precise institutional interface: deep navy/teal foundation, restrained gold highlights, warm neutral canvas, compact data tables, clear status chips, and strong information hierarchy. Avoid an oversized marketing hero; prioritize the working surface above the fold. Meet WCAG AA, keyboard navigation, visible focus states, semantic labels, empty/loading/error states, and reduced-motion support.

## Acceptance criteria

- Users can search/filter opportunities, inspect evidence, see match explanations, change review state, and receive immediate feedback.
- Only approved opportunities can be queued for distribution.
- Every status change records actor, time, old/new state, and rationale.
- Unapproved or flagged evidence is visibly blocked.
- Permission checks are enforced server-side.
- Demo data is explicitly synthetic.
- Build, lint, type-check, and tests pass; README documents setup, environment variables, threat assumptions, migrations, and deployment.

Deliver in controlled increments: (1) product shell and design system, (2) authenticated CRUD and audit history, (3) source intake and compliance workflow, (4) explainable matching, (5) approved email delivery, (6) reporting and hardening. At each increment, test, document decisions, and list unresolved risks.

Developer company: **Kabega Fin-TECH**  
Developer contact: **daviskabega8@gmail.com / 0784884750**.

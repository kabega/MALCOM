import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const opportunities = sqliteTable("opportunities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  company: text("company").notNull(),
  sector: text("sector").notNull(),
  summary: text("summary").notNull(),
  location: text("location").notNull(),
  valueMin: integer("value_min").notNull(),
  valueMax: integer("value_max").notNull(),
  confidence: integer("confidence").notNull(),
  matches: integer("matches").notNull().default(0),
  status: text("status", { enum: ["Approved", "Review", "Hold"] }).notNull().default("Review"),
  source: text("source").notNull(),
  published: text("published").notNull(),
  owner: text("owner").notNull().default("Unassigned"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const auditEvents = sqliteTable("audit_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  opportunityId: integer("opportunity_id").notNull(),
  action: text("action").notNull(),
  actor: text("actor").notNull(),
  detail: text("detail").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const investorMandates = sqliteTable("investor_mandates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  investor: text("investor").notNull(),
  sector: text("sector").notNull(),
  ticketMin: integer("ticket_min").notNull(),
  ticketMax: integer("ticket_max").notNull(),
  geography: text("geography").notNull(),
  riskScore: real("risk_score").notNull().default(0.5),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

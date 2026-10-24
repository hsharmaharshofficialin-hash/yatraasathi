import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  nameEn: text("name_en").notNull(),
  nameHi: text("name_hi").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryHi: text("summary_hi").notNull(),
  narrativeEn: text("narrative_en").notNull(),
  narrativeHi: text("narrative_hi").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  city: text("city").notNull(),
  areaEn: text("area_en").notNull(),
  areaHi: text("area_hi").notNull(),
  unesco: boolean("unesco").notNull().default(false),
  unescoRef: text("unesco_ref"),
  imageUrl: text("image_url").notNull(),
  imageCredit: text("image_credit").notNull(),
  dayHint: integer("day_hint").notNull().default(1),
});

export const sources = pgTable("sources", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  url: text("url"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }).notNull(),
  verifier: text("verifier").notNull(),
  notes: text("notes"),
});

export const etiquetteFacts = pgTable("etiquette_facts", {
  id: serial("id").primaryKey(),
  siteSlug: text("site_slug").notNull(),
  field: text("field").notNull(),
  valueEn: text("value_en").notNull(),
  valueHi: text("value_hi").notNull(),
  sourceCode: text("source_code"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  status: text("status").notNull(),
});

export const knowledgeFacts = pgTable("knowledge_facts", {
  id: serial("id").primaryKey(),
  siteSlug: text("site_slug"),
  claimEn: text("claim_en").notNull(),
  claimHi: text("claim_hi").notNull(),
  sourceCode: text("source_code"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  status: text("status").notNull(),
  tags: text("tags").notNull().default(""),
});

export const itineraries = pgTable(
  "itineraries",
  {
    id: serial("id").primaryKey(),
    guestId: text("guest_id").notNull(),
    clientId: text("client_id").notNull(),
    dayNumber: integer("day_number").notNull(),
    siteSlug: text("site_slug"),
    notes: text("notes").notNull().default(""),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
    rev: integer("rev").notNull().default(1),
  },
  (table) => [uniqueIndex("itineraries_guest_client").on(table.guestId, table.clientId)],
);

export const changelog = pgTable("changelog", {
  id: serial("id").primaryKey(),
  siteSlug: text("site_slug"),
  field: text("field"),
  message: text("message").notNull(),
  lang: text("lang").notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  status: text("status").notNull().default("public"),
});

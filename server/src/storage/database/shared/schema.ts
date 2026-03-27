import { pgTable, serial, timestamp, text, varchar, jsonb, integer, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { z } from "zod"

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 日记表
export const journalEntries = pgTable(
  "journal_entries",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }),
    text: text("text"),
    mood: varchar("mood", { length: 20 }), // happy, calm, sad
    images: jsonb("images").$type<string[]>().default(sql`'[]'::jsonb`),
    audio_uri: text("audio_uri"),
    audio_duration: integer("audio_duration"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("journal_entries_user_id_idx").on(table.user_id),
    index("journal_entries_created_at_idx").on(table.created_at),
    index("journal_entries_mood_idx").on(table.mood),
  ]
);

// 创建日记时的 Zod schema
export const insertJournalEntrySchema = z.object({
  user_id: z.string().uuid().optional(),
  text: z.string().optional(),
  mood: z.enum(["happy", "calm", "sad"]).nullable().optional(),
  images: z.array(z.string()).optional(), // 放宽限制，允许本地 URI
  audio_uri: z.string().nullable().optional(), // 允许 null
  audio_duration: z.number().int().nullable().optional(),
});

export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;

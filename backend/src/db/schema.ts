import { pgTable as table } from "drizzle-orm/pg-core";
import *  as t from "drizzle-orm/pg-core"

export const user = table("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 256 }).notNull(),
  email: t.varchar({ length: 256 }).notNull().unique(),
  password: t.varchar({ length: 256 }).notNull(),
  avatar: t.varchar({ length: 256 }).notNull().default("https://avatars.githubusercontent.com/u/124599?v=4"),
  createdAt: t.date().defaultNow()
}, (table) => {
  return {
    userIdIdx: t.index("userId_Idx").on(table.id)
  }
})

export const moodScore = table("moodScore", {
  id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
  createdBy: t.integer("createdBy").references(() => user.id).notNull(),
  anxietyLevel: t.integer().default(0).notNull(),
  lowMoodLevel: t.integer().default(0).notNull(),
  contentmentLevel: t.integer().default(0).notNull(),
  frustrationLevel: t.integer().default(0).notNull(),
  excitementLevel: t.integer().default(0).notNull(),
  createdAt: t.date().defaultNow()
})

export const diaryEntry = table("diaryEntry", {
  id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
  createdBy: t.integer("createdBy").references(() => user.id).notNull(),
  selfRating: t.integer().notNull(),
  text: t.varchar({ length: 256 }),
  createdAt: t.date().defaultNow()
})

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

import { pgTable as table } from "drizzle-orm/pg-core";
import *  as t from "drizzle-orm/pg-core"

export const user = table("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 256 }).notNull(),
  email: t.varchar({ length: 256 }).notNull().unique(),
})

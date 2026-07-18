import { pgTable, serial, text, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug"),
  category: text("category").notNull(),
  description: text("description"),
  story: text("story"),
  location: text("location"),
  area: text("area"),
  year: integer("year"),
  status: text("status").notNull().default("planning"),
  featured: boolean("featured").notNull().default(false),
  coverImage: text("cover_image"),
  images: text("images").array().notNull().default([]),
  floorPlans: text("floor_plans").array().notNull().default([]),
  videos: text("videos").array().notNull().default([]),
  materials: text("materials").array().notNull().default([]),
  latitude: real("latitude"),
  longitude: real("longitude"),
  clientName: text("client_name"),
  budget: text("budget"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;

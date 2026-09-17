import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, blogPostsTable } from "@workspace/db";
import {
  ListBlogPostsQueryParams,
  CreateBlogPostBody,
  GetBlogPostParams,
  UpdateBlogPostParams,
  UpdateBlogPostBody,
  DeleteBlogPostParams,
} from "@workspace/api-zod";

const router = Router();

function normalizePublishedAt(value: string | undefined): Date | null | undefined {
  if (value === undefined) return undefined;
  if (value.trim() === "") return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

router.get("/blog", async (req, res): Promise<void> => {
  const parsed = ListBlogPostsQueryParams.safeParse(req.query);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { category, limit } = parsed.data;

  let rows;
  if (category) {
    rows = await db.select().from(blogPostsTable).where(eq(blogPostsTable.category, category));
  } else {
    rows = await db.select().from(blogPostsTable);
  }
  if (limit) rows = rows.slice(0, limit);
  res.json(rows);
});

router.post("/blog", async (req, res): Promise<void> => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { publishedAt, ...blogPost } = parsed.data;
  const [row] = await db.insert(blogPostsTable).values({
    ...blogPost,
    ...(publishedAt === undefined
      ? {}
      : { publishedAt: normalizePublishedAt(publishedAt) }),
  }).returning();
  res.status(201).json(row);
});

router.get("/blog/:id", async (req, res): Promise<void> => {
  const { id } = GetBlogPostParams.parse(req.params);
  const [row] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.patch("/blog/:id", async (req, res): Promise<void> => {
  const { id } = UpdateBlogPostParams.parse(req.params);
  const parsed = UpdateBlogPostBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { publishedAt, ...blogPost } = parsed.data;
  const [row] = await db.update(blogPostsTable).set({
    ...blogPost,
    ...(publishedAt === undefined
      ? {}
      : { publishedAt: normalizePublishedAt(publishedAt) }),
  }).where(eq(blogPostsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/blog/:id", async (req, res): Promise<void> => {
  const { id } = DeleteBlogPostParams.parse(req.params);
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
  res.status(204).send();
});

export default router;

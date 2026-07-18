import { Router } from "express";
import { eq, sql, desc, asc } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  ListProjectsQueryParams,
  CreateProjectBody,
  GetProjectParams,
  UpdateProjectParams,
  UpdateProjectBody,
  DeleteProjectParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/projects/stats", async (req, res): Promise<void> => {
  const total = await db.select({ count: sql<number>`count(*)::int` }).from(projectsTable);
  const featured = await db.select({ count: sql<number>`count(*)::int` }).from(projectsTable).where(eq(projectsTable.featured, true));
  const byCategory = await db
    .select({ category: projectsTable.category, count: sql<number>`count(*)::int` })
    .from(projectsTable)
    .groupBy(projectsTable.category);
  const byStatus = await db
    .select({ status: projectsTable.status, count: sql<number>`count(*)::int` })
    .from(projectsTable)
    .groupBy(projectsTable.status);

  res.json({
    total: total[0]?.count ?? 0,
    featured: featured[0]?.count ?? 0,
    byCategory,
    byStatus,
  });
});

router.get("/projects/featured", async (req, res): Promise<void> => {
  const rows = await db.select().from(projectsTable).where(eq(projectsTable.featured, true));
  res.json(rows);
});

router.get("/projects", async (req, res): Promise<void> => {
  const parsed = ListProjectsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { category, featured, limit } = parsed.data;
  let query = db.select().from(projectsTable);
  const conditions: ReturnType<typeof eq>[] = [];
  if (category) conditions.push(eq(projectsTable.category, category));
  if (featured !== undefined) conditions.push(eq(projectsTable.featured, featured));

  let rows;
  if (conditions.length > 0) {
    const { and } = await import("drizzle-orm");
    rows = await db.select().from(projectsTable).where(and(...conditions)).orderBy(desc(projectsTable.featured), asc(projectsTable.id));
  } else {
    rows = await db.select().from(projectsTable).orderBy(desc(projectsTable.featured), asc(projectsTable.id));
  }

  if (limit) rows = rows.slice(0, limit);
  res.json(rows);
});

router.post("/projects", async (req, res): Promise<void> => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(projectsTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const { id: rawId } = GetProjectParams.parse(req.params);
  const [row] = await db.select().from(projectsTable).where(eq(projectsTable.id, rawId));
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.patch("/projects/:id", async (req, res): Promise<void> => {
  const { id: rawId } = UpdateProjectParams.parse(req.params);
  const parsed = UpdateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.update(projectsTable).set(parsed.data).where(eq(projectsTable.id, rawId)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/projects/:id", async (req, res): Promise<void> => {
  const { id: rawId } = DeleteProjectParams.parse(req.params);
  await db.delete(projectsTable).where(eq(projectsTable.id, rawId));
  res.status(204).send();
});

export default router;

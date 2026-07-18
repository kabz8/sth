import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, milestonesTable } from "@workspace/db";
import {
  ListMilestonesQueryParams,
  CreateMilestoneBody,
  UpdateMilestoneParams,
  UpdateMilestoneBody,
  DeleteMilestoneParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/milestones", async (req, res): Promise<void> => {
  const parsed = ListMilestonesQueryParams.safeParse(req.query);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { projectId } = parsed.data;

  let rows;
  if (projectId !== undefined) {
    rows = await db.select().from(milestonesTable).where(eq(milestonesTable.projectId, projectId)).orderBy(milestonesTable.sortOrder);
  } else {
    rows = await db.select().from(milestonesTable).orderBy(milestonesTable.sortOrder);
  }
  res.json(rows);
});

router.post("/milestones", async (req, res): Promise<void> => {
  const parsed = CreateMilestoneBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(milestonesTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/milestones/:id", async (req, res): Promise<void> => {
  const { id } = UpdateMilestoneParams.parse(req.params);
  const parsed = UpdateMilestoneBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(milestonesTable).set(parsed.data).where(eq(milestonesTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/milestones/:id", async (req, res): Promise<void> => {
  const { id } = DeleteMilestoneParams.parse(req.params);
  await db.delete(milestonesTable).where(eq(milestonesTable.id, id));
  res.status(204).send();
});

export default router;

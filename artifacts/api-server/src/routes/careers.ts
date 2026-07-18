import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, careersTable } from "@workspace/db";
import {
  CreateCareerBody,
  UpdateCareerParams,
  UpdateCareerBody,
  DeleteCareerParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/careers", async (req, res): Promise<void> => {
  const rows = await db.select().from(careersTable);
  res.json(rows);
});

router.post("/careers", async (req, res): Promise<void> => {
  const parsed = CreateCareerBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(careersTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/careers/:id", async (req, res): Promise<void> => {
  const { id } = UpdateCareerParams.parse(req.params);
  const parsed = UpdateCareerBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(careersTable).set(parsed.data).where(eq(careersTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/careers/:id", async (req, res): Promise<void> => {
  const { id } = DeleteCareerParams.parse(req.params);
  await db.delete(careersTable).where(eq(careersTable.id, id));
  res.status(204).send();
});

export default router;

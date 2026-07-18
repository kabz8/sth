import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, servicesTable } from "@workspace/db";
import {
  CreateServiceBody,
  UpdateServiceParams,
  UpdateServiceBody,
  DeleteServiceParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/services", async (req, res): Promise<void> => {
  const rows = await db.select().from(servicesTable).orderBy(servicesTable.sortOrder);
  res.json(rows);
});

router.post("/services", async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(servicesTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/services/:id", async (req, res): Promise<void> => {
  const { id } = UpdateServiceParams.parse(req.params);
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(servicesTable).set(parsed.data).where(eq(servicesTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/services/:id", async (req, res): Promise<void> => {
  const { id } = DeleteServiceParams.parse(req.params);
  await db.delete(servicesTable).where(eq(servicesTable.id, id));
  res.status(204).send();
});

export default router;

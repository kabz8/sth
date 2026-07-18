import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import {
  CreateTestimonialBody,
  UpdateTestimonialParams,
  UpdateTestimonialBody,
  DeleteTestimonialParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/testimonials", async (req, res): Promise<void> => {
  const rows = await db.select().from(testimonialsTable);
  res.json(rows);
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(testimonialsTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/testimonials/:id", async (req, res): Promise<void> => {
  const { id } = UpdateTestimonialParams.parse(req.params);
  const parsed = UpdateTestimonialBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(testimonialsTable).set(parsed.data).where(eq(testimonialsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/testimonials/:id", async (req, res): Promise<void> => {
  const { id } = DeleteTestimonialParams.parse(req.params);
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
  res.status(204).send();
});

export default router;

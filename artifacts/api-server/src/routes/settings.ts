import { Router, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, settingsTable } from "@workspace/db";
import { UpsertSettingBody } from "@workspace/api-zod";

const router = Router();

router.get("/settings", async (req: Request, res: Response): Promise<void> => {
  const rows = await db.select().from(settingsTable);
  res.json(rows);
});

router.put("/settings/:key", async (req: Request, res: Response): Promise<void> => {
  const key = Array.isArray(req.params.key) ? req.params.key[0] : req.params.key;
  const parsed = UpsertSettingBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const existing = await db.select().from(settingsTable).where(eq(settingsTable.key, key));
  let row;
  if (existing.length > 0) {
    [row] = await db.update(settingsTable)
      .set({ value: parsed.data.value, updatedAt: new Date() })
      .where(eq(settingsTable.key, key))
      .returning();
  } else {
    [row] = await db.insert(settingsTable).values({ key, value: parsed.data.value }).returning();
  }
  res.json(row);
});

export default router;

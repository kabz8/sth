import { Router, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, contactsTable } from "@workspace/db";
import {
  ListContactsQueryParams,
  CreateContactBody,
  UpdateContactParams,
  UpdateContactBody,
  DeleteContactParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/contacts", async (req: Request, res: Response): Promise<void> => {
  const parsed = ListContactsQueryParams.safeParse(req.query);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { status } = parsed.data;

  let rows;
  if (status) {
    rows = await db.select().from(contactsTable).where(eq(contactsTable.status, status));
  } else {
    rows = await db.select().from(contactsTable);
  }
  res.json(rows);
});

router.post("/contacts", async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateContactBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(contactsTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/contacts/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = UpdateContactParams.parse(req.params);
  const parsed = UpdateContactBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(contactsTable).set(parsed.data).where(eq(contactsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/contacts/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = DeleteContactParams.parse(req.params);
  await db.delete(contactsTable).where(eq(contactsTable.id, id));
  res.status(204).send();
});

export default router;

import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, appointmentsTable } from "@workspace/db";
import {
  ListAppointmentsQueryParams,
  CreateAppointmentBody,
  UpdateAppointmentParams,
  UpdateAppointmentBody,
  DeleteAppointmentParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/appointments", async (req, res): Promise<void> => {
  const parsed = ListAppointmentsQueryParams.safeParse(req.query);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const { status } = parsed.data;

  let rows;
  if (status) {
    rows = await db.select().from(appointmentsTable).where(eq(appointmentsTable.status, status));
  } else {
    rows = await db.select().from(appointmentsTable);
  }
  res.json(rows);
});

router.post("/appointments", async (req, res): Promise<void> => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(appointmentsTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/appointments/:id", async (req, res): Promise<void> => {
  const { id } = UpdateAppointmentParams.parse(req.params);
  const parsed = UpdateAppointmentBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(appointmentsTable).set(parsed.data).where(eq(appointmentsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/appointments/:id", async (req, res): Promise<void> => {
  const { id } = DeleteAppointmentParams.parse(req.params);
  await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id));
  res.status(204).send();
});

export default router;

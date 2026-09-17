import { Router, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db, teamMembersTable } from "@workspace/db";
import {
  CreateTeamMemberBody,
  UpdateTeamMemberParams,
  UpdateTeamMemberBody,
  DeleteTeamMemberParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/team", async (req: Request, res: Response): Promise<void> => {
  const rows = await db.select().from(teamMembersTable).orderBy(teamMembersTable.sortOrder);
  res.json(rows);
});

router.post("/team", async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateTeamMemberBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(teamMembersTable).values(parsed.data).returning();
  res.status(201).json(row);
});

router.patch("/team/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = UpdateTeamMemberParams.parse(req.params);
  const parsed = UpdateTeamMemberBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(teamMembersTable).set(parsed.data).where(eq(teamMembersTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/team/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = DeleteTeamMemberParams.parse(req.params);
  await db.delete(teamMembersTable).where(eq(teamMembersTable.id, id));
  res.status(204).send();
});

export default router;

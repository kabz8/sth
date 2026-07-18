import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, clientsTable, projectsTable } from "@workspace/db";
import {
  CreateClientBody,
  GetClientParams,
  UpdateClientParams,
  UpdateClientBody,
  DeleteClientParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/clients", async (req, res): Promise<void> => {
  const clients = await db.select().from(clientsTable);
  const projects = await db.select({ id: projectsTable.id, title: projectsTable.title }).from(projectsTable);
  const projectMap = new Map(projects.map(p => [p.id, p.title]));

  const rows = clients.map(c => ({
    ...c,
    projectTitle: c.projectId ? (projectMap.get(c.projectId) ?? null) : null,
  }));
  res.json(rows);
});

router.post("/clients", async (req, res): Promise<void> => {
  const parsed = CreateClientBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.insert(clientsTable).values(parsed.data).returning();
  res.status(201).json({ ...row, projectTitle: null });
});

router.get("/clients/:id", async (req, res): Promise<void> => {
  const { id } = GetClientParams.parse(req.params);
  const [row] = await db.select().from(clientsTable).where(eq(clientsTable.id, id));
  if (!row) { res.status(404).json({ error: "Not found" }); return; }

  let projectTitle: string | null = null;
  if (row.projectId) {
    const [proj] = await db.select({ title: projectsTable.title }).from(projectsTable).where(eq(projectsTable.id, row.projectId));
    projectTitle = proj?.title ?? null;
  }
  res.json({ ...row, projectTitle });
});

router.patch("/clients/:id", async (req, res): Promise<void> => {
  const { id } = UpdateClientParams.parse(req.params);
  const parsed = UpdateClientBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [row] = await db.update(clientsTable).set(parsed.data).where(eq(clientsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...row, projectTitle: null });
});

router.delete("/clients/:id", async (req, res): Promise<void> => {
  const { id } = DeleteClientParams.parse(req.params);
  await db.delete(clientsTable).where(eq(clientsTable.id, id));
  res.status(204).send();
});

export default router;

import { Router } from "express";
import { sql, eq } from "drizzle-orm";
import {
  db,
  projectsTable,
  clientsTable,
  contactsTable,
  appointmentsTable,
  teamMembersTable,
  blogPostsTable,
} from "@workspace/db";

const router = Router();

router.get("/analytics/summary", async (req, res): Promise<void> => {
  const [projTotal] = await db.select({ count: sql<number>`count(*)::int` }).from(projectsTable);
  const [clientTotal] = await db.select({ count: sql<number>`count(*)::int` }).from(clientsTable);
  const [msgTotal] = await db.select({ count: sql<number>`count(*)::int` }).from(contactsTable);
  const [pendingAppts] = await db.select({ count: sql<number>`count(*)::int` }).from(appointmentsTable).where(eq(appointmentsTable.status, "pending"));
  const [completedProjs] = await db.select({ count: sql<number>`count(*)::int` }).from(projectsTable).where(eq(projectsTable.status, "completed"));
  const [activeProjs] = await db.select({ count: sql<number>`count(*)::int` }).from(projectsTable).where(eq(projectsTable.status, "in_progress"));
  const [teamTotal] = await db.select({ count: sql<number>`count(*)::int` }).from(teamMembersTable);
  const [blogTotal] = await db.select({ count: sql<number>`count(*)::int` }).from(blogPostsTable);

  res.json({
    totalProjects: projTotal?.count ?? 0,
    totalClients: clientTotal?.count ?? 0,
    totalMessages: msgTotal?.count ?? 0,
    pendingAppointments: pendingAppts?.count ?? 0,
    completedProjects: completedProjs?.count ?? 0,
    activeProjects: activeProjs?.count ?? 0,
    totalTeamMembers: teamTotal?.count ?? 0,
    totalBlogPosts: blogTotal?.count ?? 0,
  });
});

router.get("/analytics/recent-activity", async (req, res): Promise<void> => {
  const contacts = await db.select().from(contactsTable).orderBy(sql`${contactsTable.createdAt} desc`).limit(5);
  const appointments = await db.select().from(appointmentsTable).orderBy(sql`${appointmentsTable.createdAt} desc`).limit(5);
  const projects = await db.select().from(projectsTable).orderBy(sql`${projectsTable.createdAt} desc`).limit(3);
  const posts = await db.select().from(blogPostsTable).orderBy(sql`${blogPostsTable.createdAt} desc`).limit(3);

  const activity = [
    ...contacts.map(c => ({
      id: `contact-${c.id}`,
      type: "contact" as const,
      message: `New message from ${c.name}`,
      createdAt: c.createdAt.toISOString(),
    })),
    ...appointments.map(a => ({
      id: `appt-${a.id}`,
      type: "appointment" as const,
      message: `Consultation booked by ${a.name} — ${a.projectType}`,
      createdAt: a.createdAt.toISOString(),
    })),
    ...projects.map(p => ({
      id: `project-${p.id}`,
      type: "project" as const,
      message: `Project added: ${p.title}`,
      createdAt: p.createdAt.toISOString(),
    })),
    ...posts.map(p => ({
      id: `blog-${p.id}`,
      type: "blog" as const,
      message: `Blog post: ${p.title}`,
      createdAt: p.createdAt.toISOString(),
    })),
  ];

  activity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(activity.slice(0, 15));
});

export default router;

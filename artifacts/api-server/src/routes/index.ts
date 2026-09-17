import { Router } from "express";
import healthRouter from "./health.js";
import projectsRouter from "./projects.js";
import servicesRouter from "./services.js";
import teamRouter from "./team.js";
import testimonialsRouter from "./testimonials.js";
import blogRouter from "./blog.js";
import careersRouter from "./careers.js";
import contactsRouter from "./contacts.js";
import appointmentsRouter from "./appointments.js";
import clientsRouter from "./clients.js";
import milestonesRouter from "./milestones.js";
import settingsRouter from "./settings.js";
import analyticsRouter from "./analytics.js";

const router = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(servicesRouter);
router.use(teamRouter);
router.use(testimonialsRouter);
router.use(blogRouter);
router.use(careersRouter);
router.use(contactsRouter);
router.use(appointmentsRouter);
router.use(clientsRouter);
router.use(milestonesRouter);
router.use(settingsRouter);
router.use(analyticsRouter);

export default router;

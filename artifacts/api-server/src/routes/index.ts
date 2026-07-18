import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import servicesRouter from "./services";
import teamRouter from "./team";
import testimonialsRouter from "./testimonials";
import blogRouter from "./blog";
import careersRouter from "./careers";
import contactsRouter from "./contacts";
import appointmentsRouter from "./appointments";
import clientsRouter from "./clients";
import milestonesRouter from "./milestones";
import settingsRouter from "./settings";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

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

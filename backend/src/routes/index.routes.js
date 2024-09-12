import { Router } from "express";
import sessionRoutes from "../modules/session/session.routes.js";
import medicalHistoryRoutes from "../modules/medicalHistory/medicalHistory.routes.js";
import availableTimeRoutes  from "../modules/calendar/availableTime/availableTime.routes.js";
import calendarRoutes  from "../modules/calendar/calendar.routes.js";
import consultationRoutes  from "../modules/calendar/consultation/consultation.routes.js";
const router = Router();

router.use("/session", sessionRoutes);
router.use("/medicalHistory", medicalHistoryRoutes);
router.use("/calendar", calendarRoutes);
router.use("/calendar/availableTime", availableTimeRoutes);
router.use("/calendar/consultation", consultationRoutes);

export default router;
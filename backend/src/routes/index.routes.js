import { Router } from "express";
import sessionRoutes from "../modules/session/session.routes.js";
import medicalHistoryRoutes from "../modules/medicalHistory/medicalHistory.routes.js";

const router = Router();

router.use("/session", sessionRoutes);
router.use("/medicalHistory", medicalHistoryRoutes);

export default router;
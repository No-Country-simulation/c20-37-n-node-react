import { Router } from "express";
import sessionRoutes from "../modules/session/session.routes.js";

const router = Router();

router.use("/session", sessionRoutes);

export default router;
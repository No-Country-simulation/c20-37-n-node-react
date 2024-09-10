import { Router } from "express";
import { passportCall } from "../../middlewares/passport.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import sessionController from "./session.controllers.js";

const router = Router();

router.post('/register', passportCall('register'), sessionController.userRegister);
router.post("/login", passportCall('login'), sessionController.userLogin);
router.put('/update/:id', passportCall('current'), authorization(["admin", "doctor", "user"]), sessionController.userUpdate);
router.get("/usersAll", passportCall("current"), authorization(["admin", "doctor"]), sessionController.getAll);
router.get("/verify-session", passportCall("current", { session: false }), sessionController.verificationSessions);
router.get("/logout", passportCall("current"), sessionController.logout);
router.get("/medicalhistory/:dni", passportCall("current"), authorization(["admin", "doctor", "user"]), sessionController.getByDni);

export default router;
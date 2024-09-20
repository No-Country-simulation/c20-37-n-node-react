import { Router } from "express";
import { passportCall } from "../../middlewares/passport.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import sessionController from "./session.controllers.js";

const router = Router();

router.post('/register', passportCall('register'), sessionController.userRegister);
router.post("/login", passportCall('login'), sessionController.userLogin);
router.put('/update/:id', passportCall('current'), authorization(["admin", "doctor", "user"]), sessionController.userUpdate);
router.get("/usersAll", sessionController.getAll);
router.get("/verify-session", passportCall("current", { session: false }), sessionController.verificationSessions);
router.get("/logout", passportCall("current"), sessionController.logout);
router.get("/medicalHistory/:dni", passportCall("current"), authorization(["admin", "doctor", "user"]), sessionController.getByDni);
router.get("/:dni", passportCall("current"), authorization(["admin", "doctor", "user"]), sessionController.getUserByDni);
router.delete("/delete/:dni", passportCall("current"), authorization(["admin"]), sessionController.deleteByDni);
router.post("/createPrescription/:dni", passportCall("current"), authorization(["doctor"]), sessionController.createPrescription);
router.delete("/deletePrescription/:dni/:index", passportCall("current"),authorization(["doctor","doctor", "user"]), sessionController.deletePrescription);

export default router;
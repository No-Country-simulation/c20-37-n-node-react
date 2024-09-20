import { Router } from "express";
import { authorization } from "../../../middlewares/authorization.middleware.js";
import { passportCall } from "../../../middlewares/passport.middleware.js";
import consultationControllers from "./consultation.controllers.js";

const router = Router();

router.get("/:id", passportCall("current"), authorization(["admin", "doctor", "user"]), consultationControllers.getConsultationByID);
router.get("/doctor/:doctorId/:start/:end", passportCall("current"), authorization(["admin", "doctor"]), consultationControllers.getConsultationByDoctorAndRangeTime);
router.get("/patient/:patientId/:start/:end", passportCall("current"), authorization(["admin", "user"]), consultationControllers.getConsultationByPatientAndRangeTime);

router.post("/", passportCall("current"), authorization(["admin", "doctor", "user"]), consultationControllers.create);

router.put("/:id", passportCall("current"), authorization(["admin", "doctor", "user"]), consultationControllers.updateByID);

router.delete("/:id", passportCall("current"), authorization(["doctor", "admin"]), consultationControllers.removeByID);

export default router;
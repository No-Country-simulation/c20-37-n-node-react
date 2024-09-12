import { Router } from "express";
import { authorization } from "../../../middlewares/authorization.middleware.js";
import { passportCall } from "../../../middlewares/passport.middleware.js";
import availableTimeControllers from "./availableTime.controllers.js";
const router = Router();

router.get("/:doctorId", passportCall("current"), authorization(["admin", "doctor", "user"]), availableTimeControllers.getAvailableTimeByDoctor);

router.get("/:doctorId/:start/:end", passportCall("current"), authorization(["admin", "doctor", "user"]), availableTimeControllers.getAvailableTimeByDoctorAndRangeTime);

router.post("/", passportCall("current"), authorization(["admin", "doctor"]), availableTimeControllers.create);

router.put("/:doctorId/:date", passportCall("current"), authorization(["admin", "doctor"]), availableTimeControllers.updateByDoctorAndDate);// un dia particular
router.put("/:doctorId", passportCall("current"), authorization(["admin", "doctor"]), availableTimeControllers.updateByDoctor);

router.delete("/:doctorId/:date", passportCall("current"), authorization(["doctor", "admin"]), availableTimeControllers.removeByDoctorAndDate); //eliminar un dia en particular por x razon

export default router;
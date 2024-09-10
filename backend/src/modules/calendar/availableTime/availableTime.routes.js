import {Router} from "express";
import {authorization} from "../../middlewares/authorization.middleware.js";
import {passportCall} from "../../middlewares/passport.middleware.js";

const router = Router();

router.get("/:id",passportCall("current"),authorization(["admin","doctor"]), );
router.get("/:doctorId/:start/:end",passportCall("current"),authorization(["admin","doctor", "user"]), );

router.post("/", passportCall("current"),authorization(["admin","doctor"]), );

router.put("/:doctorId/:date", passportCall("current"),authorization(["admi","doctor"]), );// un dia particular
router.put("/:doctorId/:dayOfWeek", passportCall("current"),authorization(["admi","doctor"]), );

router.delete("/:doctorId/:date",passportCall("current"),authorization(["doctor","admi"]),); //eliminar un dia en particular por x razon
router.delete("/:doctorId/day/:dayOfWeek",passportCall("current"),authorization(["doctor","admi"]),); //eliminar un dia de la semana de su horarios

export default router;
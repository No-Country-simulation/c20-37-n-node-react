import {Router} from "express";
import {authorization} from "../../middlewares/authorization.middleware.js";
import {passportCall} from "../../middlewares/passport.middleware.js";
import calendarControllers from "./calendar.controllers.js";

const router = Router();

router.get("/doctor/:id",passportCall("current"),authorization(["admin","doctor","user"]), calendarControllers.getCalendarByDoctor);
router.get("/patient/:id",passportCall("current"),authorization(["admin","user"]), calendarControllers.getCalendarByPatient);

router.post("/", passportCall("current"),authorization(["admin","user", "doctor"]),calendarControllers.create);

router.delete("/:ownerId",passportCall("current"),authorization(["admin"]), calendarControllers.removeByOwner );


export default router;
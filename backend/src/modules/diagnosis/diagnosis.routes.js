import { Router } from "express";
import diagnosisControllers from "./diagnosis.controllers.js"
import {authorization} from "../../middlewares/authorization.middleware.js";
import {passportCall} from "../../middlewares/passport.middleware.js";


const router = Router ();



router.get("/:id",passportCall("current"),authorization(["admin","doctor","user"]), diagnosisControllers.getById);
router.put("/:id",passportCall("current"),authorization(["doctor"
]), diagnosisControllers.update);
router.post ("/",passportCall("current"),authorization(["doctor"]), diagnosisControllers.create);
router.delete("/:id",passportCall("current"),authorization(["doctor"]), diagnosisControllers.remove);

export default router
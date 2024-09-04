import {Router} from "express";
import medicalHistoryController from "./medicalHistory.controllers.js";
import {authorization} from "../../middlewares/authorization.middleware.js";
import {passportCall} from "../../middlewares/passport.middleware.js";



const router = Router();

router.get("/:id",passportCall("current"),authorization(["admin","doctor","user"]), medicalHistoryController.getMedicalHistory);
router.put("/:id", passportCall("current"),authorization("doctor"), medicalHistoryController.medicalHistoryUpdate);
router.delete("/:id",passportCall("current"),authorization("doctor"), medicalHistoryController.removeSubdocumentById);

export default router;
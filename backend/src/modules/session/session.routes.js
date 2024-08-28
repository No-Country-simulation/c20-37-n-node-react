import {Router} from "express";
import {passportCall} from "../../middlewares/passport.middleware.js";
import sessionController from "./session.controllers.js";

const router = Router();

router.post('/register',passportCall('register'),sessionController.userRegister);


export default router;
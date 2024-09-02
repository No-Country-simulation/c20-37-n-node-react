import {Router} from "express";
import {passportCall} from "../../middlewares/passport.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import sessionController from "./session.controllers.js";

const router = Router();

router.post('/register',passportCall('register'),sessionController.userRegister);
router.post("/login",passportCall('login'),sessionController.userLogin);
router.put('/update/:id',passportCall('current'),authorization("admin"),sessionController.userUpdate);
router.get ("/usersAll",authorization("admin"),sessionController.getAll);

export default router;
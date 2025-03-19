
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
// import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as eventController from "./event.controller";
// import * as eventValidation from "./event.validation";
const router = Router();

router
    .post("/ccfs", eventController.ccfsEvent)

export default router;

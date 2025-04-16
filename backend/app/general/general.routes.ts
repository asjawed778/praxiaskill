import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as generalController from "./general.controller";
import * as generalValidation from "./general.validation";


const router = Router();

router
    .post("/contact-us", generalValidation.contactUs, catchError, generalController.contactUs)


export default router;
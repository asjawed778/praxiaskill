import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as paymentValidation from "./payment.validation";
import * as paymentController from "./payment.controller";

const router = Router();

router
    .post("/create-order", authMiddlerware.auth, paymentController.createOrder)



export default router;
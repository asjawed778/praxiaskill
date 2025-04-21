
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import * as authMiddlerware from "../common/middleware/auth.middleware";

const router = Router();

router
        .post('/send-signup-otp', userValidator.sendSignupOTP, catchError, userController.sendSignupOTP)
        .post('/verify-signup-otp', userValidator.verifySignupOTP, catchError, userController.verifySingupOTP)
        .post('/update-access-token', catchError, userController.updateAccessToken)
        .post('/login', userValidator.loginUser, catchError, userController.loginUser)
        .post('/logout', userController.logout)
        .post('/send-password-reset-link', userValidator.forgotPassword, userController.forgotPasswordSendToken)
        .post('/reset-password/:token', userValidator.resetPassword, catchError, userController.resetPassword)
        .patch('/update-password', authMiddlerware.auth, userValidator.updatePassword, catchError, userController.updatePassword);
        
export default router;


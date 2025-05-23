
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as fileUploadMiddleware from "../common/middleware/fileUpload.middleware";
const router = Router();

router
        .get('/all', authMiddlerware.auth, authMiddlerware.isSuperAdmin, catchError, userController.getAllUsers)
        .get('/me', authMiddlerware.auth, catchError, userController.getMe)
        .post('/send-signup-otp', userValidator.sendSignupOTP, catchError, userController.sendSignupOTP)
        .post('/verify-signup-otp', userValidator.verifySignupOTP, catchError, userController.verifySingupOTP)
        .post('/update-access-token', catchError, userController.updateAccessToken)
        .post('/login', userValidator.loginUser, catchError, userController.loginUser)
        .post('/logout', userController.logout)
        .post('/send-password-reset-link', userValidator.forgotPassword, userController.forgotPasswordSendToken)
        .post('/reset-password/:token', userValidator.resetPassword, catchError, userController.resetPassword)
        .patch('/update-password', authMiddlerware.auth, userValidator.updatePassword, catchError, userController.updatePassword)
        .patch('/status/:userId', authMiddlerware.auth, authMiddlerware.isSuperAdmin, userValidator.updateUserStatus, catchError, userController.updateUserStatus)
        .post('/add', authMiddlerware.auth, authMiddlerware.isSuperAdmin, userValidator.addUserByAdmin, catchError, userController.addUserByAdmin)
        .put('/:userId', authMiddlerware.auth, authMiddlerware.isSuperAdmin, userValidator.updateUserByAdmin, catchError, userController.updateUserByAdmin)
        .post('/assign-course', authMiddlerware.auth, authMiddlerware.isSuperAdmin, userValidator.assignCourseByAdmin, catchError, userController.assignCourseByAdmin)
        // .post('/profile-image', authMiddlerware.auth, fileUploadMiddleware.thumbnailUpload)
export default router;


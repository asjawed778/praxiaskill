import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { ICreateUser, ITempUser, IUser } from "./user.dto";
import createHttpError from "http-errors";
import { Payload } from "./user.dto";
import bcrypt from "bcryptjs";
import { sendEmail } from "../common/services/email.service";
import { resetPasswordEmailTemplate } from "../common/template/mail.template";
import * as jwthelper from "../common/helper/jwt.helper";
import { loadConfig } from "../common/helper/config.hepler";
import { UserRole } from "./user.schema";
import * as OTPSrvice from '../common/services/OTP.service';
import { emailQueue } from "../common/queue/queues/email.queue";
import * as CourseService from "../course/course.service";
import enrollmentSchema from "../course/enrollment.schema";
import { courseAssignmentEmailTemplate } from "../common/template/courseAssignmentEmailTemplate";

loadConfig();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
const BASE_URL: string = process.env.BASE_URL as string;

export const sendSignupOTP = asyncHandler(async (req: Request, res: Response) => {
  const data: IUser = req.body;

  const existingUser = await userService.getUserByEmail(data.email);
  if (existingUser) {
    throw createHttpError(409, "User already Exits");
  }

  if ("role" in data) {
    if (![UserRole.USER, UserRole.INSTRUCTOR].includes(data.role)) {
      throw createHttpError(400, "Invalid role. Role must be either USER or INSTRUCTOR.");
    }
  }

  await userService.clearTempUser(data.email);
  const result: Omit<ITempUser, "password"> = await userService.createTempUser(data);

  await OTPSrvice.sendOTP(result.email, "OTP for Registration");

  res.send(createResponse({}, "OTP sent successfully"));
});

export const verifySingupOTP = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const otpValid = await OTPSrvice.verifyOTP(data.email, data.otp);
  if (!otpValid) {
    throw createHttpError(401, "Invalid OTP or expired");
  }

  const tempUser = await userService.getTempUserByEmail(data.email);
  if (!tempUser) {
    throw createHttpError(404, "User not found, please register again");
  }

  const result: Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> = await userService.createUser(tempUser);
  await userService.clearTempUser(data.email);

  const payload: Payload = {
    _id: result._id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
  const { refreshToken, accessToken } = jwthelper.generateTokens(payload);

  const user: Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null = await userService.updateRefreshToken(
    result._id,
    refreshToken
  );
  if (!user) {
    throw createHttpError(
      500,
      "Failed to update refresh token, Login to continue"
    );
  }
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: false,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: false,
  });

  res.send(createResponse({ user, refreshToken, accessToken }, "User created successfully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const result: Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> = await userService.authenticateUserByEmail(data.email, data.password);

  const payload: Payload = {
    _id: result._id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
  const { refreshToken, accessToken } = jwthelper.generateTokens(payload);
  const user: Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null = await userService.updateRefreshToken(
    result._id,
    refreshToken
  );
  if (!user) {
    throw createHttpError(
      500,
      "Failed to update refresh token, Login to continue"
    );
  }
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: false,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: false,
  });

  res.send(createResponse({ user, refreshToken, accessToken }, "User LoggedIn successfully"));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    await userService.deleteRefreshToken(user._id);
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send(createResponse({}, "User logged out successfully"));
});

export const updateAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
  if (!refreshToken) {
    throw createHttpError(401, "Refresh token not found");
  }

  const { valid, decoded } = jwthelper.validateToken(
    refreshToken,
    REFRESH_TOKEN_SECRET
  );
  if (!valid || !decoded) {
    throw createHttpError(401, "Invalid refresh token, Please login again");
  }
  const payload: Payload = decoded as Payload;
  const user = await userService.getUserById(payload._id);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const newPayload: Payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const { accessToken, refreshToken: newRefreshToken } = jwthelper.generateTokens(newPayload);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  const result = await userService.updateRefreshToken(user._id, newRefreshToken);

  res.send(createResponse({ user: result, accessToken, refreshToken: newRefreshToken }, "Access token updated successfully"));
});

export const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(404, "User not found, please login again");
  }
  const isUser = await userService.getUserById(user._id);
  if (!isUser) {
    throw createHttpError(404, "User not found, please login again");
  }
  const data = req.body;
  const result = await userService.authenticateUserById(user._id, data.oldPassword);

  await userService.updatePassword(result._id, data.newPassword);

  res.send(createResponse({}, "Password updated successfully"));
}
);

export const forgotPasswordSendToken = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw createHttpError(404, "User not exists");
  }

  // Generate JWT for password reset, setting expiration time (e.g., 1 hour)
  const resetToken = await jwthelper.generatePasswordRestToken(user._id);

  await userService.updateResetToken(user._id, resetToken);

  const resetLink = `${BASE_URL}/reset-password/${resetToken}`;
  const emailContent = resetPasswordEmailTemplate(resetLink);

  await emailQueue.add('sendEmail', {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password reset Link",
    html: emailContent,
  });

  res.send(
    createResponse({}, "Reset password Link send successfully")
  );
});


/**
 * Verifies the password reset token and updates the user's password.
 * 
 * @async
 * @param {Request} req - The request object containing the reset token in the parameters and the new password in the body.
 * @param {Response} res - The response object to send a success message after the password reset.
 * @throws {HttpError} - Throws a 401 error if the token is invalid or expired.
 * @returns {Promise<void>} - Resolves when the password is reset successfully.
 */
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const { valid, decoded } = await jwthelper.verifyResetPasswordToken(token as string);
    if (!valid || !decoded) {
      throw createHttpError(401, "Link is expired or invalid...");
    }


    const user = await userService.resetPassword((decoded as any).userId, token, newPassword);

    res.send(createResponse(200, "Password reset successfully"));
  }
);

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { pageNo, limit, search, active } = req.query;
  const page = Number(pageNo) || 1;
  const limitNumber = Number(limit) || 10;
  const searchQuery = typeof search === 'string' ? search : undefined;
  const activeFilter = typeof active === 'string' ? active === 'true' : undefined;

  const users = await userService.getAllUsers(page, limitNumber, searchQuery, activeFilter);
  const result = await Promise.all(users.users.map(async (user) => {
    const coursesEnrolled = await enrollmentSchema.countDocuments({ userId: user._id });
    return {
      ...user,
      coursesEnrolled
    };
  }));
  res.send(createResponse({ ...users, users: result }, "All users fetched successfully"));
});

export const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await userService.updateUserStatus(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.send(createResponse(user, "User status updated successfully"));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(404, "User not found, please login again");
  }
  const result = await userService.getMe(user._id);
  if (!result) {
    throw createHttpError(404, "User not found, please login again");
  }
  res.send(createResponse(result, "User fetched successfully"));
});

export const addUserByAdmin = asyncHandler(async (req: Request, res: Response) => {
  const data: ICreateUser = req.body;

  const existingUser = await userService.getUserByEmail(data.email);
  if (existingUser) {
    throw createHttpError(409, "User already Exits");
  }

  if ("role" in data) {
    if (![UserRole.USER, UserRole.INSTRUCTOR].includes(data.role)) {
      throw createHttpError(400, "Invalid role. Role must be either USER or INSTRUCTOR.");
    }
  }

  const result = await userService.createUserByAdmin(data);

  const user = { ...result, coursesEnrolled: 0 };

  const resetToken = await jwthelper.generatePasswordRestToken(user._id);

  await userService.updateResetToken(user._id, resetToken);

  const resetLink = `${BASE_URL}/reset-password/${resetToken}`;
  const emailContent = resetPasswordEmailTemplate(resetLink);

  await emailQueue.add('sendEmail', {
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "Password reset Link",
    html: emailContent,
  });
  res.send(createResponse(user, "User created successfully"));
});

export const updateUserByAdmin = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data: ICreateUser = req.body;

  if ("role" in data) {
    if (![UserRole.USER, UserRole.INSTRUCTOR].includes(data.role)) {
      throw createHttpError(400, "Invalid role. Role must be either USER or INSTRUCTOR.");
    }
  }

  const result = await userService.updateUserByAdmin(userId, data);

  res.send(createResponse(result, "User updated successfully"));
}
);

export const assignCourseByAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { courseId, userId } = req.body;
  const user = await userService.getUserById(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const { course } = await CourseService.assignCourseByAdmin(userId, courseId);
  if (!course) {
    throw createHttpError(404, "Course not found");
  }
  const courseLink = `${BASE_URL}/my-courses`;
  const emailTemplate = courseAssignmentEmailTemplate(user.name, course.title, course.subtitle, course.thumbnail, courseLink);
  await emailQueue.add('sendEmail', {
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "Course Assigned",
    html: emailTemplate,
  });
  res.send(createResponse({}, "Course assigned successfully"));
});
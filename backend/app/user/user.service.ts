import { ITempUser, type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import bcrypt from 'bcryptjs';
import * as jwthelper from '../common/helper/jwt.helper';
import createHttpError from "http-errors";
import TempUserSchema from "./tempUser.schema";
import { omit } from "lodash";
import { loadConfig } from "../common/helper/config.hepler";

loadConfig();

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 12);
};

const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

export const clearTempUser = async (email: string) => {
    await TempUserSchema.deleteMany({ email });
};


export const createTempUser = async (data: ITempUser): Promise<Omit<ITempUser, "password">> => {
    const hashedPass = await hashPassword(data.password);
    const result = await TempUserSchema.create({ ...data, password: hashedPass });

    return omit(result.toObject() as ITempUser, ["password"]);
};


export const getTempUserByEmail = async (email: string): Promise<ITempUser> => {
    const result = await TempUserSchema.findOne({ email }).lean();
    return result as ITempUser;
}

export const createUser = async (tempUser: ITempUser): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken">> => {
    const profilePic = `${process.env.PROFILE_URL}${tempUser.name}`;
    const result = await UserSchema.create({ ...tempUser, profilePic });
    return omit(result.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
};

export const authenticateUserByEmail = async (email: string, password: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken">> => {
    const user = await UserSchema.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw createHttpError(401, "Incorrect password");
    }
    return omit(user.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}

export const authenticateUserById = async (id: string, password: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken">> => {
    const user = await UserSchema.findById(id);
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw createHttpError(401, "Incorrect password");
    }
    return omit(user.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}


export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email }).lean();
    return result as IUser;
};


export const updateRefreshToken = async (id: string, refreshToken: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null>  => {
    const user = await UserSchema.findByIdAndUpdate(id,
        { refreshToken },
        { new: true }
    );
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}


export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();

    return result;
}


export const deleteRefreshToken = async (id: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {
    const user = await UserSchema.findByIdAndUpdate(id, { refreshToken: '' });
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}


export const updatePassword = async(userId: string, newPassword: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {
    
    const hashedPass = await hashPassword(newPassword);
     
    const user = await UserSchema.findByIdAndUpdate(userId, {password: hashedPass});
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}

export const getInstructorList = async (): Promise<Pick<IUser, "_id" | "name" | "email" | "role" | "profilePic">[]> => {
    const instructors = await UserSchema.find({ role: "INSTRUCTOR" })
        .select("_id name email role profilePic")
        .lean(); 

    return instructors as Pick<IUser, "_id" | "name" | "email" | "role" | "profilePic">[];
};

export const getInstructorById = async (instructorId: string): Promise<Pick<IUser, "_id" | "name" | "email" | "role" | "profilePic"> | null> => {
    const instructor = await UserSchema.findOne(
      { _id: instructorId, role: "INSTRUCTOR" } 
    )
      .select("_id name email role profilePic")
      .lean();
  
    return instructor;
};
  

/**
 * Updates the reset password token for a user.
 * 
 * @param {string} userId - The ID of the user whose reset token is being updated.
 * @param {string} token - The reset password token to be stored in the database.
 * @returns {Promise<void>} A promise that resolves when the token is updated.
 */
export const updateResetToken = async(userId: string, token: string) => {
    await UserSchema.findByIdAndUpdate(userId, {resetPasswordToken: token});
}


/**
 * Resets the user's password if the provided token is valid.
 * 
 * @param {string} userId - The ID of the user who is resetting their password.
 * @param {string} token - The reset password token provided by the user.
 * @param {string} newPassword - The new password to be set for the user.
 * @throws {HttpError} Throws an error if the reset token is invalid or expired.
 * @returns {Promise<User | null>} A promise that resolves to the updated user document, or null if the user is not found.
 */
export const resetPassword = async(userId: string, token: string, newPassword: string) => {
    const user = await UserSchema.findById(userId);
    if(!user?.resetPasswordToken) {
        throw createHttpError(401, "Token expired or invalid");
    }
    const hashPass = await bcrypt.hash(newPassword, 12);
    const newUser = await UserSchema.findByIdAndUpdate(userId, 
        {
            password: hashPass, resetPasswordToken: null
        }, {new: true}
    );

    return newUser;
}


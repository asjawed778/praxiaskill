import { ICreateUser, ICreateUserResponse, IGetUserResponse, ITempUser, type IUser } from "./user.dto";
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


export const createUserByAdmin = async (data: ICreateUser): Promise<ICreateUserResponse> => {
    const hashedPass = await hashPassword("Praxia@123");
    const profilePic = data.profilePic || `${process.env.PROFILE_URL}${data.name}`;
    const result = await UserSchema.create({ ...data, password: hashedPass, profilePic });
    const userResponse = omit(result.toObject(), ["password", "refreshToken", "resetPasswordToken"]) as Partial<ICreateUserResponse>;
    if (!userResponse._id || !userResponse.name || !userResponse.email || !userResponse.role) {
        throw createHttpError(500, "User creation failed: Missing required fields");
    }
    return userResponse as ICreateUserResponse;
};

export const updateUserByAdmin = async (userId: string, data: ICreateUser): Promise<ICreateUserResponse> => {
    const user = await UserSchema.findByIdAndUpdate(userId, data, { new: true });
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    const userResponse = omit(user.toObject(), ["password", "refreshToken", "resetPasswordToken"]) as Partial<ICreateUserResponse>;
    if (!userResponse._id || !userResponse.name || !userResponse.email || !userResponse.role) {
        throw createHttpError(500, "User update failed: Missing required fields");
    }
    return userResponse as ICreateUserResponse;
};

export const getTempUserByEmail = async (email: string): Promise<ITempUser> => {
    const result = await TempUserSchema.findOne({ email }).lean();
    return result as ITempUser;
};

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


export const updateRefreshToken = async (id: string, refreshToken: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {
    const user = await UserSchema.findByIdAndUpdate(id,
        { refreshToken },
        { new: true }
    );
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}

export const getMe = async (id: string) => {
    const result = await UserSchema.findById(id).select("-password -refreshToken -resetPasswordToken").lean();
    return result as Omit<IUser, "password" | "refreshToken" | "resetPasswordToken">;
}

export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();
    return result;
}


export const deleteRefreshToken = async (id: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {
    const user = await UserSchema.findByIdAndUpdate(id, { refreshToken: '' });
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
}


export const updatePassword = async (userId: string, newPassword: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {

    const hashedPass = await hashPassword(newPassword);

    const user = await UserSchema.findByIdAndUpdate(userId, { password: hashedPass });
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
export const updateResetToken = async (userId: string, token: string) => {
    await UserSchema.findByIdAndUpdate(userId, { resetPasswordToken: token });
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
export const resetPassword = async (userId: string, token: string, newPassword: string) => {
    const user = await UserSchema.findById(userId);
    if (!user?.resetPasswordToken) {
        throw createHttpError(401, "Token expired or invalid");
    }
    const hashPass = await bcrypt.hash(newPassword, 12);
    const newUser = await UserSchema.findByIdAndUpdate(userId,
        {
            password: hashPass, resetPasswordToken: null
        }, { new: true }
    );

    return newUser;
}

function escapeRegex(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const getAllUsers = async (
    pageNo: number,
    limit: number,
    search?: string,
    active?: boolean 
): Promise<{
    users: IGetUserResponse[];
    totalDocs: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}> => {
    const skip = (pageNo - 1) * limit;

    // Base query always excludes SUPER_ADMIN
    const baseQuery: Record<string, any> = {
        role: { $ne: "SUPER_ADMIN" }
    };

    // Add active status filter if provided
    if (typeof active === 'boolean') {
        baseQuery.active = active;
    }

    // Enhanced search query
    const finalQuery = search ? {
        $and: [
            baseQuery,
            {
                $or: [
                    { name: { $regex: escapeRegex(search), $options: 'i' } },
                    { email: { $regex: escapeRegex(search), $options: 'i' } }
                ]
            }
        ]
    } : baseQuery;

    const usersQuery = UserSchema.find(finalQuery)
        .select("_id name email role profilePic active")
        .skip(skip)
        .limit(limit)
        .lean();

    const totalDocs = await UserSchema.countDocuments(finalQuery);

    const users = await usersQuery;

    const totalPages = Math.ceil(totalDocs / limit);
    const currentPage = pageNo;
    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;

    return {
        users: users as IGetUserResponse[],
        totalDocs,
        currentPage,
        totalPages,
        hasNext,
        hasPrev
    };
};

export const updateUserStatus = async (userId: string) => {
    const user = await UserSchema.findById(userId);
    if (!user) {
        throw createHttpError(404, "User not found");
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
        userId,
        { active: !user.active },
        { new: true }
    );

    return omit(updatedUser?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
};

import { ICreateUser, ICreateUserResponse, IGetUserResponse, ITempUser, type IUser } from "./user.dto";
import UserSchema, { UserRole } from "./user.schema";
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
};

export const getMe = async (id: string) => {
    const result = await UserSchema.findById(id).select("-password -refreshToken -resetPasswordToken").lean();
    return result as Omit<IUser, "password" | "refreshToken" | "resetPasswordToken">;
};

export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();
    return result;
};

export const deleteRefreshToken = async (id: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {
    const user = await UserSchema.findByIdAndUpdate(id, { refreshToken: '' });
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
};

export const updatePassword = async (userId: string, newPassword: string): Promise<Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> | null> => {

    const hashedPass = await hashPassword(newPassword);

    const user = await UserSchema.findByIdAndUpdate(userId, { password: hashedPass });
    return omit(user?.toObject() as IUser, ["password", "refreshToken", "resetPasswordToken"]);
};

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

export const updateResetToken = async (userId: string, token: string) => {
    await UserSchema.findByIdAndUpdate(userId, { resetPasswordToken: token });
};

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
};

function escapeRegex(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

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

export const getUserAnalytics = async () => {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    const yesterday = new Date(startOfToday);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(startOfWeek);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(startOfMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const result = await UserSchema.aggregate([
        {
            $match: {
                role: { $ne: UserRole.SUPER_ADMIN }
            }
        },
        {
            $facet: {
                totals: [
                    {
                        $group: {
                            _id: null,
                            total: { $sum: 1 },
                            instructors: {
                                $sum: { $cond: [{ $eq: ["$role", UserRole.INSTRUCTOR] }, 1, 0] }
                            },
                            students: {
                                $sum: { $cond: [{ $eq: ["$role", UserRole.USER] }, 1, 0] }
                            },
                            active: {
                                $sum: { $cond: ["$active", 1, 0] }
                            }
                        }
                    }
                ],
                timeStats: [
                    {
                        $group: {
                            _id: null,
                            today: {
                                $sum: { $cond: [{ $gte: ["$createdAt", startOfToday] }, 1, 0] }
                            },
                            yesterday: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $gte: ["$createdAt", new Date(yesterday.setHours(0, 0, 0, 0))] },
                                                { $lt: ["$createdAt", startOfToday] }
                                            ]
                                        }, 1, 0]
                                }
                            },
                            thisWeek: {
                                $sum: { $cond: [{ $gte: ["$createdAt", startOfWeek] }, 1, 0] }
                            },
                            lastWeek: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $gte: ["$createdAt", lastWeek] },
                                                { $lt: ["$createdAt", startOfWeek] }
                                            ]
                                        }, 1, 0]
                                }
                            },
                            thisMonth: {
                                $sum: { $cond: [{ $gte: ["$createdAt", startOfMonth] }, 1, 0] }
                            },
                            lastMonth: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $gte: ["$createdAt", lastMonth] },
                                                { $lt: ["$createdAt", startOfMonth] }
                                            ]
                                        }, 1, 0]
                                }
                            },
                            lastSixMonths: {
                                $sum: { $cond: [{ $gte: ["$createdAt", sixMonthsAgo] }, 1, 0] }
                            },
                            thisYear: {
                                $sum: { $cond: [{ $gte: ["$createdAt", startOfYear] }, 1, 0] }
                            }
                        }
                    }
                ],
                monthlyTrend: [
                    {
                        $match: {
                            createdAt: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: { $year: "$createdAt" },
                                month: { $month: "$createdAt" }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { "_id.year": 1, "_id.month": 1 } },
                    {
                        $project: {
                            _id: 0,
                            month: {
                                $concat: [
                                    { $toString: "$_id.year" },
                                    "-",
                                    { $toString: "$_id.month" }
                                ]
                            },
                            users: "$count"
                        }
                    }
                ]
            }
        }
    ]);

    const totals = result[0].totals[0] || {};
    const timeStats = result[0].timeStats[0] || {};
    const monthlyTrend = result[0].monthlyTrend || [];

    const calculateGrowth = (current: number, previous: number) =>
        previous > 0 ? ((current - previous) / previous) * 100 : 0;

    return {
        totals: {
            users: totals.total || 0,
            instructors: totals.instructors || 0,
            students: totals.students || 0,
            active: totals.active || 0
        },
        timePeriods: {
            today: timeStats.today || 0,
            yesterday: timeStats.yesterday || 0,
            dailyGrowth: calculateGrowth(timeStats.today || 0, timeStats.yesterday || 0),

            thisWeek: timeStats.thisWeek || 0,
            lastWeek: timeStats.lastWeek || 0,
            weeklyGrowth: calculateGrowth(timeStats.thisWeek || 0, timeStats.lastWeek || 0),

            thisMonth: timeStats.thisMonth || 0,
            lastMonth: timeStats.lastMonth || 0,
            monthlyGrowth: calculateGrowth(timeStats.thisMonth || 0, timeStats.lastMonth || 0),

            lastSixMonths: timeStats.lastSixMonths || 0,
            thisYear: timeStats.thisYear || 0
        },
        trends: {
            monthly: monthlyTrend
        }
    };
};


import { type BaseSchema } from "../common/dto/base.dto";
import { UserRole } from "./user.schema";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        role: UserRole;
        password: string;
        profilePic: string;
        refreshToken: string;
        resetPasswordToken: string;
        active: boolean;
}

export interface ICreateUser extends Omit<IUser, "_id" | "createdAt" | "updatedAt" | "active" | "refreshToken" | "resetPasswordToken"> {}
export interface ICreateUserResponse extends Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> {
        coursesEnrolled?: Number;
}
export interface IGetUserResponse extends Omit<IUser, "password" | "refreshToken" | "resetPasswordToken"> {
        coursesEnrolled?: Number;
};

export interface ITempUser extends BaseSchema {
        name: string;
        email: string;
        role: UserRole;
        password: string;
}

export interface Payload {
        _id: string;
        name: string;
        email: string;
        role: UserRole;
}
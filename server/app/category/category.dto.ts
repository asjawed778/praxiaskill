import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

export interface ICourseCategory extends BaseSchema {
    name: string;
    description: string;
    courses?: mongoose.Types.ObjectId[];
}
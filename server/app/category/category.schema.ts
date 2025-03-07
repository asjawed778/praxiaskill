import mongoose from "mongoose";
import { ICourseCategory } from "./category.dto";

const courseCategorySchema = new mongoose.Schema<ICourseCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
  
}, { timestamps: true });

export default mongoose.model<ICourseCategory>("CourseCategory", courseCategorySchema);
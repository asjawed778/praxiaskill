import createHttpError from "http-errors";
import courseCategorySchema from "./category.schema";
import { ICourseCategory } from "./category.dto";
import mongoose from "mongoose";

export const createCourseCategory = async(data : ICourseCategory) => {
    if(await courseCategorySchema.exists({name: data.name})) {
        throw createHttpError(409, "Course category already exists");
    }
    const result = await courseCategorySchema.create(data);
    return result as ICourseCategory;
};

export const updateCourseCategory = async (categoryId: string, data: ICourseCategory) => {

    const existingCategory = await courseCategorySchema.findOne({
        name: data.name,
        _id: { $ne: categoryId },
    });

    if (existingCategory) {
        throw createHttpError(409, "Category name already exists");
    }
    // Update the category if the name is unique
    const result = await courseCategorySchema.findByIdAndUpdate(categoryId, data, { new: true });

    if (!result) {
        throw createHttpError(404, "Course category not found");
    }

    return result as ICourseCategory;
};

export const deleteCourseCategory = async (categoryId: string) => {
    const result = await courseCategorySchema.findByIdAndUpdate(categoryId, { isDeleted: true }, { new: true });
    if (!result) {
        throw createHttpError(404, "Course category not found");
    }
};

export const getAllCourseCategory = async () => {
    const result = await courseCategorySchema.find();
    return result as ICourseCategory[];
};

export const getCourseCategoryById = async (categoryId: string) => {
    const result = await courseCategorySchema.findById(categoryId);
    if (!result) {
        throw createHttpError(404, "Course category not found");
    }
    return result as ICourseCategory;
};

export const addCourseId = async(courseId: string, categoryId: string) => {
    const category = await courseCategorySchema.findByIdAndUpdate(categoryId, 
        {$push: {courses: courseId}},
        { new: true }
    )

    if(!category) {
        throw createHttpError(404, "Invalid category id")
    }
    return category;
};

export const removeCourseId = async (courseId: string, categoryId: string) => {
    const category = await courseCategorySchema.findByIdAndUpdate(
        categoryId,
        { $pull: { courses: courseId } },
        { new: true }
    );

    if (!category) {
        throw createHttpError(404, "Invalid category ID");
    }
    return category;
};

export const moveCourseToCategory = async (courseId: string, categoryId: string): Promise<any> => {
    // Check if the target category exists
    const targetCategory = await courseCategorySchema.findById(categoryId);
    if (!targetCategory) {
        throw createHttpError(404, "Category not found");
    }

    // If course is already in the target category, return early
    if ((targetCategory.courses ?? []).includes(new mongoose.Types.ObjectId(courseId))) {
        return targetCategory;
    }

    // Remove the course from any other categories (if present)
    await courseCategorySchema.updateMany(
        { 
            _id: { $ne: categoryId },  // Exclude the target category
            courses: courseId           // Only categories containing this course
        },
        { $pull: { courses: courseId } }
    );

    // Add to the target category (whether it was in another or not)
    const updatedCategory = await courseCategorySchema.findByIdAndUpdate(
        categoryId,
        { $push: { courses: courseId } }, // Using $push since we already checked for duplicates
        { new: true }
    );

    return updatedCategory;
};




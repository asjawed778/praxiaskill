import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import * as courseService from "./category.service"
import { createResponse } from "../common/helper/response.hepler";


export const createCourseCategory = asyncHandler(async(req: Request, res: Response) => {
    const data = req.body;
    const result = await courseService.createCourseCategory(data);
    res.send(createResponse(result, "Course category created successfully"));
});

export const updateCourseCategory = asyncHandler(async(req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const data = req.body;
    const result = await courseService.updateCourseCategory(categoryId, data);
    res.send(createResponse(result, "Course category updated successfully"));
});

export const deleteCourseCategory = asyncHandler(async(req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    await courseService.deleteCourseCategory(categoryId);
    res.send(createResponse({}, "Course category deleted successfully"));
});

export const getAllCourseCategory = asyncHandler(async(req: Request, res: Response) => {
    const result = await courseService.getAllCourseCategory();
    res.send(createResponse(result, "Course category fetched successfully"));
});

export const getCourseCategoryById = asyncHandler(async(req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const result = await courseService.getCourseCategoryById(categoryId);
    res.send(createResponse(result, "Course category fetched successfully"));
});
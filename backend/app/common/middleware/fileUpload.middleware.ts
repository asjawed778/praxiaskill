import { type Request, type Response, type NextFunction } from "express";
import fileUpload from "express-fileupload";
import createHttpError from "http-errors";
import { UploadedFile } from "express-fileupload";


const allowedVideoTypes = [
    "video/mp4", "video/mov", "video/avi",
    "video/mkv", "video/webm", "video/flv", "video/wmv"
];

const allowedImageTypes = [
    "image/png", "image/jpeg", "image/jpg", "image/gif"
];

const allowedFileTypes = [
    ...allowedVideoTypes,
    "application/pdf",
    ...allowedImageTypes
];

// Max chunk size is 5MB
const MAX_CHUNK_SIZE = 5.5 * 1024 * 1024;

export const thumbnailUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files.thumbnail) {
        throw createHttpError(400, "Thumbnail is required");
    }

    const file = req.files.thumbnail as fileUpload.UploadedFile;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.mimetype)) {
        throw createHttpError(400, "Thumbnail must be an image (jpg, jpeg, png)");
    }

    if (file.size > maxSize) {
        throw createHttpError(400, "Thumbnail must be less than 5MB");
    }

    next();
};

export const brouchureUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files.brouchure) {
        throw createHttpError(400, "Brochure is required");
    }

    const file = req.files.brouchure as fileUpload.UploadedFile;
    const maxSize = 5 * 1024 * 1024;

    if (file.mimetype !== "application/pdf") {
        throw createHttpError(400, "Brochure must be a PDF file");
    }

    if (file.size > maxSize) {
        throw createHttpError(400, "Brochure must be less than 5MB");
    }

    next();
};

export const videoUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files.video) {
        throw createHttpError(400, "Video file is required.");
    }

    const file = req.files.video as fileUpload.UploadedFile;
    const allowedTypes = [
        "video/mp4", "video/mov", "video/avi", 
        "video/mkv", "video/webm", "video/flv", "video/wmv"
    ];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.mimetype)) {
        throw createHttpError(400, "Invalid video format. Allowed formats: mp4, mov, avi, mkv, webm, flv, wmv.");
    }

    if (file.size > maxSize) {
        throw createHttpError(400, "Video file size must not exceed 10MB.");
    }

    next();
};

export const validateChunkUpload = (req: Request, res: Response, next: NextFunction) => {
    
    const { uploadId, fileKey, partNumber } = req.body;
    
    if (!uploadId || typeof uploadId !== "string") {
        return next(createHttpError(400, "uploadId is required and must be a string"));
    }

    if (!fileKey || typeof fileKey !== "string") {
        return next(createHttpError(400, "fileKey is required and must be a string"));
    }

    if (!partNumber || isNaN(parseInt(partNumber)) || parseInt(partNumber) < 1) {
        return next(createHttpError(400, "partNumber is required and must be a positive integer"));
    }
    
    if (!req.files || !req.files.chunk) {
        return next(createHttpError(400, "No file chunk provided"));
    }

    const chunk = req.files.chunk as UploadedFile;

    if (!allowedFileTypes.includes(chunk.mimetype)) {
        return next(createHttpError(400, `Invalid file type. Allowed: ${allowedFileTypes.join(", ")}`));
    }

    if (chunk.size > MAX_CHUNK_SIZE) {
        return next(createHttpError(400, "Chunk size exceeds 5MB limit"));
    }

    next();
};
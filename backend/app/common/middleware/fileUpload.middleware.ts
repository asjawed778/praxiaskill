import { type Request, type Response, type NextFunction } from "express";
import fileUpload from "express-fileupload";
import createHttpError from "http-errors";
import { UploadedFile } from "express-fileupload";


const allowedTypes: Record<string, { maxSizeMB: number }> = {
    // Images
    "image/jpeg": { maxSizeMB: 5 },
    "image/png": { maxSizeMB: 5 },
    "image/jpg": { maxSizeMB: 5 },
    "image/gif": { maxSizeMB: 5 },

    // PDF
    "application/pdf": { maxSizeMB: 5 },

    // Videos
    "video/mp4": { maxSizeMB: 10 },
    "video/mov": { maxSizeMB: 10 },
    "video/avi": { maxSizeMB: 10 },
    "video/mkv": { maxSizeMB: 10 },
    "video/webm": { maxSizeMB: 10 },
    "video/flv": { maxSizeMB: 10 },
    "video/wmv": { maxSizeMB: 10 },
};


// Max chunk size is 5MB
const MAX_CHUNK_SIZE = 5.5 * 1024 * 1024;

export const validateFileUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files.file) {
        return next(createHttpError(400, "File is required"));
    }

    const uploaded = req.files.file as fileUpload.UploadedFile;

    const fileType = uploaded.mimetype;
    const fileSize = uploaded.size;

    const validation = allowedTypes[fileType];

    if (!validation) {
        return next(
            createHttpError(400, `Unsupported file type: ${fileType}.`)
        );
    }

    if (fileSize > validation.maxSizeMB * 1024 * 1024) {
        return next(
            createHttpError(400, `File size must be less than ${validation.maxSizeMB}MB.`)
        );
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

    // if (!allowedFileTypes.includes(chunk.mimetype)) {
    //     return next(createHttpError(400, `Invalid file type. Allowed: ${allowedFileTypes.join(", ")}`));
    // }

    if (chunk.size > MAX_CHUNK_SIZE) {
        return next(createHttpError(400, "Chunk size exceeds 5MB limit"));
    }

    next();
};



// export const uploadPublicFile = asyncHandler(async (req: Request, res: Response) => {
//     const allowedFields = ["thumbnail", "brouchure", "trailerVideo", "video"];

//     // Ensure req.files is not null or undefined
//     if (!req.files) {
//         throw createHttpError(400, "No files were selected.");
//     }

//     // Find which file is being uploaded
//     let fileKey = allowedFields.find(field => req.files?.[field]);

//     if (!fileKey) {
//         throw createHttpError(400, "Please select a valid file to upload");
//     }

//     const file = req.files[fileKey] as UploadedFile;

//     const uploadPath = `public/course/${fileKey}`;

//     const result = await AWSservice.putObject(file, uploadPath);

//     res.send(createResponse(result, `${fileKey} uploaded successfully to AWS`));
// });
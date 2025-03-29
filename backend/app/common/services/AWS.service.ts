import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import * as fs from "fs";
import { loadConfig } from "../helper/config.hepler";
import createHttpError from "http-errors";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

loadConfig();

const S3_REGION_NAME = process.env.S3_REGION_NAME;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Initialize S3 client
const s3Client = new S3Client({
    region: S3_REGION_NAME as string,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID as string,
        secretAccessKey: S3_SECRET_ACCESS_KEY as string,
    },
});

interface UploadResult {
    url: string;
    key: string;
}

/**
 * Upload a file to AWS S3
 * @param file - File object containing tempFilePath, name, and mimetype
 * @param folderName - (Optional) Folder name to organize files in S3
 * @returns Uploaded file URL and key
 */
export const putObject = async (file: { tempFilePath: string; name: string; mimetype: string }, folderName = ''): Promise<UploadResult | null> => {
    try {
        const fileBuffer = fs.readFileSync(file.tempFilePath);
        const fileName = `${file.name}-${Date.now()}`;
        const contentType = file.mimetype;
        const key = folderName ? `${folderName}/${fileName}` : fileName;

        const params = {
            Bucket: S3_BUCKET_NAME as string,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
        };

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);

        if (data.$metadata.httpStatusCode !== 200) {
            console.error("S3 upload failed:", data);
            return null;
        }

        const url = `https://${S3_BUCKET_NAME}.s3.${S3_REGION_NAME}.amazonaws.com/${key}`;
        return { url, key };
    } catch (err) {
        console.error("Error uploading file to S3:", (err as Error).message);
        throw err;
    }
};

/**
 * Delete a file from AWS S3
 * @param url - The S3 file URL to delete
 * @returns Success message and key of deleted file
 */
export const deleteObject = async (url: string): Promise<{ success: boolean; key: string }> => {
    try {
        const bucketName = S3_BUCKET_NAME as string;
        const bucketUrl = `https://${bucketName}.s3.${S3_REGION_NAME}.amazonaws.com/`;

        if (!url.startsWith(bucketUrl)) {
            throw new Error("Invalid URL: does not match the configured S3 bucket");
        }

        const key = url.replace(bucketUrl, '');

        const params = {
            Bucket: bucketName,
            Key: key,
        };

        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);

        // console.log(`File deleted: ${key}`);
        return { success: true, key };
    } catch (err) {
        console.error("Error deleting file from S3:", (err as Error).message);
        throw err;
    }
};

export const startMultipartUpload = async (fileKey: string, fileType: string): Promise<string> => {

    const command = new CreateMultipartUploadCommand({
        Bucket: S3_BUCKET_NAME as string,
        Key: fileKey,
        ContentType: fileType,
        ACL: "private",
    });

    const response = await s3Client.send(command);

    if (!response.UploadId) {
        throw new Error("Failed to initiate multipart upload.");
    }
    return response.UploadId;
};

export const uploadChunk = async (
    uploadId: string,
    fileKey: string,
    PartNumber: number,
    chunk: { tempFilePath: string; name: string; mimetype: string }
): Promise<string> => {
    const fileBuffer = fs.readFileSync(chunk.tempFilePath);

    const command = new UploadPartCommand({
        Bucket: S3_BUCKET_NAME,
        Key: fileKey,
        UploadId: uploadId,
        PartNumber: PartNumber,
        Body: fileBuffer
    });
    const response = await s3Client.send(command);

    if (!response.ETag) {
        throw createHttpError(500, "Chunk upload failed");
    }

    return response.ETag;
};

export const completeMultipartUpload = async (
    uploadId: string,
    fileKey: string,
    parts: { PartNumber: number; ETag: string }[]
) => {
    parts.sort((a, b) => a.PartNumber - b.PartNumber);

    const cleanedParts = parts.map(part => ({
        PartNumber: part.PartNumber,
        ETag: part.ETag.replace(/"/g, '').trim()
    }));

    const command = new CompleteMultipartUploadCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        UploadId: uploadId,
        MultipartUpload: {
            Parts: cleanedParts,
        },
    });

    try {
        const response = await s3Client.send(command);
        console.log("Upload completed successfully:", response);
        return { success: true, data: response };
    } catch (error) {
        console.error("Error completing multipart upload:", error);
        throw error;
    }
};

export const getPresignedUrl = async (fileKey: string) => {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
};
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { loadConfig } from "../helper/config.hepler";

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
        const fileName = `${Date.now()}_${file.name}`;
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

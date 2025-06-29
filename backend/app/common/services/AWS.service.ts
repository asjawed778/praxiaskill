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
import ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fsPromise from 'fs/promises';

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


export const transcodeVideo = async (fileKey: string, subSectionId: string, courseName: string) => {
    let tempDir = '';
    let tempOutputDir = '';
    
    try {
        tempDir = path.join(__dirname, '..', '..', 'tmp');
        tempOutputDir = path.join(tempDir, `output-${Date.now()}`);
        await fsPromise.mkdir(tempOutputDir, { recursive: true });

        const signedUrl = await getPresignedUrl(fileKey);
        
        const resolutions = [
            { name: '360p', width: 640, height: 360, bitrate: '800k' },
            { name: '480p', width: 854, height: 480, bitrate: '1400k' },
            { name: '720p', width: 1280, height: 720, bitrate: '2800k' },
            { name: '1080p', width: 1920, height: 1080, bitrate: '5000k' }
        ];

        const variantLinks = [];

        for (const res of resolutions) {
            const outputPlaylist = path.join(tempOutputDir, `output-${res.name}.m3u8`);
            const segmentPattern = path.join(tempOutputDir, `output-${res.name}-%03d.ts`);

            await new Promise((resolve, reject) => {
                ffmpeg(signedUrl)
                    .inputOptions([
                        '-re', 
                        '-timeout 30000000' 
                    ])
                    .outputOptions([
                        `-vf scale=${res.width}:${res.height}`,
                        `-c:v libx264`,
                        `-b:v ${res.bitrate}`,
                        `-c:a aac`,
                        `-b:a 128k`,
                        `-hls_time 10`,
                        `-hls_list_size 0`,
                        `-hls_segment_filename ${segmentPattern}`,
                        `-f hls`
                    ])
                    .output(outputPlaylist)
                    .on('start', (cmd) => console.log(`Processing ${res.name}: ${cmd}`))
                    .on('progress', (progress) => console.log(`${res.name}: ${progress.percent}%`))
                    .on('end', resolve)
                    .on('error', reject)
                    .run();
            });

            const playlistResult = await putObject({
                tempFilePath: outputPlaylist,
                name: `output-${res.name}.m3u8`,
                mimetype: 'application/x-mpegURL'
            }, `private/course/${courseName}`);
            
            if (!playlistResult) throw new Error(`Failed to upload ${res.name} playlist`);
            
            variantLinks.push({
                resolution: res.name,
                link: playlistResult.url
            });
        }

        const masterPlaylist = `#EXTM3U\n#EXT-X-VERSION:3\n` +
            resolutions.map(res => 
                `#EXT-X-STREAM-INF:BANDWIDTH=${parseInt(res.bitrate) * 1000},RESOLUTION=${res.width}x${res.height}\noutput-${res.name}.m3u8`
            ).join('\n');
        
        const masterPlaylistPath = path.join(tempOutputDir, 'master.m3u8');
        await fsPromise.writeFile(masterPlaylistPath, masterPlaylist);
        
        const masterPlaylistResult = await putObject({
            tempFilePath: masterPlaylistPath,
            name: 'master.m3u8',
            mimetype: 'application/x-mpegURL'
        }, `private/course/${courseName}`);

        if (!masterPlaylistResult) throw new Error('Failed to upload master playlist');
        console.log("variantLinks: ", variantLinks);
        return {
            variants: variantLinks,
            hlsPlaylist: masterPlaylistResult.url
        };

    } finally {
        if (tempOutputDir) {
            await fsPromise.rm(tempOutputDir, { recursive: true, force: true }).catch(() => {});
        }
    }
};


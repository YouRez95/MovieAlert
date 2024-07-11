import fs from 'fs';
import S3, { PutObjectRequest } from 'aws-sdk/clients/s3';
import { AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME} from '../constants/env';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';


const s3 = new S3Client({region: AWS_BUCKET_REGION, credentials: {accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY}});

const uploadToS3 = async (file: Express.Multer.File) => {
    const key = `${Date.now()}-${crypto.randomUUID()}`;
    const command = new PutObjectCommand({Bucket: AWS_BUCKET_NAME, Key:key, Body: file.buffer, ContentType: file.mimetype})

    try {
        const result = await s3.send(command);
        const url = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${key}`;
        return {result, url };
    } catch (error) {
        console.log("error from uploadToS", error);
        return {error}
    }
}

export const deleteFromS3 = async (url: string) => {
    try {
        const key = url.split(`${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/`)[1];
        const command = new DeleteObjectCommand({Bucket: AWS_BUCKET_NAME, Key: key})
        const result = await s3.send(command);
        return {result}
    } catch (error) {
        console.log('Error from deleteFromS3', error);
        return { error };
    }
}

export default uploadToS3;
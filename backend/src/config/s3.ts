import fs from 'fs';
import S3, { PutObjectRequest } from 'aws-sdk/clients/s3';
import { AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME} from '../constants/env';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

export default uploadToS3;

// const region = AWS_BUCKET_REGION

// const s3 = new S3({
//     region,
//     accessKeyId: AWS_ACCESS_KEY,
//     secretAccessKey: AWS_SECRET_KEY
// })

// // upload file to s3
// type fileParams = {
//     path: string,
//     filename: string
// }

// export function uploadFile(file: fileParams) {
//     const fileStream = fs.createReadStream(file.path);

//     const uploadParams: PutObjectRequest = {
//         Bucket: AWS_BUCKET_NAME,
//         Body: fileStream,
//         Key: file.filename,
//     }

//     return s3.upload(uploadParams).promise()
// }
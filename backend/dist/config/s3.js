"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromS3 = void 0;
const env_1 = require("../constants/env");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({ region: env_1.AWS_BUCKET_REGION, credentials: { accessKeyId: env_1.AWS_ACCESS_KEY, secretAccessKey: env_1.AWS_SECRET_KEY } });
const uploadToS3 = async (file) => {
    const key = `${Date.now()}-${crypto.randomUUID()}`;
    const command = new client_s3_1.PutObjectCommand({ Bucket: env_1.AWS_BUCKET_NAME, Key: key, Body: file.buffer, ContentType: file.mimetype });
    try {
        const result = await s3.send(command);
        const url = `https://${env_1.AWS_BUCKET_NAME}.s3.${env_1.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
        return { result, url };
    }
    catch (error) {
        console.log("error from uploadToS", error);
        return { error };
    }
};
const deleteFromS3 = async (url) => {
    try {
        const key = url.split(`${env_1.AWS_BUCKET_NAME}.s3.${env_1.AWS_BUCKET_REGION}.amazonaws.com/`)[1];
        const command = new client_s3_1.DeleteObjectCommand({ Bucket: env_1.AWS_BUCKET_NAME, Key: key });
        const result = await s3.send(command);
        return { result };
    }
    catch (error) {
        console.log('Error from deleteFromS3', error);
        return { error };
    }
};
exports.deleteFromS3 = deleteFromS3;
exports.default = uploadToS3;

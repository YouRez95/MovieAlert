"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_HOST = exports.REDIS_PASSWORD = exports.GOOGLE_REDIRECT_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.AWS_SECRET_KEY = exports.AWS_ACCESS_KEY = exports.AWS_BUCKET_NAME = exports.AWS_BUCKET_REGION = exports.RESEND_API_KEY = exports.EMAIL_SENDER = exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = exports.MONGO_CLOUD = exports.MONGO_LOCAL = exports.APP_ORIGIN_WWW = exports.APP_ORIGIN = exports.PORT = exports.NODE_ENV = void 0;
const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
};
exports.NODE_ENV = getEnv("NODE_ENV", "development");
exports.PORT = getEnv("PORT", "4000");
exports.APP_ORIGIN = getEnv("APP_ORIGIN");
exports.APP_ORIGIN_WWW = getEnv("APP_ORIGIN_WWW");
exports.MONGO_LOCAL = getEnv("MONGO_LOCAL");
exports.MONGO_CLOUD = getEnv("MONGO_CLOUD");
exports.JWT_SECRET = getEnv("JWT_SECRET");
exports.JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
exports.EMAIL_SENDER = getEnv("EMAIL_SENDER");
exports.RESEND_API_KEY = getEnv("RESEND_API_KEY");
exports.AWS_BUCKET_REGION = getEnv("AWS_BUCKET_REGION");
exports.AWS_BUCKET_NAME = getEnv("AWS_BUCKET_NAME");
exports.AWS_ACCESS_KEY = getEnv("AWS_ACCESS_KEY");
exports.AWS_SECRET_KEY = getEnv("AWS_SECRET_KEY");
exports.GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
exports.GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
exports.GOOGLE_REDIRECT_URL = getEnv("GOOGLE_REDIRECT_URL");
exports.REDIS_PASSWORD = getEnv("REDIS_PASSWORD");
exports.REDIS_HOST = getEnv("REDIS_HOST");

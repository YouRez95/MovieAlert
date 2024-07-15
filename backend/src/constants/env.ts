const getEnv = (key:string, defaultValue?:string):string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`)
  }

  return value;
}


export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4000");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const APP_ORIGIN_WWW = getEnv("APP_ORIGIN_WWW");
export const MONGO_LOCAL = getEnv("MONGO_LOCAL");
export const MONGO_CLOUD = getEnv("MONGO_CLOUD");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const AWS_BUCKET_REGION = getEnv("AWS_BUCKET_REGION");
export const AWS_BUCKET_NAME = getEnv("AWS_BUCKET_NAME");
export const AWS_ACCESS_KEY = getEnv("AWS_ACCESS_KEY");
export const AWS_SECRET_KEY = getEnv("AWS_SECRET_KEY");
export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
export const GOOGLE_REDIRECT_URL = getEnv("GOOGLE_REDIRECT_URL");
export const REDIS_PASSWORD = getEnv("REDIS_PASSWORD");
export const REDIS_HOST = getEnv("REDIS_HOST");
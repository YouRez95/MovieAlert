"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../constants/http");
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../utils/AppError"));
const cookies_1 = require("../utils/cookies");
const multer_1 = __importDefault(require("multer"));
const handleZodErrors = (res, err) => {
    const errors = err.issues.map(issue => ({
        path: issue.path.join("."),
        message: issue.message
    }));
    return res.status(http_1.BAD_REQUEST).json({
        errors,
    });
};
const handleAppError = (res, err) => {
    return res.status(err.statusCode).json({
        message: err.message,
        errorCode: err.errorCode,
    });
};
const handleMulterError = (res, err) => {
    return res.status(http_1.BAD_REQUEST).json({
        message: err.message
    });
};
const errorHandler = (err, req, res, next) => {
    console.log(`PATH: ${req.path}`, err);
    if (req.path === cookies_1.REFRESH_TOKEN_PATH) {
        (0, cookies_1.clearAuthCookies)(res);
    }
    if (err instanceof zod_1.z.ZodError) {
        return handleZodErrors(res, err);
    }
    if (err instanceof AppError_1.default) {
        return handleAppError(res, err);
    }
    if (err instanceof multer_1.default.MulterError) {
        return handleMulterError(res, err);
    }
    return res.status(http_1.INTERNAL_SERVER_ERROR).send('Internal Server Error');
};
exports.default = errorHandler;

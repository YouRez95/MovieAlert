"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.sendPasswordResetHandler = exports.verifyEmailHandler = exports.refreshHandler = exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const auth_service_1 = require("../services/auth.service");
const cookies_1 = require("../utils/cookies");
const http_1 = require("../constants/http");
const zod_1 = require("../utils/zod");
const jwt_1 = require("../utils/jwt");
const session_model_1 = __importDefault(require("../models/session.model"));
const appAssert_1 = __importDefault(require("../utils/appAssert"));
exports.registerHandler = (0, catchErrors_1.default)(async (req, res, next) => {
    // validate request
    const requestData = zod_1.registerSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
    });
    // call service
    const { user, accessToken, refreshToken } = await (0, auth_service_1.createAccount)(requestData);
    // return response
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken }).status(http_1.CREATED).json({ message: 'Register successfully', user });
});
exports.loginHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Validate the body
    const requestData = zod_1.loginSchema.parse({ ...req.body, userAgent: req.headers['user-agent'] });
    // Call the service
    const { user, accessToken, refreshToken } = await (0, auth_service_1.loginUser)(requestData);
    // return response
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken }).status(http_1.OK).json({ message: 'Login successfully', user });
});
exports.logoutHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Grab the accessToken from cookies
    const accessToken = req.cookies.accessToken || "";
    // verify the accessToken
    const { payload } = (0, jwt_1.verifyToken)(accessToken);
    // Delete the session
    if (payload) {
        await session_model_1.default.findByIdAndDelete(payload.sessionId);
    }
    return (0, cookies_1.clearAuthCookies)(res).status(http_1.OK).json({ message: "Logout successfully" });
});
exports.refreshHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Grab the refresh token from cookies
    const refreshToken = req.cookies.refreshToken;
    (0, appAssert_1.default)(refreshToken, http_1.UNAUTHORIZED, "Missing Refresh Token");
    // Call the service
    const { accessToken, newRefreshToken } = await (0, auth_service_1.refreshUserAccessToken)(refreshToken);
    if (newRefreshToken) {
        res.cookie('refreshToken', newRefreshToken, (0, cookies_1.getRefreshTokenCookieOptions)());
    }
    return res.status(http_1.OK).cookie('accessToken', accessToken, (0, cookies_1.getAccesTokenCookieOptions)()).json({
        message: "Access Token Refreshed"
    });
});
exports.verifyEmailHandler = (0, catchErrors_1.default)(async (req, res) => {
    // verify the code
    const verificationCode = zod_1.verificationCodeSchema.parse(req.params.code);
    await (0, auth_service_1.verifyEmail)(verificationCode);
    return res.status(http_1.OK).json({ message: "Email was successfully verified" });
});
exports.sendPasswordResetHandler = (0, catchErrors_1.default)(async (req, res) => {
    // validate the email
    const email = zod_1.emailSchema.parse(req.body.email);
    // Call the service
    await (0, auth_service_1.sendPasswordResetEmail)(email);
    return res.status(http_1.OK).json({
        message: "Password reset email sent",
    });
});
exports.resetPasswordHandler = (0, catchErrors_1.default)(async (req, res) => {
    // validate the data
    const request = zod_1.resetPasswordSchema.parse(req.body);
    // Call the service
    await (0, auth_service_1.resetPassword)(request);
    return (0, cookies_1.clearAuthCookies)(res).status(http_1.OK).json({
        message: "Password reseted succesfully"
    });
});

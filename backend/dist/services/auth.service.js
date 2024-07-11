"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendPasswordResetEmail = exports.verifyEmail = exports.refreshUserAccessToken = exports.loginUser = exports.createAccount = void 0;
const session_model_1 = __importDefault(require("../models/session.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const verificationCode_model_1 = __importDefault(require("../models/verificationCode.model"));
const date_1 = require("../utils/date");
const emailTemplates_1 = require("../utils/emailTemplates");
const env_1 = require("../constants/env");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const http_1 = require("../constants/http");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const sendMail_1 = require("../utils/sendMail");
const createAccount = async (data) => {
    // Verify existing user
    const existingUser = await user_model_1.default.exists({ email: data.email });
    (0, appAssert_1.default)(!existingUser, http_1.CONFLICT, 'Email already in use');
    // create user
    const user = await user_model_1.default.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
    });
    const userId = user._id;
    // create verification code
    const verificationCode = await verificationCode_model_1.default.create({
        userId,
        type: "email_verification" /* VerificationCodeType.EmailVerification */,
        expiresAt: (0, date_1.oneYearFromNow)(),
    });
    // send verification email
    const url = `${env_1.APP_ORIGIN}/email/verify/${verificationCode._id}`;
    const { error } = await (0, sendMail_1.sendMail)({
        to: user.email,
        ...(0, emailTemplates_1.getVerifyEmailTemplate)(url)
    });
    if (error) {
        console.log(error);
    }
    // create session
    const session = await session_model_1.default.create({
        userId,
        userAgent: data.userAgent,
    });
    // sign accessToken & refreshToken
    const refreshToken = (0, jwt_1.signToken)({
        sessionId: session._id
    }, jwt_1.refreshTokenOptions);
    const accessToken = (0, jwt_1.signToken)({
        userId,
        sessionId: session._id
    });
    // return user & tokens
    return {
        user: user.omitPassword(), accessToken, refreshToken
    };
};
exports.createAccount = createAccount;
const loginUser = async ({ email, password, userAgent }) => {
    // Find the user
    const user = await user_model_1.default.findOne({ email });
    (0, appAssert_1.default)(user, http_1.UNAUTHORIZED, 'Invalid email or password');
    // Validate the password
    const isValid = await (0, bcrypt_1.compareValue)(password, user.password);
    (0, appAssert_1.default)(isValid, http_1.UNAUTHORIZED, 'Invalid email or password');
    const userId = user._id;
    // Create the session
    const session = await session_model_1.default.create({
        userId,
        userAgent
    });
    const sessionInfo = { sessionId: session._id };
    // Sign accessToken and refreshToken
    const refreshToken = (0, jwt_1.signToken)(sessionInfo, jwt_1.refreshTokenOptions);
    const accessToken = (0, jwt_1.signToken)({
        ...sessionInfo,
        userId,
    });
    // return user & tokens
    return {
        user: user.omitPassword(), accessToken, refreshToken
    };
};
exports.loginUser = loginUser;
const refreshUserAccessToken = async (refreshToken) => {
    // Verify the refreshToken if its still valid
    const { payload } = (0, jwt_1.verifyToken)(refreshToken, jwt_1.refreshTokenOptions);
    (0, appAssert_1.default)(payload, http_1.UNAUTHORIZED, 'Invalid Refresh Token');
    // get the session
    const now = Date.now();
    const session = await session_model_1.default.findById(payload.sessionId);
    (0, appAssert_1.default)(session && session.expiresAt.getTime() > now, http_1.UNAUTHORIZED, 'Session Expired');
    // update the session if the session expired after 24 hours
    const sessionNeedsRefresh = session.expiresAt.getTime() <= date_1.ONE_DAY_MS;
    if (sessionNeedsRefresh) {
        session.expiresAt = (0, date_1.thirtyDaysFromNow)();
        await session.save();
    }
    // Create new Refresh token if session refreshed
    const newRefreshToken = sessionNeedsRefresh ? (0, jwt_1.signToken)({ sessionId: session._id }, jwt_1.refreshTokenOptions) : undefined;
    // Create new Access Token 
    const accessToken = (0, jwt_1.signToken)({ sessionId: session._id, userId: session.userId });
    // return tokens
    return {
        accessToken, newRefreshToken,
    };
};
exports.refreshUserAccessToken = refreshUserAccessToken;
const verifyEmail = async (code) => {
    // Get the verificationCode document
    const validCode = await verificationCode_model_1.default.findOne({
        _id: code,
        type: "email_verification" /* VerificationCodeType.EmailVerification */,
        expiresAt: { $gt: new Date() },
    });
    (0, appAssert_1.default)(validCode, http_1.NOT_FOUND, 'Invalid or expired Verification code');
    // update the user model verified to true
    const userUpdated = await user_model_1.default.findByIdAndUpdate(validCode.userId, { verified: true }, { new: true });
    (0, appAssert_1.default)(userUpdated, http_1.INTERNAL_SERVER_ERROR, 'Failed to verify Email Try again later');
    // Delete the verificationCode document
    await validCode.deleteOne();
    // return user  updated
    return { user: userUpdated.omitPassword() };
};
exports.verifyEmail = verifyEmail;
const sendPasswordResetEmail = async (email) => {
    let user;
    try {
        // get the user by email
        user = await user_model_1.default.findOne({ email });
        (0, appAssert_1.default)(user, http_1.NOT_FOUND, 'User not found');
    }
    catch (error) {
        console.log("send forget password", error.message);
        return {};
    }
    // Check email rate limit: we will allow the user to send two forgot password every five minute
    const fiveMinAgo = (0, date_1.fiveMinuteAgo)();
    const count = await verificationCode_model_1.default.countDocuments({
        userId: user._id,
        type: "password_reset" /* VerificationCodeType.PasswordReset */,
        createdAt: { $gt: fiveMinAgo },
    });
    (0, appAssert_1.default)(count <= 1, http_1.TOO_MANY_REQUESTS, "Too many requests, Try again later");
    // Create Verification Code
    const expiresAt = (0, date_1.oneHourFromNow)();
    const verificationCode = await verificationCode_model_1.default.create({
        userId: user._id,
        type: "password_reset" /* VerificationCodeType.PasswordReset */,
        expiresAt,
    });
    // Send Verification Email
    const url = `${env_1.APP_ORIGIN}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;
    const { data, error } = await (0, sendMail_1.sendMail)({
        to: user.email,
        ...(0, emailTemplates_1.getPasswordResetTemplate)(url)
    });
    (0, appAssert_1.default)(data?.id, http_1.INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`);
    // Return
    return { url, emailId: data.id };
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = async ({ password, verificationCode }) => {
    // get the verificationCode
    const validCode = await verificationCode_model_1.default.findOne({
        _id: verificationCode,
        type: "password_reset" /* VerificationCodeType.PasswordReset */,
        expiresAt: { $gt: new Date() },
    });
    (0, appAssert_1.default)(validCode, http_1.NOT_FOUND, "Invalid or expired verification code");
    // update the user password
    const userUpdated = await user_model_1.default.findByIdAndUpdate(validCode.userId, { password: await (0, bcrypt_1.hashValue)(password) }, { new: true });
    (0, appAssert_1.default)(userUpdated, http_1.INTERNAL_SERVER_ERROR, "Failed to reset password");
    // Delete the verification code
    await validCode.deleteOne();
    // Delete all sessions
    await session_model_1.default.deleteMany({
        userId: userUpdated._id
    });
    // return the user
    return {
        user: userUpdated.omitPassword()
    };
};
exports.resetPassword = resetPassword;

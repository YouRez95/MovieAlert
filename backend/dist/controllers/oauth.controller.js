"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthHandler = void 0;
const oauth_service_1 = require("../services/oauth.service");
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const user_model_1 = __importDefault(require("../models/user.model"));
const session_model_1 = __importDefault(require("../models/session.model"));
const jwt_1 = require("../utils/jwt");
const cookies_1 = require("../utils/cookies");
const http_1 = require("../constants/http");
const env_1 = require("../constants/env");
exports.googleOAuthHandler = (0, catchErrors_1.default)(async (req, res) => {
    // Get the code from qs
    const code = req.query.code;
    // Get the id and access token with the code
    const { id_token, access_token } = await (0, oauth_service_1.getGoogleOAuthTokens)({ code });
    // Get user with tokens
    const googleUser = await (0, oauth_service_1.getGoogleUser)({ id_token, access_token });
    // Upsert the user
    const user = await user_model_1.default.findOneAndUpdate({ email: googleUser.email }, {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        picture: googleUser.picture,
        verified: true
    }, {
        upsert: true,
        new: true
    });
    // Create a session
    const session = await session_model_1.default.create({
        userId: user._id,
        userAgent: req.headers['user-agent'] || "",
    });
    // Create access and refresh token
    const refreshToken = (0, jwt_1.signToken)({
        sessionId: session._id
    }, jwt_1.refreshTokenOptions);
    const accessToken = (0, jwt_1.signToken)({
        userId: user._id,
        sessionId: session._id
    });
    // Set cookies
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken }).status(http_1.CREATED).redirect(env_1.APP_ORIGIN);
});

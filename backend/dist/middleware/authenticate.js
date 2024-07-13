"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const http_1 = require("../constants/http");
const jwt_1 = require("../utils/jwt");
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
exports.authenticate = (0, catchErrors_1.default)(async (req, res, next) => {
    // Get the access token
    const accessToken = req.cookies.accessToken;
    (0, appAssert_1.default)(accessToken, http_1.UNAUTHORIZED, "Not authorized", "invalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    // Verify the token
    const { error, payload } = (0, jwt_1.verifyToken)(accessToken);
    (0, appAssert_1.default)(payload, http_1.UNAUTHORIZED, error === 'jwt expired' ? 'Token expired' : 'Invalid Token', "invalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    // Check for the session
    // const sessionFound = await SessionModel.exists({_id: payload.sessionId});
    // appAssert(sessionFound, UNAUTHORIZED, "Session Not found")
    // Store the user on the request
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
});

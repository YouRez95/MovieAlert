"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.refreshTokenOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../constants/env");
const defaults = {
    audience: ['user'],
};
const accessTokenOptions = {
    secret: env_1.JWT_SECRET,
    expiresIn: "15m",
};
exports.refreshTokenOptions = {
    secret: env_1.JWT_REFRESH_SECRET,
    expiresIn: "30d",
};
const signToken = (payload, options) => {
    const { secret, ...signOptions } = options || accessTokenOptions;
    return jsonwebtoken_1.default.sign(payload, secret, { ...defaults, ...signOptions });
};
exports.signToken = signToken;
const verifyToken = (token, verifyOptions) => {
    const { secret = env_1.JWT_SECRET, ...verifyOpt } = verifyOptions || {};
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret, { ...defaults, ...verifyOpt });
        return {
            payload,
        };
    }
    catch (error) {
        return {
            error: error.message,
        };
    }
};
exports.verifyToken = verifyToken;

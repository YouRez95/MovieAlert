"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleUser = exports.getGoogleOAuthTokens = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const env_1 = require("../constants/env");
const getGoogleOAuthTokens = async ({ code }) => {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: env_1.GOOGLE_CLIENT_ID,
        client_secret: env_1.GOOGLE_CLIENT_SECRET,
        redirect_uri: env_1.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
    };
    const res = await axios_1.default.post(url, qs_1.default.stringify(values), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return res.data;
};
exports.getGoogleOAuthTokens = getGoogleOAuthTokens;
const getGoogleUser = async ({ id_token, access_token }) => {
    const res = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`
        }
    });
    return res.data;
};
exports.getGoogleUser = getGoogleUser;

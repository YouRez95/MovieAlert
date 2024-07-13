"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.getRefreshTokenCookieOptions = exports.getAccesTokenCookieOptions = exports.REFRESH_TOKEN_PATH = void 0;
const env_1 = require("../constants/env");
const date_1 = require("./date");
exports.REFRESH_TOKEN_PATH = "/auth/refresh";
// options used in both cookies
const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure: env_1.NODE_ENV !== 'development'
};
const getAccesTokenCookieOptions = () => ({
    ...defaults,
    expires: (0, date_1.fifteenMinutesFromNow)(),
});
exports.getAccesTokenCookieOptions = getAccesTokenCookieOptions;
const getRefreshTokenCookieOptions = () => ({
    ...defaults,
    expires: (0, date_1.thirtyDaysFromNow)(),
    path: exports.REFRESH_TOKEN_PATH, // refresh token is sent to the server only when needed '/auth/refresh', adding an extra layer of security
});
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
const setAuthCookies = ({ res, accessToken, refreshToken }) => res.cookie("accessToken", accessToken, (0, exports.getAccesTokenCookieOptions)()).cookie("refreshToken", refreshToken, (0, exports.getRefreshTokenCookieOptions)());
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => res.clearCookie("accessToken").clearCookie("refreshToken", { path: exports.REFRESH_TOKEN_PATH });
exports.clearAuthCookies = clearAuthCookies;

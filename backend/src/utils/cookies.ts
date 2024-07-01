import { CookieOptions, Response } from "express"
import { NODE_ENV } from "../constants/env";
import { thirtyDaysFromNow, fifteenMinutesFromNow } from "./date";


export const REFRESH_TOKEN_PATH = "/auth/refresh"

// options used in both cookies
const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== 'development'
}

export const getAccesTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
})

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_TOKEN_PATH, // refresh token is sent to the server only when needed '/auth/refresh', adding an extra layer of security
})


type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
}


export const setAuthCookies = ({res, accessToken, refreshToken}: Params) =>
    res.cookie("accessToken", accessToken, getAccesTokenCookieOptions()).cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());


export const clearAuthCookies = (res: Response) => res.clearCookie("accessToken").clearCookie("refreshToken", {path: REFRESH_TOKEN_PATH});

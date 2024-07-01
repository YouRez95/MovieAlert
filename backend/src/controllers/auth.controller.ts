import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser, refreshUserAccessToken, resetPassword, sendPasswordResetEmail, verifyEmail } from "../services/auth.service";
import { clearAuthCookies, getAccesTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../utils/cookies";
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationCodeSchema } from "../utils/zod";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";
import VerificationCodeModel from "../models/verificationCode.model";
import VerificationCodeType from "../constants/verificationCodeTypes";
import UserModel from "../models/user.model";


export const registerHandler = catchErrors(async (req, res, next) => {
  // validate request
  const requestData = registerSchema.parse(
    {
      ...req.body,
      userAgent: req.headers['user-agent'],
    }
  );

  // call service

  const { user, accessToken, refreshToken } = await createAccount(requestData);

  // return response
  return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).json(user);
})

export const loginHandler = catchErrors(async (req, res) => {
  // Validate the body
  const requestData = loginSchema.parse({...req.body, userAgent: req.headers['user-agent']});

  // Call the service

  const { user, accessToken, refreshToken } = await loginUser(requestData);

  // return response
  return setAuthCookies({res, accessToken, refreshToken}).status(OK).json({message: 'Login successfully'});
})


export const logoutHandler = catchErrors(async (req, res) => {
  // Grab the accessToken from cookies
  const accessToken = req.cookies.accessToken || "";

  // verify the accessToken
  const { payload } = verifyToken(accessToken);

  // Delete the session
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId)
  }

  return clearAuthCookies(res).status(OK).json({message: "Logout successfully"});
})


export const refreshHandler = catchErrors(async (req, res) => {
  // Grab the refresh token from cookies
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing Refresh Token");

  // Call the service

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res.status(OK).cookie('accessToken', accessToken, getAccesTokenCookieOptions()).json({
    message: "Access Token Refreshed"
  });

})


export const verifyEmailHandler = catchErrors(async (req, res) => {
  // verify the code
  const verificationCode = verificationCodeSchema.parse(req.params.code) 
  await verifyEmail(verificationCode);

  return res.status(OK).json({ message: "Email was successfully verified"});
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  // validate the email
  const email = emailSchema.parse(req.body.email);
  
  // Call the service
  await sendPasswordResetEmail(email);

  return res.status(OK).json({
    message: "Password reset email sent",
  })
})


export const resetPasswordHandler = catchErrors(async (req, res) => {
  // validate the data
  const request = resetPasswordSchema.parse(req.body);

  // Call the service
  await resetPassword(request);
  return clearAuthCookies(res).status(OK).json({
    message: "Password reseted succesfully"
  })
})




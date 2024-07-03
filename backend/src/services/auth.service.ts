import jwt from 'jsonwebtoken';

import VerificationCodeType from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model"
import VerificationCodeModel from "../models/verificationCode.model";
import { ONE_DAY_MS, fiveMinuteAgo, oneHourFromNow, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import { getVerifyEmailTemplate, getPasswordResetTemplate } from "../utils/emailTemplates";
import { APP_ORIGIN, JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import appAssert from '../utils/appAssert';
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from '../constants/http';
import { compareValue, hashValue } from '../utils/bcrypt';
import { RefreshTokenPayload, refreshTokenOptions, signToken, verifyToken } from '../utils/jwt';
import { sendMail } from '../utils/sendMail';

export type CreateAccountParams = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  userAgent?: string, 
}

export const createAccount = async (data:CreateAccountParams) => {
  // Verify existing user
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, 'Email already in use');

  // create user
  const user = await UserModel.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  })

  const userId = user._id
  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  })
  // send verification email

  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;

  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url)
  })

  if (error) {
    console.log(error);
  }

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  })

  // sign accessToken & refreshToken

  const refreshToken = signToken({
    sessionId: session._id
  }, refreshTokenOptions)

  const accessToken = signToken({
    userId,
    sessionId: session._id
  })

  // return user & tokens
  return {
    user: user.omitPassword(), accessToken, refreshToken
  }
}

type LoginParams = {
  email: string,
  password: string,
  userAgent?: string,
}

export const loginUser = async ({email, password, userAgent}: LoginParams) => {
  // Find the user
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, 'Invalid email or password');

  // Validate the password
  const isValid = await compareValue(password, user.password);
  appAssert(isValid, UNAUTHORIZED, 'Invalid email or password');

  const userId = user._id;

  // Create the session
  const session = await SessionModel.create({
    userId,
    userAgent
  });

  const sessionInfo = { sessionId: session._id };

  // Sign accessToken and refreshToken
  const refreshToken = signToken(sessionInfo, refreshTokenOptions)
  const accessToken = signToken({
    ...sessionInfo,
    userId,
  })

  // return user & tokens
  return {
    user: user.omitPassword(), accessToken, refreshToken
  }
}


export const refreshUserAccessToken = async (refreshToken: string) => {
  // Verify the refreshToken if its still valid
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, refreshTokenOptions);
  appAssert(payload, UNAUTHORIZED, 'Invalid Refresh Token');

  // get the session
  const now = Date.now()
  const session = await SessionModel.findById(payload.sessionId);
  appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, 'Session Expired');
  
  // update the session if the session expired after 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() <= ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  // Create new Refresh token if session refreshed
  const newRefreshToken = sessionNeedsRefresh ? signToken({ sessionId: session._id }, refreshTokenOptions) : undefined;
  
  // Create new Access Token 
  const accessToken = signToken({sessionId: session._id, userId: session.userId});

  // return tokens
  return {
    accessToken, newRefreshToken,
  }
}


export const verifyEmail = async (code: string) => {
  // Get the verificationCode document
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt : new Date() },
  })
  appAssert(validCode, NOT_FOUND, 'Invalid or expired Verification code');

  // update the user model verified to true
  const userUpdated = await UserModel.findByIdAndUpdate(validCode.userId, { verified: true }, { new: true });
  appAssert(userUpdated, INTERNAL_SERVER_ERROR, 'Failed to verify Email Try again later');

  // Delete the verificationCode document
  await validCode.deleteOne();

  // return user  updated
  return { user: userUpdated.omitPassword() }
}


export const sendPasswordResetEmail = async (email: string) => {
  let user;
  try {
    // get the user by email
    user = await UserModel.findOne({email});
    appAssert(user, NOT_FOUND, 'User not found');
  } catch (error:any) {
    console.log("send forget password", error.message)
    return {}
  }
  
  // Check email rate limit: we will allow the user to send two forgot password every five minute
  const fiveMinAgo = fiveMinuteAgo()
  const count = await VerificationCodeModel.countDocuments({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    createdAt: { $gt : fiveMinAgo },
  })
  appAssert(count <= 1 , TOO_MANY_REQUESTS, "Too many requests, Try again later");
  
  // Create Verification Code
  const expiresAt = oneHourFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  })
  
  // Send Verification Email
  const url = `${APP_ORIGIN}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;
  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url)
  });
  appAssert(data?.id, INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`);
  
  // Return
  return {url, emailId: data.id}
}

type resetPasswordParams = {
  password: string;
  verificationCode: string;
}

export const resetPassword = async ({password, verificationCode}: resetPasswordParams) => {
  // get the verificationCode
  const validCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PasswordReset,
    expiresAt: { $gt : new Date()},
  })
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  // update the user password
  const userUpdated = await UserModel.findByIdAndUpdate(validCode.userId, { password: await hashValue(password)}, {new: true});
  appAssert(userUpdated, INTERNAL_SERVER_ERROR, "Failed to reset password");
  
  // Delete the verification code
  await validCode.deleteOne();

  // Delete all sessions
  await SessionModel.deleteMany({
    userId: userUpdated._id
  });
  
  // return the user
  return {
    user: userUpdated.omitPassword()
  }
}



import jwt from 'jsonwebtoken';
import { getGoogleOAuthTokens, getGoogleUser } from "../services/oauth.service";
import catchErrors from "../utils/catchErrors";
import UserModel from '../models/user.model';
import SessionModel from '../models/session.model';
import { refreshTokenOptions, signToken } from '../utils/jwt';
import { setAuthCookies } from '../utils/cookies';
import { CREATED } from '../constants/http';
import { APP_ORIGIN } from '../constants/env';

export const googleOAuthHandler = catchErrors(async (req, res) => {
  // Get the code from qs
  const code = req.query.code as string;

  // Get the id and access token with the code
  const {id_token, access_token} = await getGoogleOAuthTokens({code});

  // Get user with tokens
  const googleUser = await getGoogleUser({id_token, access_token});
  
  // Upsert the user
  const user = await UserModel.findOneAndUpdate(
    {email: googleUser.email}, 
    {
      email: googleUser.email,
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
      picture: googleUser.picture,
      verified: true
    }, {
      upsert: true,
      new: true
    }
    )

  // Create a session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: req.headers['user-agent'] || "",
  })

  // Create access and refresh token
  const refreshToken = signToken({
    sessionId: session._id
  }, refreshTokenOptions)

  const accessToken = signToken({
    userId: user._id,
    sessionId: session._id
  })

  // Set cookies
  return setAuthCookies({res, accessToken, refreshToken}).status(CREATED).redirect(APP_ORIGIN);
})
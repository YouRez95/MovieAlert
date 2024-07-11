import axios from 'axios';
import qs from 'qs';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } from "../constants/env";


interface GoogleTokensResult {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  id_token: string
}

export const getGoogleOAuthTokens = async ({code}: {code: string}):Promise<GoogleTokensResult> => {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URL,
    grant_type: 'authorization_code',
  };

  const res = await axios.post(url, qs.stringify(values), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return res.data;
}

type GetGoogleUserParams = {
  id_token: string,
  access_token: string

}

interface GoogleUserResult {
  id: string,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  locale:string,
  userAgent: string,
}

export const getGoogleUser = async ({id_token, access_token}: GetGoogleUserParams): Promise<GoogleUserResult> => {
  const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,  {
    headers: {
      Authorization: `Bearer ${id_token}`
    }
  })


  return res.data
}
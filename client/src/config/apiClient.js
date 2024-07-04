import axios from 'axios';
import queryClient from './queryClient';
import { refetchUserData } from '../utils/auth';
import { AUTH } from '../hooks/useAuth';

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
}

// Create an axios instance
const API = axios.create(options);

const TokenRefreshClient = axios.create(options)
TokenRefreshClient.interceptors.response.use(response => response.data)

API.interceptors.response.use(
  response => response.data,
  async (error) => {
    const { config, response } = error
    const { status, data } = response || {};

    // Try to refresh the token
    if (status === 401 && data?.errorCode === "invalidAccessToken") {
      await TokenRefreshClient.get('auth/refresh');
      return TokenRefreshClient(config)
    }
    return Promise.reject({status, ...data});
  }
)

export default API;
import API from "../config/apiClient";

export const login = async (data) => API.post("/auth/login", data);
export const register = async (data) => API.post("/auth/register", data);
export const verifyEmail = async (code) => API.get(`/auth/email/verify/${code}`);
export const sendForgetPassword = async (email) => API.post(`/auth/password/forgot`, { email });
export const sendResetPassword = async ({ password, verificationCode }) => API.post(`/auth/password/reset`, { password, verificationCode });



import API from "../config/apiClient";

export const login = async (data) => API.post("/auth/login", data);
export const logout = async () => API.get('/auth/logout');
export const register = async (data) => API.post("/auth/register", data);
export const verifyEmail = async (code) => API.get(`/auth/email/verify/${code}`);
export const sendForgetPassword = async (email) => API.post(`/auth/password/forgot`, { email });
export const sendResetPassword = async ({ password, verificationCode }) => API.post(`/auth/password/reset`, { password, verificationCode });
export const getUser = async () => API.get("/user");
export const postMovie = async (formData) => API.post('/movies', formData);
export const getSearchMovie = async (title) => API.get(`/movies/search/${title}`);
export const aboutMovie = async (id, movieName) => API.get(`/movies/about/${id}/${movieName}`);
export const getMostAndNewMovies = async () => API.get('/movies/most/new');
export const getMyMovies = async (page) => API.get(`/movies/myMovies?page=${page}`);
export const getMoviesHistory = async (page) => API.get(`/movies/myViews?page=${page}`)
export const editMovie = async ({formData, id, movieName}) => API.put(`/movies/update/${id}/${movieName}`, formData)
export const getMysessions = async () => API.get('/sessions')
export const deleteSession = async (id) => API.delete(`/sessions/${id}`)
export const deleteMovie = async ({id, title}) => API.delete(`/movies/${id}/${title}`)

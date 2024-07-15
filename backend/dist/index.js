"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = require("./constants/env");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const http_1 = require("./constants/http");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const authenticate_1 = require("./middleware/authenticate");
const user_route_1 = __importDefault(require("./routes/user.route"));
const session_route_1 = __importDefault(require("./routes/session.route"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const redis_1 = __importDefault(require("./config/redis"));
const oauth_route_1 = __importDefault(require("./routes/oauth.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const allowedOrigins = [env_1.APP_ORIGIN, env_1.APP_ORIGIN_WWW];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// Test route
app.get('/', (req, res, next) => {
    return res.status(http_1.OK).json({
        status: "Healthy"
    });
});
// Route for auth
app.use('/auth', auth_route_1.default);
// protectedRoutes
app.use('/user', authenticate_1.authenticate, user_route_1.default);
app.use('/sessions', authenticate_1.authenticate, session_route_1.default);
app.use('/movies', authenticate_1.authenticate, movie_route_1.default);
app.use('/oauth', oauth_route_1.default);
// Error Middleware
app.use(errorHandler_1.default);
app.listen(env_1.PORT, async () => {
    console.log(`Server is running on port ${env_1.PORT} in ${env_1.NODE_ENV} environment`);
    await (0, db_1.default)();
    await redis_1.default.connect();
});

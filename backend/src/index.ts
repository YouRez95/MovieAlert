import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import connectToDatabse from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import errorHandler from './middleware/errorHandler';
import { OK } from './constants/http';
import authRoutes from './routes/auth.route';
import { authenticate } from './middleware/authenticate';
import userRoutes from './routes/user.route';
import sessionRoutes from './routes/session.route';
import moviesRoutes from './routes/movie.route';
import client from './config/redis';
import oauthRoutes from './routes/oauth.route';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
console.log("APP_ORIGIN", APP_ORIGIN)
app.use(cors({
  origin: "https://movie-alert.com",
  credentials: true,
}))
app.use(cookieParser());

// Test route
app.get('/', (req, res, next) => {
  return res.status(OK).json({
    status: "Healthy"
  });
})

// Route for auth
app.use('/auth', authRoutes);

// protectedRoutes
app.use('/user', authenticate, userRoutes);

app.use('/sessions', authenticate, sessionRoutes);
app.use('/movies', authenticate, moviesRoutes);
app.use('/oauth', oauthRoutes);

// Error Middleware
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabse();
  await client.connect();
})
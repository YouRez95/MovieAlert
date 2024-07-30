import { Router } from 'express';
import { moviesAdminHandler, usersAdminHandler } from '../controllers/admin.controller';
const adminRoutes = Router();

// prefix: admin

adminRoutes.get("/movies", moviesAdminHandler)
adminRoutes.get("/users", usersAdminHandler)

export default adminRoutes;
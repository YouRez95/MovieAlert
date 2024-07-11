import { Router } from 'express';
import { googleOAuthHandler } from '../controllers/oauth.controller';
const oauthRoutes = Router()

// Prefix: /oauth

oauthRoutes.get('/google', googleOAuthHandler);

export default oauthRoutes;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oauth_controller_1 = require("../controllers/oauth.controller");
const oauthRoutes = (0, express_1.Router)();
// Prefix: /oauth
oauthRoutes.get('/google', oauth_controller_1.googleOAuthHandler);
exports.default = oauthRoutes;

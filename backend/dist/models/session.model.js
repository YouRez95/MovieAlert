"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const date_1 = require("../utils/date");
const sessionSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    userAgent: { type: String },
    createdAt: { type: Date, default: Date.now(), required: true },
    expiresAt: { type: Date, default: date_1.thirtyDaysFromNow },
});
const SessionModel = mongoose_1.default.model("Session", sessionSchema);
exports.default = SessionModel;

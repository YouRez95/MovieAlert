"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    title: { type: String, required: true, index: true },
    year: { type: String, required: true },
    genre: { type: String, required: true },
    picture: { type: String, required: true },
    contentWarning: { type: [String] },
    description: { type: String, required: true },
}, { timestamps: true });
const MovieModel = mongoose_1.default.model("Movie", movieSchema);
exports.default = MovieModel;

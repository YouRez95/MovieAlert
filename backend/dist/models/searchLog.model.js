"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const searchLogSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Movie', required: true },
}, { timestamps: true });
const SearchLogModel = mongoose_1.default.model("SearchLog", searchLogSchema, 'search_logs');
exports.default = SearchLogModel;

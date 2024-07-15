"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../constants/env");
const MONGO_URI = env_1.NODE_ENV === 'development' ? env_1.MONGO_LOCAL : env_1.MONGO_CLOUD;
const connectToDatabse = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('mongodb connected successfully');
    }
    catch (err) {
        console.log('Could not connect to databse', err);
        process.exit(1); // shutdown the server if we cannot connected to DB
    }
};
exports.default = connectToDatabse;

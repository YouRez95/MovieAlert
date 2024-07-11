"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = require("../utils/bcrypt");
// Create the Schema
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    badge: {
        type: Number,
        default: 1
    },
    moviesViewed: {
        type: Number,
        default: 0
    },
    moviesSubmitted: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
// Define Hooks on the Schema
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await (0, bcrypt_1.hashValue)(this.password);
    next();
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('moviesSubmitted')) {
        return next();
    }
    switch (this.moviesSubmitted) {
        case 1:
            this.badge = this.badge + 1;
            break;
        case 4:
            this.badge = this.badge + 1;
            break;
        case 9:
            this.badge = this.badge + 1;
            break;
    }
    next();
});
// Define methods on the Schema
userSchema.methods.comparePassword = async function (val) {
    return (0, bcrypt_1.compareValue)(val, this.password);
};
userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;

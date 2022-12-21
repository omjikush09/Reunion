"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    username: joi_1.default.string().max(30).required(),
    password: joi_1.default.string().required(),
});
exports.registerUserSchema = registerUserSchema;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().required(),
});
exports.loginSchema = loginSchema;

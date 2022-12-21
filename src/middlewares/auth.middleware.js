"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const config_keys_1 = require("../config/config.keys");
const error_1 = __importDefault(require("./../utils/error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers.authorization) {
        return (0, error_1.default)(res, "Unauthorized", 401);
    }
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer ")) {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.substring(7, authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.length);
        jsonwebtoken_1.default.verify(token, config_keys_1.JWT_SECRET, (err, decoded) => {
            if (err) {
                return (0, error_1.default)(res, "Unauthorized", 401);
            }
            //@ts-ignore
            const { userId } = decoded;
            req.auth = { userId: Number(userId) };
            next();
        });
    }
    else {
        return (0, error_1.default)(res, "Unauthorized", 401);
    }
});
exports.isAuthenticated = isAuthenticated;

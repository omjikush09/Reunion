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
exports.loginUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_keys_1 = require("../config/config.keys");
const error_1 = __importDefault(require("./../utils/error"));
const user_model_1 = require("../model/user.model");
const user_model_2 = require("./../model/user.model");
//Hash Password
const hashPassward = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassward = yield bcryptjs_1.default.hash(password, salt);
    return hashedPassward;
});
//Create JWT
const generateJWT = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        userId: id,
    }, config_keys_1.JWT_SECRET, { expiresIn: "10h" });
});
// Create New User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const userData = yield (0, user_model_1.getUserByEmail)(user === null || user === void 0 ? void 0 : user.email);
        if (userData) {
            return (0, error_1.default)(res, "User Already Exist", 400);
        }
        try {
            user.password = yield hashPassward(user === null || user === void 0 ? void 0 : user.password);
            //Call to Database
            const createdUser = yield (0, user_model_2.createNewUser)(user);
            const jwt_token = yield generateJWT(String(createdUser.id));
            return res.status(200).json({
                status: true,
                jwt_token,
            });
        }
        catch (error) {
            return (0, error_1.default)(res, "Something went wrong...", 502);
        }
    }
    catch (error) {
        return res.status(502).json({
            status: false,
            error: "Something went wrong...",
        });
    }
});
exports.createUser = createUser;
//Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const userData = yield (0, user_model_1.getUserByEmail)(user === null || user === void 0 ? void 0 : user.email);
        if (userData) {
            const validPassword = yield bcryptjs_1.default.compare(user.password, userData.password);
            if (validPassword) {
                const jwt_token = yield generateJWT(String(userData.id));
                return res.json({
                    status: true,
                    jwt_token,
                });
            }
            else {
                return (0, error_1.default)(res, "User and Password Deos not match", 400);
            }
        }
        else {
            return (0, error_1.default)(res, "User deos not exist", 400);
        }
    }
    catch (error) {
        return (0, error_1.default)(res, "Something went wrong", 502);
    }
});
exports.loginUser = loginUser;

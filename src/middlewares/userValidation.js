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
exports.userLoginValidation = exports.userCreateValidation = void 0;
const error_1 = __importDefault(require("../utils/error"));
const auth_validator_1 = require("../validators/auth.validator");
// User Create Validation
const userCreateValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { error } = auth_validator_1.registerUserSchema.validate(payload);
    if (error) {
        return (0, error_1.default)(res, `Error in User Data ${error.message}`);
    }
    else {
        next();
    }
});
exports.userCreateValidation = userCreateValidation;
// User Login Validation
const userLoginValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { error } = auth_validator_1.loginSchema.validate(payload);
    if (error) {
        return (0, error_1.default)(res, `Error in User Data ${error.message}`);
    }
    else {
        next();
    }
});
exports.userLoginValidation = userLoginValidation;

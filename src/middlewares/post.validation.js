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
exports.postCreateValidation = void 0;
const post_validator_1 = require("../validators/post.validator");
const error_1 = __importDefault(require("../utils/error"));
const postCreateValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { error } = post_validator_1.createPostSchema.validate(payload);
    if (error) {
        return (0, error_1.default)(res, `Error in User Data ${error.message}`);
    }
    else {
        next();
    }
});
exports.postCreateValidation = postCreateValidation;

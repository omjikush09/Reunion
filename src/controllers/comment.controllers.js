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
exports.createNewComment = void 0;
const error_1 = __importDefault(require("../utils/error"));
const comment_model_1 = require("./../model/comment.model");
const createNewComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!(req === null || req === void 0 ? void 0 : req.auth)) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const comment = req.body;
    const { postId } = req.params;
    try {
        const data = yield (0, comment_model_1.createComment)(comment, userId, Number(postId));
        return res.status(200).json({
            status: true,
            data: { id: data === null || data === void 0 ? void 0 : data.id }
        });
    }
    catch (error) {
        console.log(error);
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.createNewComment = createNewComment;

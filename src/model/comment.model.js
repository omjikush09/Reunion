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
exports.getCommentById = exports.createComment = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createComment = (comment, postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(postId);
    console.log(userId);
    console.log(comment);
    try {
        const data = yield prisma_1.default.comment.create({ data: Object.assign(Object.assign({}, comment), { postId, userId }) });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error("Something went wrong ");
    }
});
exports.createComment = createComment;
const getCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.user.findUnique({
            where: { id }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.getCommentById = getCommentById;

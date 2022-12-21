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
exports.deletePostById = exports.unlikePost = exports.likePost = exports.getPostsUserId = exports.getPostById = exports.createPost = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createPost = (userId, post) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.create({ data: Object.assign(Object.assign({}, post), { author: { connect: { id: userId } } }) });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error("Something went wrong ");
    }
});
exports.createPost = createPost;
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.findUnique({
            where: { id },
            include: {
                like: true,
                comments: true,
            }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.getPostById = getPostById;
const getPostsUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.findMany({
            where: { authorId: userId },
            include: {
                like: true,
                comments: true,
            },
            orderBy: { createdAt: "desc" }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.getPostsUserId = getPostsUserId;
const likePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.update({
            where: { id: postId },
            data: { like: {
                    connect: [{ id: userId }]
                } }
        });
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.likePost = likePost;
const unlikePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.update({
            where: { id: postId },
            data: { like: {
                    disconnect: [{ id: userId }]
                } }
        });
        return data;
    }
    catch (error) {
        console.log(error);
        throw new Error("Something went wrong ");
    }
});
exports.unlikePost = unlikePost;
const deletePostById = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.deleteMany({
            where: { AND: [{ id: postId }, { authorId: userId }] },
        });
        if (data.count < 1) {
            throw new Error("Post or User Not Found ");
        }
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.deletePostById = deletePostById;

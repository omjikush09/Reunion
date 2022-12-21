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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.unlike = exports.like = exports.getAllPost = exports.getPost = exports.createNewPost = void 0;
const post_model_1 = require("../model/post.model");
const error_1 = __importDefault(require("../utils/error"));
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!(req === null || req === void 0 ? void 0 : req.auth)) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const post = req.body;
    try {
        const _a = yield (0, post_model_1.createPost)(userId, post), { authorId, updatedAt } = _a, data = __rest(_a, ["authorId", "updatedAt"]);
        return res.status(200).json({
            status: true,
            data
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.createNewPost = createNewPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const data = yield (0, post_model_1.getPostById)(Number(postId));
        return res.status(200).json({
            status: true,
            //@ts-ignore
            data: data ? { title: data === null || data === void 0 ? void 0 : data.title, like: data === null || data === void 0 ? void 0 : data.like.length, comments: data === null || data === void 0 ? void 0 : data.comments } : null
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.getPost = getPost;
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.auth) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    try {
        const data = yield (0, post_model_1.getPostsUserId)(userId);
        const newData = data.map((post) => {
            return { id: post.id, title: post === null || post === void 0 ? void 0 : post.title, like: post === null || post === void 0 ? void 0 : post.like.length, comments: post === null || post === void 0 ? void 0 : post.comments, created_at: post.createdAt };
        });
        return res.status(200).json({
            status: true,
            //@ts-ignore
            data: newData
        });
    }
    catch (error) {
        console.log(error);
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.getAllPost = getAllPost;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!req.auth) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const { postId } = req.params;
    try {
        const data = yield (0, post_model_1.likePost)(Number(postId), userId);
        return res.status(200).json({
            status: true,
            data: "Liked Successfully"
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.like = like;
const unlike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!req.auth) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const { postId } = req.params;
    try {
        const data = yield (0, post_model_1.unlikePost)(Number(postId), userId);
        return res.status(200).json({
            status: true,
            data: "Unliked Successfully"
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.unlike = unlike;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!req.auth) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const { postId } = req.params;
    try {
        const data = yield (0, post_model_1.deletePostById)(Number(postId), userId);
        return res.status(200).json({
            status: true,
            data: "Deleted Successfully"
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 400);
    }
});
exports.deletePost = deletePost;

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
exports.unfollow = exports.follow = exports.getUser = void 0;
const user_model_1 = require("./../model/user.model");
const error_1 = __importDefault(require("./../utils/error"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!(req === null || req === void 0 ? void 0 : req.auth)) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    try {
        const data = yield (0, user_model_1.getUserById)(userId);
        console.log(data);
        return res.status(200).json({
            status: true,
            //@ts-ignore
            data: data ? { username: data === null || data === void 0 ? void 0 : data.username, followers: data === null || data === void 0 ? void 0 : data.followers.length, following: data === null || data === void 0 ? void 0 : data.following.length } : null
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.getUser = getUser;
// Follow User
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!req.auth) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const { followUserId } = req.params;
    try {
        const data = yield (0, user_model_1.followUser)(userId, Number(followUserId));
        return res.status(200).json({
            status: true,
            data: "Followed Successfully"
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.follow = follow;
// Unfollow User
const unfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let userId;
    if (!req.auth) {
        (0, error_1.default)(res, "unauthorised", 401);
        return;
    }
    const { userId } = req === null || req === void 0 ? void 0 : req.auth;
    const { unFollowUserId } = req.params;
    try {
        const data = yield (0, user_model_1.unFollowUser)(userId, Number(unFollowUserId));
        return res.status(200).json({
            status: true,
            data: "Unfollowed Successfully"
        });
    }
    catch (error) {
        (0, error_1.default)(res, "Something went wrong", 501);
    }
});
exports.unfollow = unfollow;

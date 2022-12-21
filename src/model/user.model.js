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
exports.unFollowUser = exports.followUser = exports.getUserById = exports.getUserByEmail = exports.createNewUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.user.create({ data: user });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.createNewUser = createNewUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.user.findUnique({
            where: { email }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.user.findUnique({
            where: { id },
            include: {
                following: true,
                followers: true
            }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.getUserById = getUserById;
const followUser = (userId, followUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.user.update({
            where: { id: userId },
            data: { following: { connect: [{ id: followUserId }] } }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.followUser = followUser;
const unFollowUser = (userId, followUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.user.update({
            where: { id: userId },
            data: { following: { disconnect: [{ id: followUserId }] } }
        });
        return data;
    }
    catch (error) {
        throw new Error("Something went wrong ");
    }
});
exports.unFollowUser = unFollowUser;

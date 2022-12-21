"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/user", auth_middleware_1.isAuthenticated, user_controller_1.getUser);
router.post("/follow/:followUserId", auth_middleware_1.isAuthenticated, user_controller_1.follow);
router.post("/unfollow/:unFollowUserId", auth_middleware_1.isAuthenticated, user_controller_1.unfollow);
exports.default = router;

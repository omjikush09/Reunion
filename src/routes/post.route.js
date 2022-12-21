"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controllers_1 = require("../controllers/post.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const post_validation_1 = require("../middlewares/post.validation");
const router = express_1.default.Router();
//GET
router.get("/posts/:postId", auth_middleware_1.isAuthenticated, post_controllers_1.getPost);
router.get("/all_posts/", auth_middleware_1.isAuthenticated, post_controllers_1.getAllPost);
//DELETE
router.delete("/posts/:postId", auth_middleware_1.isAuthenticated, post_controllers_1.deletePost);
//POST
router.post("/posts", auth_middleware_1.isAuthenticated, post_validation_1.postCreateValidation, post_controllers_1.createNewPost);
router.post("/like/:postId", auth_middleware_1.isAuthenticated, post_controllers_1.like);
router.post("/unlike/:postId", auth_middleware_1.isAuthenticated, post_controllers_1.unlike);
exports.default = router;

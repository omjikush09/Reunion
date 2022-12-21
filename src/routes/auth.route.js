"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = require("./../middlewares/userValidation");
const auth_controller_1 = require("./../controllers/auth.controller");
const router = express_1.default.Router();
//Create New User
router.post("/user", userValidation_1.userCreateValidation, auth_controller_1.createUser);
//Login User
router.post("/", userValidation_1.userLoginValidation, auth_controller_1.loginUser);
exports.default = router;

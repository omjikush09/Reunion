import express from "express"
import { createNewComment } from "../controllers/comment.controllers";

import { isAuthenticated } from "../middlewares/auth.middleware";


const router = express.Router();


router.post("/comment/:postId",isAuthenticated,createNewComment)
export default router;


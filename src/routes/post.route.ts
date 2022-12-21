import express from "express"
import { createNewPost, deletePost, getAllPost, getPost, like, unlike } from "../controllers/post.controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { postCreateValidation } from "../middlewares/post.validation";


const router = express.Router();
//GET
router.get("/posts/:postId",isAuthenticated,getPost) 
router.get("/all_posts/",isAuthenticated,getAllPost) 
//DELETE
router.delete("/posts/:postId",isAuthenticated,deletePost)
//POST
router.post("/posts",isAuthenticated,postCreateValidation,createNewPost)
router.post("/like/:postId",isAuthenticated,like)
router.post("/unlike/:postId",isAuthenticated,unlike)

export default router;


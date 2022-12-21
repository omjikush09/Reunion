import express from "express"
import { follow, getUser, unfollow } from './../controllers/user.controller';
import { isAuthenticated } from "../middlewares/auth.middleware";


const router = express.Router();

router.get("/user",isAuthenticated,getUser)
router.post("/follow/:followUserId",isAuthenticated,follow)
router.post("/unfollow/:unFollowUserId",isAuthenticated,unfollow)
export default router;


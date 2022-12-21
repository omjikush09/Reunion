import express from "express";
import { userCreateValidation, userLoginValidation } from './../middlewares/userValidation';
import { createUser, loginUser } from './../controllers/auth.controller';

const router= express.Router();


//Create New User
router.post("/user",userCreateValidation,createUser)

//Login User
router.post("/",userLoginValidation,loginUser)


export default router;
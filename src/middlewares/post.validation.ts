import { createPostSchema } from "../validators/post.validator";
import errorFunction from "../utils/error";
import { Response,NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../types";
export const postCreateValidation=async(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction)=>{
    const payload=req.body;
    const {error}=createPostSchema.validate(payload);
    if(error){
        return errorFunction(res,`Error in User Data ${error.message}`)
    }else{
        next();
    }
}
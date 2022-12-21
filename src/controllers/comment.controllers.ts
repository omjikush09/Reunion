import { IGetUserAuthInfoRequest } from "../types";
import { Response } from "express";
import errorFunction from "../utils/error";
import { createComment } from './../model/comment.model';


export const createNewComment=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req?.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }
    const {userId}=req?.auth;
    const comment=req.body;
    const {postId}=req.params;

    try {
        const data=await createComment(comment,userId,Number(postId))
        return res.status(200).json({
            status:true,
            data:{id:data?.id}
        })
    } catch (error) {
        console.log(error);
        
        errorFunction(res,"Something went wrong",501)
    }
}
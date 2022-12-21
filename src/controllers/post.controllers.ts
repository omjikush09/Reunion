import { Response } from "express";
import { createPost, deletePostById, getPostById, getPostsUserId, likePost, unlikePost } from "../model/post.model";
import { IGetUserAuthInfoRequest } from "../types";
import errorFunction from "../utils/error";


export const createNewPost=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req?.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }
    const {userId}=req?.auth;
    const post=req.body;
    try {
        const {authorId,updatedAt,...data}=await createPost(userId,post)
        return res.status(200).json({
            status:true,
            data
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}

export const getPost=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    const {postId}=req.params;

    try {
        const data=await getPostById(Number(postId))        
        return res.status(200).json({
            status:true,
            //@ts-ignore
            data:data?{title:data?.title,like:data?.like.length,comments:data?.comments}:null
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}

export const getAllPost=async (req:IGetUserAuthInfoRequest,res:Response)=>{

    if(!req.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }

    const {userId}=req?.auth;
    try {
        const data=await getPostsUserId(userId)
        const newData=data.map((post)=>{
            return {id:post.id,title:post?.title,like:post?.like.length,comments:post?.comments,created_at:post.createdAt}
        })
        return res.status(200).json({
            status:true,
            //@ts-ignore
            data:newData
        })
    } catch (error) {
        console.log(error);
        
        errorFunction(res,"Something went wrong",501)
    }
}



export const like=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }

    const {userId}=req?.auth;
    const { postId}=req.params;

    try {
        const data=await likePost(Number(postId),userId)
        return res.status(200).json({
            status:true,
            data:"Liked Successfully"
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}

export const unlike=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }

    const {userId}=req?.auth;
    const { postId}=req.params;

    try {
        const data=await unlikePost(Number(postId),userId)
        return res.status(200).json({
            status:true,
            data:"Unliked Successfully"
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}

export const deletePost=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }

    const {userId}=req?.auth;
    const { postId}=req.params;

    try {
        const data=await deletePostById(Number(postId),userId)
        return res.status(200).json({
            status:true,
            data:"Deleted Successfully"
        })
    } catch (error:any) {
        errorFunction(res,"Something went wrong",400)
    }
}
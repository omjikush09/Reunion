import {  Response } from "express";
import { IGetUserAuthInfoRequest } from "../types";
import { unFollowUser, followUser, getUserById } from './../model/user.model';
import errorFunction from './../utils/error';



export const getUser=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req?.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }
    
    const {userId}=req?.auth;

    try {
        const data=await getUserById(userId)
        console.log(data);
        
        return res.status(200).json({
            status:true,
            //@ts-ignore
            data:data?{username:data?.username,followers:data?.followers.length,following:data?.following.length}:null
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}


// Follow User
export const follow=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req.auth!){
        errorFunction(res,"unauthorised",401)
        return;
    }

    const {userId}=req?.auth;
    const { followUserId}=req.params;

    try {
        const data=await followUser(userId,Number(followUserId))
        return res.status(200).json({
            status:true,
            data:"Followed Successfully"
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}


// Unfollow User
export const unfollow=async (req:IGetUserAuthInfoRequest,res:Response)=>{
    // let userId;
    if(!req.auth){
        errorFunction(res,"unauthorised",401)
        return;
    }

    const {userId}=req?.auth;
    const { unFollowUserId}=req.params;

    try {
        const data=await unFollowUser(userId,Number(unFollowUserId))
        return res.status(200).json({
            status:true,
            data:"Unfollowed Successfully"
        })
    } catch (error) {
        errorFunction(res,"Something went wrong",501)
    }
}
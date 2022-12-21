import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/config.keys";
import errorFunction from './../utils/error';
import  jwt  from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from "../types";


export const isAuthenticated=async(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization){
        return errorFunction(res,"Unauthorized",401)
    }
    if(req.headers.authorization?.startsWith("Bearer ")){
        const authorizationHeader=req.headers.authorization;
    
    const token =authorizationHeader.substring(7,authorizationHeader?.length);
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            return errorFunction(res,"Unauthorized",401)
        }
       //@ts-ignore
        const {userId}=decoded!;
        req.auth={userId:Number(userId)}
        next();
    })
    
    }else{
    return errorFunction(res,"Unauthorized",401)
    }

}
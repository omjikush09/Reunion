import prisma from "../utils/prisma";

interface User {
    email: string;
    username: string;
    password: string;
  }
  

export const createNewUser=async (user:User)=>{
    try {
        const data=await prisma.user.create({ data: user });
        return data;
    } catch (error) {
         throw new Error("Something went wrong ");
    }
}

export const getUserByEmail=async(email:string)=>{
    try {
        const data=await prisma.user.findUnique({
            where:{email}
        })
        return data;
    } catch (error) {
        throw new Error("Something went wrong ");
    }
}

export const getUserById=async(id:number)=>{
    try {
        const data=await prisma.user.findUnique({
            where:{id},
            include:{
                following:true,
                followers:true
            }
        })
        return data;
    } catch (error) {
        throw new Error("Something went wrong ");
    }
}

export const followUser=async(userId:number,followUserId:number)=>{
    try {
        const data=await prisma.user.update({
            where:{id:userId},
            data:{following:{ connect:[{id:followUserId}]}}
        })
        return data;
    } catch (error) {
        throw new Error("Something went wrong ");
    }
}

export const unFollowUser=async(userId:number,followUserId:number)=>{
    try {
        const data=await prisma.user.update({
            where:{id:userId},
            data:{following:{ disconnect:[{id:followUserId}]}}
        })
        return data;
    } catch (error) {
        throw new Error("Something went wrong ");
    }
}
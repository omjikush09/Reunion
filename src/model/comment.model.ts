import prisma from "../utils/prisma";

export const createComment=async (comment:any,postId:number,userId:number)=>{
    console.log(postId);
    console.log(userId);
    console.log(comment);
    
    try {
        const data=await prisma.comment.create({ data: {...comment,postId,userId}});
        return data;
    } catch (error) {
        console.log(error);
        
         throw new Error("Something went wrong ");
    }
}

export const getCommentById=async(id:number)=>{
    try {
        const data=await prisma.user.findUnique({
            where:{id}
        })
        return data;
    } catch (error) {
        
        throw new Error("Something went wrong ");
    }
}

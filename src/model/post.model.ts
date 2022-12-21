import prisma from "../utils/prisma";

  

export const createPost=async (userId:number,post:any)=>{
    try {
        const data=await prisma.post.create({ data:{...post,author:{connect:{id:userId}}} });
        return data;

    } catch (error) {
        console.log(error);
        
         throw new Error("Something went wrong ");
    }
}

export const getPostById=async(id:number)=>{
    try {
        const data=await prisma.post.findUnique({
            where:{id},
            include:{
                like:true,
                comments:true,
            }
        })
        return data;
    } catch (error) {        
        throw new Error("Something went wrong ");
    }
}

export const getPostsUserId=async(userId:number)=>{
    try {
        const data=await prisma.post.findMany({
            where:{authorId:userId},
            include:{
                like:true,
                comments:true,
            },
            orderBy:{createdAt:"desc"}
        })
        return data;
    } catch (error) {        
      
        
        throw new Error("Something went wrong ");
    }
}



export const likePost=async(postId:number,userId:number)=>{
    try {
        const data=await prisma.post.update({
            where:{id:postId},
            data:{like:{
                connect:[{id:userId}]
            }}
        })
    } catch (error) {
        throw new Error("Something went wrong ");
    }
}

export const unlikePost=async(postId:number,userId:number)=>{

    try {
        const data=await prisma.post.update({
            where:{id:postId},
            data:{like:{
                disconnect:[{id:userId}]
            }}
        })
        return data;
        
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong ");
        
    }
}

export const deletePostById=async(postId:number,userId:number)=>{
    try {

        const data=await prisma.post.deleteMany({
            where:{AND:[{id:postId},{authorId:userId}]},
        })
        
        if(data.count<1){
            throw new Error("Post or User Not Found ");
        }
        
        return data;
    } catch (error) {
        throw new Error("Something went wrong ");
    }
}
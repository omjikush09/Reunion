import Joi from "joi";

const createPostSchema=Joi.object({
    title:Joi.string().max(30).required(),
    desc:Joi.string()

})


export {createPostSchema};
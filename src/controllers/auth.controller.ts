import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.keys";
import errorFunction from "./../utils/error";
import { getUserByEmail } from "../model/user.model";
import { createNewUser } from './../model/user.model';

//Hash Password
const hashPassward = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassward = await bcrypt.hash(password, salt);
  return hashedPassward;
};

//Create JWT
const generateJWT = async (id: string) => {
  return jwt.sign(
    {
      userId:id,
    },
    JWT_SECRET,
    { expiresIn: "10h" }
  );
};

// Create New User
export const createUser = async (req: Request, res: Response) => {
  const user:{email:string,username:string,password:string} = req.body;

  try {
    const userData = await getUserByEmail(user?.email);
    if (userData) {
      return errorFunction(res, "User Already Exist", 400);
    }
    try {
      user.password = await hashPassward(user?.password);
      //Call to Database
      const createdUser = await createNewUser(user);
      const jwt_token = await generateJWT(String(createdUser.id));

      return res.status(200).json({
        status: true,   
        jwt_token,
      });
    } catch (error) {
      return errorFunction(res, "Something went wrong...", 502);
    }
  } catch (error) {
    return res.status(502).json({
      status: false,
      error: "Something went wrong...",
    });
  }
};

//Login User
export const loginUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const userData = await getUserByEmail(user?.email)
    if (userData) {
      const validPassword = await bcrypt.compare(
        user.password,
        userData.password
      );
      if (validPassword) {
        const jwt_token = await generateJWT(String(userData.id));
        return res.json({
          status: true,      
          jwt_token,
        });
      } else {
        return errorFunction(res, "User and Password Deos not match", 400);
      }
    } else {
      return errorFunction(res, "User deos not exist", 400);
    }
  } catch (error) {
    return errorFunction(res, "Something went wrong", 502);
  }
};


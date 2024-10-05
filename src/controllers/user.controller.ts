import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { UserModel } from "../models/user.model";

export class UserController{

    public static async registerUser(req: Request, res: Response): Promise<void>{
        const hashedPasswd = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel(req.body.role, req.body.email, req.body.username, hashedPasswd)
        res.status(200).json({message: "user créé", user});
    }

    public static async loginUser(req: Request, res: Response): Promise<void>{
        
    }
}
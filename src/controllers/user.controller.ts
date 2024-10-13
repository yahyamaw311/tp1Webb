import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service"

export class UserController{

    public static async registerUser(req: Request, res: Response): Promise<void>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(req.body.email)){
            res.status(400).json({ message: "Données invalides"});
            return;
        }
        const hashedPasswd = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel(req.body.role, req.body.email, req.body.username, hashedPasswd)

        await UserService.registerUser(user).then(
            result => {
                result ? res.status(201).json({message: "user créé"}) :
                    res.status(500).json({message: "Erreur dans l'inscription"});
            } 
        )
    }


    public static async loginUser(req: Request, res: Response): Promise<void>{
        const {email, password} = req.body;
        if(email.length * password.length === 0){
            res.status(400).json({ message: "Données invalides"});
            return;
        }

        await UserService.loginUser(email, password).then(
            token => {
                if(token){
                    res.setHeader('authorization', `bearer ${token}`);
                    res.status(200).json({token: token});
                    return;
                }
                
                res.status(401).json({message: "Authentification failed"})
            }
        )

    }
}
import { UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "../config/config";


export class UserService{

    private static users: UserModel[] = [];

    public static async registerUser(user: UserModel): Promise<boolean>{
        const initialLength: number = this.users.length;

        // check if user already exist with email
        if(this.users.findIndex(u => u.email === user.email) !== -1){
            return false;
        }

        this.users.push(user);
        return this.users.length > initialLength;
    }

    public static async loginUser(email: string, password: string){
        const user = this.users.find(u => u.email === email);
        if(user && await bcrypt.compare(password, user.password)){
            const accessToken = jwt.sign({username: user.username}, String(config.jwt_secret), {expiresIn: '1h'});
            return accessToken;
        }

        return "null";
    }

    
}
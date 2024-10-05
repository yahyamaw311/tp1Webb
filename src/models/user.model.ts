import { User } from "../interfaces/user.interface";


export class UserModel implements User{
    role: string;
    email: string;
    username: string;
    password: string;
    
    constructor(role: string, email: string, username: string, password: string) {
        this.role = role;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
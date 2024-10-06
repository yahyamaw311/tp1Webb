import { Router } from "express";
import bcrypt from 'bcryptjs';
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post('/register', UserController.registerUser)

userRoutes.post('/login', UserController.loginUser)

export default userRoutes;
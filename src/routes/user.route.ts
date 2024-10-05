import { Router } from "express";
import bcrypt from 'bcryptjs';
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();
const users = [];

// userRoutes.post('/register', async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { username: req.body.username, password: hashedPassword};
//     users.push(user);
//     res.status(201).send(user)
// })

userRoutes.post('/register', UserController.registerUser)

userRoutes.post('/login', UserController.loginUser)

export default userRoutes;
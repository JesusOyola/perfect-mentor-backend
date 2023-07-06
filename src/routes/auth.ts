import { Router } from "express";
import { loginUser, newUser } from "../controllers/user";

const authRouter = Router();

authRouter.post("/register",newUser);
authRouter.post("/login",loginUser);


export default authRouter;
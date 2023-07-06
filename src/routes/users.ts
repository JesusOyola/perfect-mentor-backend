import { Router } from "express";
import { getAllUsers } from "../controllers/user";
import validateToken from "../helpers/validate-token";


const userRouter = Router();

userRouter.get('/',validateToken,getAllUsers);

export default userRouter;
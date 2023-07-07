import { Router } from "express";
import { getAllUsers } from "../controllers/user";
import validateToken from "../helpers/validate-token";
import validateRoleToken from "../helpers/validate-role-token";


const userRouter = Router();

userRouter.get('/',validateToken, validateRoleToken(['ADMIN','MENTEE','MENTOR']),getAllUsers);

export default userRouter;
import { Router } from "express";
import authRouter from "./auth";
import dotenv from 'dotenv';
import userRouter from "./users";
dotenv.config({path:'./src/config/.env'});

const indexRouter = Router();

indexRouter.get('/', (req, res)=>{
res.send('Hello World')
})
indexRouter.use("/api/auth", authRouter);
indexRouter.use("/api/users", userRouter);

export default indexRouter
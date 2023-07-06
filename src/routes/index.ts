import { Router } from "express";
import authRouter from "./auth";

const indexRouter = Router();

indexRouter.get('/', (req, res)=>{
res.send('Hello World')
})
indexRouter.use("/api/auth", authRouter)

export default indexRouter
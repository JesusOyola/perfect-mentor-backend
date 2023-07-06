"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", user_1.newUser);
authRouter.post("/login", user_1.loginUser);
exports.default = authRouter;

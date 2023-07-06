"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("../helpers/validate-token"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', validate_token_1.default, user_1.getAllUsers);
exports.default = userRouter;

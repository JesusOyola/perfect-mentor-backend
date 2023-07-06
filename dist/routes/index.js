"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const indexRouter = (0, express_1.Router)();
indexRouter.get('/', (req, res) => {
    res.send('Hello World');
});
indexRouter.use("/api/auth", auth_1.default);
exports.default = indexRouter;

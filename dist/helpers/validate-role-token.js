"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateRoleToken = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headerToken = req.headers["authorization"];
    //console.log(headerToken)
    if (headerToken != undefined) {
        try {
            const bearerToken = headerToken.slice(7);
            const verifiToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || "jesus36341423");
            /* console.log(verifiToken) */
            const userData = yield user_1.default.findByPk(verifiToken.id);
            console.log("userdata", userData === null || userData === void 0 ? void 0 : userData.dataValues.role);
            const userRole = yield (userData === null || userData === void 0 ? void 0 : userData.dataValues.role).toUpperCase();
            //console.log("userRole", userRole)
            if (role.includes(userRole)) {
                next();
            }
            else {
                res.status(401).json({
                    msg: "Acceso Denegado",
                });
            }
        }
        catch (error) {
            res.status(401).json({
                msg: "Token no válido",
            });
        }
    }
    else {
        res.status(401).json({
            msg: "Acceso Denegado",
        });
    }
});
exports.default = validateRoleToken;

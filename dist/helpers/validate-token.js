"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers["authorization"];
    //console.log(headerToken)
    if (headerToken != undefined) {
        try {
            const bearerToken = headerToken.slice(7);
            const verifiToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || "jesus36341423");
            /* console.log(verifiToken)
            console.log((verifiToken as JwtPayload).id)  */
            next();
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
};
exports.default = validateToken;

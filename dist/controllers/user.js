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
exports.getAllUsers = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, role, email, password } = req.body;
    // Hasheamos la contraseña
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Validamos si el usuario existe en la base de datos;
    const user = yield user_1.default.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el siguiente email ${email}`,
        });
    }
    try {
        //Guardamos al usuario en la base de datos.
        yield user_1.default.create({
            username: username,
            role: role,
            email: email,
            password: hashedPassword,
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: " Ocurrió un error",
            error,
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, role, email, password } = req.body;
    //Validamos si el usuario existe en la base de datos;
    const user = yield user_1.default.findOne({
        where: { email: email },
    });
    if (!user) {
        return res.status(400).json({
            msg: `No existe usuario registrado con el email ${email}`,
        });
    }
    // Validamos el password
    const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(400).json({
            msg: `La contraseña es incorrecta`,
        });
    }
    //Generamos un token
    const token = jsonwebtoken_1.default.sign({
        username: username,
        role: role,
        email: email,
        password: password,
    }, process.env.SECRET_KEY || "jesus36341423");
    res.send(token);
    /* try {
          res.json({
              msg: `Usuario logueado exitosamente!`,
              body: req.body
          })
      } catch (error) {
          res.status(400).json({
              msg: " Ocurrió un error",
              error,
            })
      }
   */
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.default.findAll();
    res.json(listUsers);
});
exports.getAllUsers = getAllUsers;

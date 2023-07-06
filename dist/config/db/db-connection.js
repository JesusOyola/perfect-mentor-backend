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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class MySqlConnection {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize('thePerfectMentor', 'root', 'jesus36341423', {
            host: 'localhost',
            dialect: 'mysql',
        });
    }
    conectionDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log('CONEXION CON LA BASE DE DATOS EXITOSA!');
            }
            catch (error) {
                console.error('ERROR AL CONECTARSE CON LA BASE DE DATOS', error);
            }
        });
    }
}
exports.default = MySqlConnection;

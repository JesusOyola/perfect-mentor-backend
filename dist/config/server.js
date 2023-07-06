"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_connection_1 = __importDefault(require("./db/db-connection"));
const routes_1 = __importDefault(require("../routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT) || 3001;
        this.listen();
        this.midlewares(); //Los midlewares van antes de las rutas siempre para que puedan leer el formato json.
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacción corriendo en el puerto ${this.port}`);
        });
    }
    dbConnect() {
        new db_connection_1.default().conectionDb();
    }
    routes() {
        this.app.use('/', routes_1.default);
    }
    midlewares() {
        /* Parseamos el body, para que lo pueda leer */
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;

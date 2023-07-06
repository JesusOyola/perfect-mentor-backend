import express, { Application } from "express"
import cors from "cors";
import MySqlConnection from "./db/db-connection"
import indexRouter from "../routes"


class Server {
  private app: Application
  private port: number

  constructor() {
    this.app = express()
    this.port = parseInt((process as any).env.PORT) || 3001
    this.listen()
    this.midlewares() //Los midlewares van antes de las rutas siempre para que puedan leer el formato json.
    this.routes()
    this.dbConnect()
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacción corriendo en el puerto ${this.port}`)
    })
  }

  dbConnect() {
    new MySqlConnection().conectionDb()
  }

  routes(){
    this.app.use('/', indexRouter)
  }

  midlewares() {
    /* Parseamos el body, para que lo pueda leer */
    this.app.use(express.json())

    //cors
    this.app.use(cors())
  }
}

export default Server

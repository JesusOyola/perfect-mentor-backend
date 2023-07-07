import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user"
import JwtPayload from "../interfaces/id-verifi-token"

const validateRoleToken =
  (role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers["authorization"]
    //console.log(headerToken)

    if (headerToken != undefined) {
      try {
        const bearerToken = headerToken.slice(7)
        const verifiToken = jwt.verify(
          bearerToken,
          process.env.SECRET_KEY || "jesus36341423"
        )
        /* console.log(verifiToken) */
        const userData = await User.findByPk(
          (verifiToken as JwtPayload).id
        )
        console.log("userdata", userData?.dataValues.role)
        const userRole =
          await (userData?.dataValues.role).toUpperCase()
        //console.log("userRole", userRole)
        if (role.includes(userRole)) {
          next()
        } else {
          res.status(401).json({
            msg: "Acceso Denegado",
          })
        }
      } catch (error) {
        res.status(401).json({
          msg: "Token no válido",
        })
      }
    } else {
      res.status(401).json({
        msg: "Acceso Denegado",
      })
    }
  }

export default validateRoleToken

import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"


const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers["authorization"]
  //console.log(headerToken)

  if (headerToken != undefined) {
    try {
      const bearerToken = headerToken.slice(7)
      const verifiToken = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || "jesus36341423"
      )
      /* console.log(verifiToken)
      console.log((verifiToken as JwtPayload).id)  */
      next()
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

export default validateToken

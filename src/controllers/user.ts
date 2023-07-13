import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user"

export const newUser = async (req: Request, res: Response) => {
  const { id, username, role, email, password } = req.body

  // Hasheamos la contraseña

  const hashedPassword = await bcrypt.hash(password, 10)

  // Validamos si el usuario existe en la base de datos;

  const user = await User.findOne({ where: { email: email } })

  if (user) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el siguiente email ${email}`,
    })
  }

  try {
    //Guardamos al usuario en la base de datos.
    await User.create({
      username: username,
      role: role,
      email: email,
      password: hashedPassword,
    })

    res.json({
      msg: `Usuario ${username} creado exitosamente`,
    })
  } catch (error) {
    res.status(400).json({
      msg: " Ocurrió un error",
      error,
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, role, email, password } = req.body

  //Validamos si el usuario existe en la base de datos;

  const user: any = await User.findOne({
    where: { email: email },
  })

  if (!user) {
    return res.status(400).json({
      msg: `No existe usuario registrado con el email ${email}`,
    })
  }

  // Validamos el password

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password
  )

  if (!passwordIsValid) {
    return res.status(400).json({
      msg: `La contraseña es incorrecta`,
    })
  }

  //Generamos un token

  const token = jwt.sign(
    {
      id: user.id,
      username: username,
      role: role,
      email: email,
    },
    process.env.SECRET_KEY || "jesus36341423"
  )

  console.log(token)

  res.json(token)
  

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
}

export const getAllUsers = async (req: Request, res: Response) => {
  const listUsers = await User.findAll()
  res.json(listUsers)
}

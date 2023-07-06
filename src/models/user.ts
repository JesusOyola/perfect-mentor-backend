import { DataTypes } from "sequelize";
import MySqlConnection from "../config/db/db-connection"
const db = new MySqlConnection().sequelize

const User = db.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
      },
      role:{
        type: DataTypes.STRING,
        allowNull:false
      },
      email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
      },
      password: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  )

  export default User;
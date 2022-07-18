import { Model, DataTypes } from "sequelize";
import sequelize from "./../database/conexion";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 25],
          msg: "Must be between 5 and 25 characters",
        },
      },
      unique: {
        args: true,
        msg: "Must be unique"
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Must be a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;

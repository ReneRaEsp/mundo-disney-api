import { Model, DataTypes } from "sequelize";
import sequelize from "../database/conexion";

class Personaje extends Model {}

Personaje.init(
  {
    imagen: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 25],
          msg: "Must be bewteen 5 and 25 characters",
        },
      },
    },
    edad: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Must be a valid age",
        },
      },
    },
    peso: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          args: true,
          msg: "Must be a valid weight",
        },
      },
    },
    historia: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [35, 255],
          msg: "Must be between 35 and 255 characters",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "personaje",
    timestamps: false,
  }
);

module.exports = Personaje;

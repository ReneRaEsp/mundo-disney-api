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
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.FLOAT,
    },
    historia: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "personaje",
    timestamps: false,
  }
);

module.exports = Personaje;


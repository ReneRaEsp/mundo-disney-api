import { Model, DataTypes } from "sequelize";
import sequelize from "../database/conexion";

class PAV extends Model {}

PAV.init(
  {
    imagen: {
      type: DataTypes.STRING,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
    },
    calificacion: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 0.0,
          msg: "Must be higher or equal than 0",
        },
        max: {
          args: 5.0,
          msg: "Must be lower or equal than 5",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "PAV",
    timestamps: false,
  }
);

module.exports = PAV;

import { Model, DataTypes } from "sequelize";
import sequelize from "./../conexion";

class PAV extends Model {}

PAV.init({
  imagen: {
    type: DataTypes.STRING,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  fechaCreacion: {
    type: DataTypes.DATEONLY,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    validate: {
        min: 1,
        max: 5
    }
  },
}, {
    sequelize,
    modelName: "PAV",
    timestamps: false
});

module.exports = PAV;
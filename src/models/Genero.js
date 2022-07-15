import { Model, DataTypes } from "sequelize";
import sequelize from "../database/conexion";

class Genero extends Model {}

Genero.init({
    nombre: {
        type: DataTypes.STRING
    },
    imagen: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: "genero",
    timestamps: false
});

module.exports = Genero;
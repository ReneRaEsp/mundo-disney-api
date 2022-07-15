import Personaje from "../models/Personaje";
import PAV from "../models/PAV";
import Genero from "../models/Genero";

Genero.hasMany(PAV);
PAV.belongsTo(Genero);

Personaje.belongsToMany(PAV, { through: "personaje_pav" });
PAV.belongsToMany(Personaje, { through: "personaje_pav" });



import express from "express";
import sequelize from "./database/conexion";
require("./database/associations");
//Routes
import personajesRoutes from "./routes/personajes";
import usuariosRoutes from "./routes/users";

async function main() {
  const PORT = process.env.PORT || 5000;

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "./../public"));

  //Routes
  app.use(personajesRoutes);
  app.use(usuariosRoutes);

  await sequelize.sync({ force: false });

  app.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
}

main();

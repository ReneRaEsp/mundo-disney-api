import express from "express";
import { sequelize } from "./conexion";

async function main() {
  const PORT = process.env.PORT || 5000;

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "./../public"));

  await sequelize.sync({ force: false });

  app.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
}

main();
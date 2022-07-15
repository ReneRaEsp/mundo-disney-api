//conection
import sequelize from "../src/database/conexion";
//models
import Personaje from "./../src/models/Personaje";
import PAV from "./../src/models/PAV";
import Genero from "./../src/models/Genero";
//associations
require("./../src/database/associations");

//Genero
const generos = [
  { nombre: "Aventura", imagen: "aventura.jpg" },
  { nombre: "Super heroes", imagen: "super.jpg" },
];

//Productos Audio Visuales
const PAVs = [
  {
    imagen: "aladin-movie.jpg",
    titulo: "Aladdin y los 40 ladrones",
    fechaCreacion: "2001/05/01",
    calificacion: 4.4,
    generoId: 1,
  },
];

//Personajes
const personajes = [
  {
    imagen: "aladdin.jpg",
    nombre: "Aladdin",
    edad: 23,
    peso: 73.2,
    historia:
      "Nacio en Agraba en la antigua arabia y robaba para sobrevivir hasta que un dia encontró una lampara magica y su vida cambio",
  },
  {
    imagen: "jazmin.jpg",
    nombre: "Jazmin",
    edad: 22,
    peso: 62.4,
    historia:
      "Era la hija del sultan de Agraba y vivia una vida de lujos pero su vida cambió cuando salio del palacio disfrazada de aldeana y vio que habia mucha pobreza en su reino",
  },
];

async function seed() {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Conexion establecida...");
    })
    .then(() => {
      generos.forEach((genero) => Genero.create(genero));
    })
    .then(async () => {
      let movie1 = await PAV.create(
        {
          imagen: "aladin-movie.jpg",
          titulo: "Aladdin y los 40 ladrones",
          fechaCreacion: "2001/05/01",
          calificacion: 4.4,
          generoId: 1,
          personajes: [personajes[0], personajes[1]],
        },
        {
          include: "personajes",
        }
      );

      let movie2 = await PAV.create({
        imagen: "avengers.jpg",
        titulo: "Avengers",
        fechaCreacion: "2012/05/01",
        calificacion: 4.8,
        generoId: 2,
      });

      let personaje1 = await Personaje.create({
        imagen: "stark.jpg",
        nombre: "Tony Stark",
        edad: 44,
        peso: 80.2,
        historia: "Es Ironman",
      });

      movie2.addPersonajes([personaje1]);
    });
}

seed();

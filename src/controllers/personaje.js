//Models
import Personaje from "./../models/Personaje";
import PAV from "./../models/PAV";
// Assosiations
require("./../database/associations");

export default {
  list: async (req, res) => {
    try {
      const personajes = await Personaje.findAll({
        include: [
          {
            model: PAV,
            attributes: ["imagen", "titulo"],
          },
        ],
        attributes: ["nombre", "imagen"],
      });

      res.status(200).send(personajes);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  add: async (req, res) => {
    try {
      const personaje = await Personaje.create({
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        edad: req.body.edad,
        peso: req.body.peso,
        historia: req.body.historia,
      });
      res.status(200).send(personaje);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  update: async (req, res) => {
    try {
      const personaje = await Personaje.update(
        {
          imagen: req.body.imagen,
          nombre: req.body.nombre,
          edad: req.body.edad,
          peso: req.body.peso,
          historia: req.body.historia,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send(personaje);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  remove: async (req, res) => {
    try {
      const personaje = await Personaje.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(personaje);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  charDetails: async (req, res) => {
    try {
      const personaje = await Personaje.findByPk(req.params.id);
      res.status(200).json(personaje);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  charQuery: async (req, res) => {
    if (req.query.name) {
      try {
        const personaje = await Personaje.findOne({
          where: { nombre: req.query.name },
        });
        if (personaje === null) {
          res.status(404).json({ message: "No encontrado" });
        } else {
          res.status(200).json(personaje);
        }
      } catch (e) {
        res.status(500).send(e);
      }
    } else if (req.query.age) {
      try {
        const personajes = await Personaje.findAll({
          where: { edad: req.query.age },
        });
        if (personajes === null) {
          res.status(404).json({ message: "No encontrado" });
        } else {
          res.status(200).json(personajes);
        }
      } catch (e) {
        res.status(500).send(e);
      }
    } else if (req.query.movie) {
      try {
        const movie = await PAV.findByPk(req.query.movie, {
          include: [
            {
              model: Personaje,
              attributes: ["nombre", "imagen"],
            },
          ],
        });
        if (movie === null) {
          res.status(404).json({ message: "Personajes no encontrados" });
        } else {
          res.status(200).json(movie.personajes);
        }
      } catch (e) {
        res.status(500).json({
          message: "Error",
        });
      }
    } else {
      res.status(500).send({ message: "Consulta no valida" });
    }
  },
};

//Models
import PAV from "./../models/PAV";
import Personaje from "./../models/Personaje";
import Genero from "./../models/Genero";
import { resolveShowConfigPath } from "@babel/core/lib/config/files";
//Associations
require("./../database/associations");

export default {
  list: async (req, res, next) => {
    try {
      const PAVs = await PAV.findAll({
        attributes: ["imagen", "titulo", "fechaCreacion"],
      });
      res.status(200).send(PAVs);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
      next(err);
    }
  },
  query: async (req, res, next) => {
    try {
      const pav = await PAV.findByPk(req.params.id, {
        include: [
          {
            model: Personaje,
            attributes: ["nombre"],
          },
          {
            model: Genero,
            attributes: ["nombre"],
          },
        ],
      });
      if (!pav) {
        res.status(404).send({ message: "Movie not found" });
      }
      res.status(200).send(pav);
    } catch (err) {
      res
        .status(500)
        .send({ message: "Internal server error while finding movie" });
      next(err);
    }
  },
  add: async (req, res, next) => {
    if (req.body.genero) {
      const genero = await Genero.findByPk(req.body.genero);
    }
    try {
      const pav = await PAV.create({
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        fechaCreacion: req.body.fechaCreacion,
        calificacion: req.body.calificacion,
        genero,
      });
      res.status(200).send(pav);
    } catch (err) {
      res
        .status(500)
        .send({ message: "Internal sever error while adding movie" });
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const pav = await PAV.update(
        {
          titulo: req.body.titulo,
          imagen: req.body.imagen,
          fechaCreacion: req.body.fechaCreacion,
          calificacion: req.body.calificacion,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(200).send(pav);
    } catch (err) {
      res.status(500).send({ message: "Internal server error while updating" });
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const pav = await PAV.destroy(req.params.id);
      res.status(200).send(pav);
    } catch (err) {
      res.status(500).send({ message: "Internal server error while deleting" });
      next(err);
    }
  },
  getGenero: async (req, res, next) => {
    try {
      const pav = await PAV.findOne(req.body.id);
      const genero = await pav.getGenero();
      res.status(200).send(genero);
    } catch (err) {
      res.status(500).send({ message: "Error" });
      next(err);
    }
  },
  setGenero: async (req, res, next) => {
    try {
      const genero = await Genero.findByPk(req.body.genero);
      const pav = await PAV.findByPk(req.body.pelicula);
      const reg = await pav.setGenero(genero);
      res.status(200).send(reg);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
      next(err);
    }
  },
  addPersonaje: async (req, res, next) => {
    try {
      const char = await Personaje.findByPk(req.body.character);
      const movie = await PAV.findByPk(req.body.movie);
      const added = await movie.addPersonajes([char]);
      res.status(200).send(added);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
      next(err);
    }
  },
};

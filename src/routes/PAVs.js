import { Router } from "express";
import PAVController from "./../controllers/PAV";
import auth from "../middlewares/auth";

const router = Router();
const { list, query, add, update, remove, getGenero, addPersonaje, setGenero } = PAVController;
const { verifyUser } = auth;

router.get("/movies", verifyUser, list);

router.get("/movies/:id", verifyUser, query);

router.post("/movies", verifyUser, add);

router.put("/movies/:id", verifyUser, update);

router.delete("/movies/:id", verifyUser, remove);

router.get("/get-genero/:id", verifyUser, getGenero);

router.put("/add-personaje", verifyUser, addPersonaje);

router.put("/set-genero", verifyUser, setGenero);

module.exports = router;
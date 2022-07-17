import { Router } from "express";
import personajeController from "./../controllers/personaje";

const router = Router();
const { list, add, update, remove, charDetails, charQuery } = personajeController;

router.get("/characters", list);

router.post("/character", add);

router.put("/character/:id", update);

router.delete("/character/:id", remove);

router.get("/character/:id", charDetails);

router.get("/character", charQuery);

module.exports = router;

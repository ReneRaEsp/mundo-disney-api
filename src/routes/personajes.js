import { Router } from "express";
import personajeController from "./../controllers/personaje";
import tokenServices from "./../middlewares/auth.js";

const router = Router();
const { list, add, update, remove, charDetails, charQuery } = personajeController;
const { verifyUser } = tokenServices;

router.get("/characters", verifyUser, list);

router.post("/character", verifyUser, add);

router.put("/character/:id", verifyUser, update);

router.delete("/character/:id", verifyUser, remove);

router.get("/character/:id", verifyUser, charDetails);

router.get("/character", verifyUser,  charQuery);

module.exports = router;

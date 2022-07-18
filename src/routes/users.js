import { Router } from "express";
import usersController from "./../controllers/user";

const router = Router();
const { register, query, list, update, login } = usersController;

router.post("/auth/login", login);

router.post("/auth/register", register);

router.get("/users", list);

router.get("/user/:id", query);

router.put("/user/:id", update);

module.exports = router;

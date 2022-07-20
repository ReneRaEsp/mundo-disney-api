import { Router } from "express";
import usersController from "./../controllers/user";
import auth from "./../middlewares/auth";

const router = Router();
const { register, query, list, update, login, remove } = usersController;
const { verifyUser } = auth;

router.post("/auth/login", login);

router.post("/auth/register", register);

router.get("/users", verifyUser, list);

router.get("/user/:id", verifyUser, query);

router.put("/user/:id", verifyUser, update);

router.delete("/user/:id", verifyUser, remove);

module.exports = router;

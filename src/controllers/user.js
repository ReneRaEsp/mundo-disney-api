import User from "./../models/User";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
  query: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["username", "email", "status", "role"],
      });
      if (!user) {
        res.status(404).send({
          message: "User not found",
        });
      } else {
        res.status(200).send(user);
      }
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
  register: async (req, res, next) => {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password,
      });
      res.status(200).send("User created");
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
};

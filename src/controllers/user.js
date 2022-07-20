import User from "./../models/User";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
  query: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "username", "email", "status", "role"],
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
    }
  },
  list: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "role", "status"],
      });
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const user = User.update(
        {
          username: req.body.username,
          email: req.body.email,
          role: req.body.role,
          status: req.body.status,
        },
        { where: { id: req.params.id } }
      );
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  remove: async (req, res, next) => {
    try {
      const user = await User.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const tokenReturn = await token.encode(
            user.id,
            user.username,
            user.email,
            user.role
          );
          res.status(200).json({
            user: {
              username: user.username,
              email: user.email,
              role: user.role,
            },
            tokenReturn,
          });
        } else {
          res.status(404).send({
            message: "Wrong Password",
          });
        }
      } else {
        res.status(404).send({
          message: "User does not exist",
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Internal server error while login",
      });
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
    }
  },
};

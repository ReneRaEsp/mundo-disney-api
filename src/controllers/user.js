//Node modules
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
//Models
import User from "./../models/User";
//services
import token from "../services/token";

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_EMAIL_REGISTERED = process.env.SENDGRID_EMAIL_REGISTERED;
const SENDGRID_SUBJECT = process.env.SENDGRID_SUBJECT;
const SENDGRID_TEXT = process.env.SENDGRID_TEXT;
const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL;

const setMsg = (to) => {
  const msg = {
    to,
    from: SENDGRID_EMAIL_REGISTERED,
    subject: SENDGRID_SUBJECT,
    text: SENDGRID_TEXT,
    html: SENDGRID_EMAIL,
  };
  return msg;
};

const sendEmail = (msg) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.log(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

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
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password,
      });
      sendEmail(setMsg(user.email));
      res.status(200).send("Verify your email to confirm");
    } catch (e) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
};

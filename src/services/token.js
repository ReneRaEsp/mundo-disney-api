import jwt from "jsonwebtoken";
import User from "./../models/User";
import dotenv from "dotenv";

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const checkToken = async (token) => {
  let _id = null;
  try {
    const { id } = await jwt.decode(token);
    _id = id;
  } catch (e) {
    return false;
  }

  const user = await User.findByPk(_id);
  if (user) {
    const token = jwt.sign({ id: _id }, JWT_KEY, { expiresIn: "1d" });
    return { token, rol: user.role };
  } else {
    return false;
  }
};

export default {
  encode: async (id, username, email, role) => {
    const token = jwt.sign(
      { id: id, username: username, email: email, role: role },
      JWT_KEY,
      { expiresIn: "1d" }
    );
    return token;
  },
  decode: async (token) => {
    try {
      const { id } = await jwt.verify(token, JWT_KEY);
      const user = await User.findByPk(id);
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  },
};

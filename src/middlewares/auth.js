import tokenService from "./../services/token";

export default {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "no token",
      });
    } else {
      const response = await tokenService.decode(req.headers.token);
      if (response.role === "admin" || response.role === "user") {
        next();
      } else {
        return res.status(403).send({
          message: "Not authorized",
        });
      }
    }
  },
  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "no token",
      });
    } else {
      const response = await tokenService.decode(req.headers.token);
      if (response.role === "admin") {
        next();
      } else {
        return res.status(403).send({
          message: "Not authorized",
        });
      }
    }
  },
};

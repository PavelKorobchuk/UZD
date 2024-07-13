const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { jwtVerify } = require("../helper/jwt");
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
const {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError
} = require("../helper/customErrors");

const { TokenExpiredError } = jwt;

const catchError = (err, res, next) => {
  if (err instanceof TokenExpiredError) {
    // return res.status(401).send({ message: "Unauthorized! Access Token expired!" });
    next(new UnauthorizedError("Unauthorized! Access Token expired!"))
  }
  // return res.sendStatus(401).send({ message: "Unauthorized!" });
  next(new UnauthorizedError("Unauthorized!"))
}

const verifyToken = async (req, res, next) => {
  try {
    const { headers } = req;

    if (!headers.authorization) return next();

    const token = headers?.authorization?.split(" ")[1];
    if (!token) throw new ForbiddenError("No token provided!")

    const decoded = await jwtVerify(token);

    if (!decoded) throw new Error("Invalid Token"); // if error decoded equals error object

    req.loggedUser = await User.findOne({
      attributes: { exclude: ["email", "password"] },
      where: { email: decoded.email },
    });

    if (!req.loggedUser) next(new NotFoundError("User"));

    if (req.query.id && req.loggedUser.id !== req.query.id) next(new UnauthorizedError("Unauthorized!"));

    headers.email = decoded.email;
    req.loggedUser.dataValues.token = token;

    next();
  } catch (error) {
    console.log('here error', error)
    catchError(error, res, next);
  }
};

module.exports = {
  verifyToken,
  catchError
}
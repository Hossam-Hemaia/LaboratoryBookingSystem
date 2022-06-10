const jwt = require("jsonwebtoken");
const Client = require("../models/client");
const User = require("../models/user");

exports.isClient = async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
  if (!decodedToken) {
    const error = new Error("Authentication faild!");
    error.statusCode = 500;
    throw error;
  }
  const client = await Client.findById(decodedToken.clientId);
  if (!client) {
    const error = new Error("Authorization faild!");
    error.statusCode = 500;
    throw error;
  }
  req.userId = decodedToken.clientId;
  next();
};

exports.isCs = async (req, res, next) => {};

exports.isRoot = async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
  if (!decodedToken) {
    const error = new Error("Authentication faild!");
    error.statusCode = 500;
    next(error);
  }
  const root = await User.findById(decodedToken.rootId);
  if (root && root.role === "root") {
    next();
  } else {
    const error = new Error("Invalid credentials");
    error.statusCode = 500;
    throw error;
  }
};

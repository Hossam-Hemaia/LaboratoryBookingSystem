const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/client");
const User = require("../models/user");

exports.postRegister = async (req, res, next) => {
  const { clientName, phoneNumber, dateOfBirth, gender, password } = req.body;
  try {
    let client = await Client.findOne({ phoneNumber: phoneNumber });
    if (client) {
      const error = new Error("client is already registered");
      error.statusCode = 422;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    client = new Client({
      clientName,
      phoneNumber,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      clientType: "user",
      password: hashedPassword,
    });
    await client.save();
    res.status(201).json({
      success: true,
      message: "You have registered successfully, please login",
      client: client,
    });
  } catch (err) {
    next(err);
  }
};

exports.postClientLogin = async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  try {
    const client = await Client.findOne({ phoneNumber: phoneNumber });
    if (!client) {
      const error = new Error("Invalid credentials");
      error.statusCode = 422;
      throw error;
    }
    const doMatch = await bcrypt.compare(password, client.password);
    if (!doMatch) {
      const error = new Error("Incorrect password");
      error.statusCode = 422;
      throw error;
    }
    const token = jwt.sign(
      {
        phoneNumber: client.phoneNumber,
        clientId: client._id.toString(),
      },
      process.env.SECRET,
      { expiresIn: "3h" }
    );
    res.status(200).json({ success: true, token: token, client: client });
  } catch (err) {
    next(err);
  }
};

exports.postCreateRoot = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const root = new User({
      username: username,
      role: "root",
      password: hashedPassword,
    });
    await root.save();
    res
      .status(201)
      .json({ success: true, message: "Root user created successfuly" });
  } catch (err) {
    next(err);
  }
};

exports.postRootLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const root = await User.findOne({ username: username, role: "root" });
    if (!root) {
      const error = new Error("User is not found!");
      error.statusCode = 422;
      next(error);
    }
    const doMatch = await bcrypt.compare(password, root.password);
    if (!doMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 422;
      throw error;
    }
    const token = jwt.sign(
      {
        rootId: root._id.toString(),
        rootUser: root.username,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ success: true, token, rootId: root._id.toString() });
  } catch (err) {
    next(err);
  }
};

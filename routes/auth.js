const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/client/register", authController.postRegister);

router.post("/client/login", authController.postClientLogin);

router.post("/create/root", authController.postCreateRoot);

router.post("/root/login", authController.postRootLogin);

module.exports = router;

const express = require("express");
const rootController = require("../controllers/rootController");
const auth = require("../middleware/is-Auth");

const router = express.Router();

router.post("/create/role", auth.isRoot, rootController.postCreateRole);

router.delete("/delete/role", auth.isRoot, rootController.deleteRole);

router.post("/create/user", auth.isRoot, rootController.createUser);

router.get("/all/users", auth.isRoot, rootController.getAllUsers);

router.put("/update/user", auth.isRoot, rootController.updateUser);

router.delete("/delete/user", auth.isRoot, rootController.deleteUser);

router.post("/add/test", auth.isRoot, rootController.postAddTest);

router.put("/update/test", auth.isRoot, rootController.updateTest);

router.delete("/delete/test", auth.isRoot, rootController.deleteTest);

module.exports = router;

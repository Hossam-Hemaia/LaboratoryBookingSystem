const express = require("express");
const branchController = require("../controllers/branchController");
const auth = require("../middleware/is-Auth");

const router = express.Router();

router.post("/create/branch", auth.isRoot, branchController.postCreateBranch);

router.get("/all/branches", branchController.getAllBranches);

router.get("/get/branch", branchController.getBranch);

router.put("/update/branch", auth.isRoot, branchController.putUpdateBranch);

router.delete("/delete/branch", auth.isRoot, branchController.deleteBranch);

module.exports = router;

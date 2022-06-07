const Branch = require("../models/branch");

exports.postCreateBranch = async (req, res, next) => {
  const { branchName, address, openAt, closeAt, days } = req.body;
  try {
    let branch = await Branch.findOne({ branchName: branchName });
    if (branch) {
      const error = new Error("Branch already exist!");
      error.statusCode = 422;
      throw error;
    }
    const openTimes = {
      openAt,
      closeAt,
    };
    if (days.length > 0) {
      branch = new Branch({
        branchName,
        address,
        openTime: openTimes,
        openDays: "selected days",
        selectedDays: days,
      });
      await branch.save();
      return res
        .status(201)
        .json({ success: true, message: "New branch created successfuly" });
    }
    branch = new Branch({
      branchName,
      address,
      openTime: openTimes,
    });
    await branch.save();
    return res
      .status(201)
      .json({ success: true, message: "New branch created successfuly" });
  } catch (err) {
    next(err);
  }
};

exports.getAllBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find();
    if (!branches) {
      const error = new Error("No branches found please create some!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, branches: branches });
  } catch (err) {
    next(err);
  }
};

exports.getBranch = async (req, res, next) => {
  const branchId = req.query.branchId;
  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      const error = new Error("branch does not exist!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, branch: branch });
  } catch (err) {
    next(err);
  }
};

exports.putUpdateBranch = async (req, res, next) => {
  const { branchId, branchName, address, openAt, closeAt, days } = req.body;
  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      const error = new Error("branch does not exist!");
      error.statusCode = 404;
      throw error;
    }
    const openTimes = {
      openAt,
      closeAt,
    };
    if (days.length > 0) {
      branch.branchName = branchName;
      branch.address = address;
      branch.openTime = openTimes;
      branch.openDays = "selected days";
      branch.selectedDays = days;
      await branch.save();
      return res
        .status(201)
        .json({ success: true, message: "Branch updated successfully" });
    }
    branch.branchName = branchName;
    branch.address = address;
    branch.openTime = openTimes;
    branch.openDays = "All days";
    branch.selectedDays = [];
    await branch.save();
    res
      .status(201)
      .json({ success: true, message: "Branch updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteBranch = async (req, res, next) => {
  const branchId = req.query.branchId;
  try {
    const result = await Branch.findByIdAndDelete(branchId);
    if (!result) {
      const error = new Error("Deletion faild!");
      error.statusCode = 422;
      throw error;
    }
    res
      .status(201)
      .json({ success: true, message: "Branch deleted successfully" });
  } catch (err) {
    next(err);
  }
};

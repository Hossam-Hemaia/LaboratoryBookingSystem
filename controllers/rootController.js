const Role = require("../models/role");
const User = require("../models/user");
const Lab = require("../models/laboratory");
const Radiology = require("../models/radiology");
const Endo = require("../models/endoscopy");
const Dental = require("../models/dental");

exports.postCreateRole = async (req, res, next) => {
  const roleName = req.body.roleName;
  try {
    let role = await Role.findOne({ roleName: roleName });
    if (role) {
      const error = new Error(
        "The role you are trying to create already exist"
      );
      error.statusCode = 422;
      throw error;
    }
    role = new Role({
      roleName,
    });
    await role.save();
    res
      .status(201)
      .json({ success: true, message: "New role created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteRole = async (req, res, next) => {
  const roleId = req.query.roleId;
  try {
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      const error = new Error("This role does not exist");
      error.statusCode = 500;
      throw error;
    }
    res
      .status(201)
      .json({ success: true, message: "Role deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { employeeName, username, role, branchId } = req.body;
  try {
    let user = await User.findOne({ username: username });
    if (user) {
      const error = new Error("This user already exist");
      error.statusCode = 422;
      throw error;
    }
    user = new User({
      employeeName,
      username,
      role,
      branchId,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "new user created successfully",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      const error = new Error("No users found!");
      error.statusCode = 404;
      throw error;
    }
    for (let user of users) {
      await user.populate("branchId");
    }
    res.status(200).json({ success: true, users: users });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { employeeName, username, role, status, branchId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User does not exist!");
      error.statusCode = 404;
      throw error;
    }
    user.employeeName = employeeName;
    user.username = username;
    user.role = role;
    user.branchId = branchId;
    user.status = status;
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User is updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new Error("User does not exist!");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(201)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.postAddTest = async (req, res, next) => {
  const {
    testType,
    title,
    price,
    timeFrom,
    timeTo,
    testDays,
    selectedDays,
    testPeriod,
    testPreparation,
  } = req.body;
  try {
    if (testType === "laboratory") {
      let test = await Lab.findOne({ title: title });
      if (test) {
        const error = new Error("this test already exist");
        error.statusCode = 422;
        throw error;
      }
      availableTime = { from: timeFrom, to: timeTo };
      test = new Lab({
        title,
        price,
        availableTime,
        testDays,
        selectedDays: selectedDays || [],
        testPeriod,
        testPreparation,
      });
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Lab test created successfuly" });
    } else if (testType === "radiology") {
      let test = await Radiology.findOne({ title: title });
      if (test) {
        const error = new Error("this test already exist");
        error.statusCode = 422;
        throw error;
      }
      availableTime = { from: timeFrom, to: timeTo };
      test = new Radiology({
        title,
        price,
        availableTime,
        testDays,
        selectedDays: selectedDays || [],
        testPeriod,
        testPreparation,
      });
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Radiology test created successfuly" });
    } else if (testType === "endoscopy") {
      let test = await Endo.findOne({ title: title });
      if (test) {
        const error = new Error("this test already exist");
        error.statusCode = 422;
        throw error;
      }
      availableTime = { from: timeFrom, to: timeTo };
      test = new Endo({
        title,
        price,
        availableTime,
        testDays,
        selectedDays: selectedDays || [],
        testPeriod,
        testPreparation,
      });
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Endoscopy test created successfuly" });
    } else if (testType === "dental") {
      let test = await Dental.findOne({ title: title });
      if (test) {
        const error = new Error("this test already exist");
        error.statusCode = 422;
        throw error;
      }
      availableTime = { from: timeFrom, to: timeTo };
      test = new Dental({
        title,
        price,
        availableTime,
        testDays,
        selectedDays: selectedDays || [],
        testPeriod,
        testPreparation,
      });
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Dental test created successfuly" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateTest = async (req, res, next) => {
  const {
    testType,
    testId,
    title,
    price,
    timeFrom,
    timeTo,
    testDays,
    selectedDays,
    testPeriod,
    testPreparation,
  } = req.body;
  try {
    if (testType === "laboratory") {
      const test = await Lab.findById(testId);
      if (!test) {
        const error = new Error("Test does not exist!");
        error.statusCode = 404;
        throw error;
      }
      test.title = title;
      test.price = price;
      test.availableTime.from = timeFrom;
      test.availableTime.to = timeTo;
      test.testDays = testDays;
      test.selectedDays = selectedDays;
      test.testPeriod = testPeriod;
      test.testPreparation = testPreparation;
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Test updated successfully" });
    } else if (testType === "radiology") {
      const test = await Radiology.findById(testId);
      if (!test) {
        const error = new Error("Test does not exist!");
        error.statusCode = 404;
        throw error;
      }
      test.title = title;
      test.price = price;
      test.availableTime.from = timeFrom;
      test.availableTime.to = timeTo;
      test.testDays = testDays;
      test.selectedDays = selectedDays;
      test.testPeriod = testPeriod;
      test.testPreparation = testPreparation;
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Radiology updated successfully" });
    } else if (testType === "endoscopy") {
      const test = await Endo.findById(testId);
      if (!test) {
        const error = new Error("Test does not exist!");
        error.statusCode = 404;
        throw error;
      }
      test.title = title;
      test.price = price;
      test.availableTime.from = timeFrom;
      test.availableTime.to = timeTo;
      test.testDays = testDays;
      test.selectedDays = selectedDays;
      test.testPeriod = testPeriod;
      test.testPreparation = testPreparation;
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Endoscopy updated successfully" });
    } else if (testType === "dental") {
      const test = await Dental.findById(testId);
      if (!test) {
        const error = new Error("Test does not exist!");
        error.statusCode = 404;
        throw error;
      }
      test.title = title;
      test.price = price;
      test.availableTime.from = timeFrom;
      test.availableTime.to = timeTo;
      test.testDays = testDays;
      test.selectedDays = selectedDays;
      test.testPeriod = testPeriod;
      test.testPreparation = testPreparation;
      await test.save();
      return res
        .status(201)
        .json({ success: true, message: "Dental test updated successfully" });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTest = async (req, res, next) => {
  const { testType, testId } = req.query;
  try {
    if (testType === "laboratory") {
      const test = await Lab.findByIdAndDelete(testId);
      if (!test) {
        const error = new Error("test does not exist");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(201)
        .json({ success: true, message: "Test has been deleted successfully" });
    } else if (testType === "radiology") {
      const test = await Radiology.findByIdAndDelete(testId);
      if (!test) {
        const error = new Error("test does not exist");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(201)
        .json({ success: true, message: "Test has been deleted successfully" });
    } else if (testType === "endoscopy") {
      const test = await Endo.findByIdAndDelete(testId);
      if (!test) {
        const error = new Error("test does not exist");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(201)
        .json({ success: true, message: "Test has been deleted successfully" });
    } else if (testType === "dental") {
      const test = await Dental.findByIdAndDelete(testId);
      if (!test) {
        const error = new Error("test does not exist");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(201)
        .json({ success: true, message: "Test has been deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

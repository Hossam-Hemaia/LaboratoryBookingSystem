const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: "xxxxxx",
  },
  status: {
    type: String,
    default: "Active",
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: "branch",
  },
});

module.exports = mongoose.model("user", userSchema);

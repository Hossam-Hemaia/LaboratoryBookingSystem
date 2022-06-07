const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: "branch",
  },
});

module.exports = mongoose.model("user", userSchema);

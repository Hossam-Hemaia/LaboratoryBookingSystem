const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  branchName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  openTime: {
    openAt: { type: Number },
    closeAt: { type: Number },
  },
  openDays: {
    type: String,
    default: "All days",
  },
  selectedDays: [],
});

module.exports = mongoose.model("branch", branchSchema);

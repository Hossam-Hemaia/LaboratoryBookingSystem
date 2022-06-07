const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const radiologySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  availableTime: { from: { type: Number }, to: { type: Number } },
  scanDays: {
    type: String,
    default: "All days",
  },
  selectedDays: [],
  scanPeriod: {
    type: Number,
    required: true,
  },
  scanPreparation: [], //array of string values
});

module.exports = mongoose.model("radiology", radiologySchema);

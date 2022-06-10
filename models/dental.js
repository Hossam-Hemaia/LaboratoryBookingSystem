const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dentalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  availableTime: { from: { type: Number }, to: { type: Number } },
  testDays: {
    type: String,
    default: "All days",
  },
  selectedDays: [],
  testPeriod: {
    type: Number,
    required: true,
  },
  testPreparation: [], //array of string values
});

module.exports = mongoose.model("dental", dentalSchema);

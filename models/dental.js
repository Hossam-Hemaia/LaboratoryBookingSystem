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
  dentalDays: {
    type: String,
    default: "All days",
  },
  selectedDays: [],
  dentalPeriod: {
    type: Number,
    required: true,
  },
  dentalPreparation: [], //array of string values
});

module.exports = mongoose.model("dental", dentalSchema);

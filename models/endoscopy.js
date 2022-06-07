const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const endoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  availableTime: { from: { type: Number }, to: { type: Number } },
  endoDays: {
    type: String,
    default: "All days",
  },
  selectedDays: [],
  endoPeriod: {
    type: Number,
    required: true,
  },
  endoPreparation: [], //array of string values
});

module.exports = mongoose.model("endoscopy", endoSchema);

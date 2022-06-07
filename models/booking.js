const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = Schema({
  bookingCreateDate: {
    type: Date,
    required: true,
  },
  bookingType: {
    type: String,
    default: "paid",
  },
  bookingState: {
    type: String,
    defualt: "Pending",
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: "branch",
    required: true,
  },
  tests: [
    {
      testId: { type: Schema.Types.ObjectId, ref: "laboratory" },
      testDate: { type: Date },
      testTime: { type: String },
    },
  ],
  scans: [
    {
      scanId: {
        type: Schema.Types.ObjectId,
        ref: "radiology",
      },
      scanDate: { type: Date },
      scanTime: { type: String },
    },
  ],
  dental: [
    {
      dentalId: { type: Schema.Types.ObjectId, ref: "dental" },
      dentalDate: { type: Date },
      dentalTime: { type: String },
    },
  ],
  endoscopy: [
    {
      endoscopyId: { type: Schema.Types.ObjectId, ref: "endoscopy" },
      endoscopyDate: { type: Date },
      endoscopyTime: { type: String },
    },
  ],
  docs: [],
  promoCode: {
    type: String,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
});

module.exports = mongoose.model("booking", bookingSchema);

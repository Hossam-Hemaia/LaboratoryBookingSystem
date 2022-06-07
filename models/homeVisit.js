const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeVisitSchema = new Schema({
  visitDate: {
    type: Date,
    required: true,
  },
  bookingType: {
    type: String,
    default: "paid",
  },
  address: {
    type: String,
    required: true,
  },
  visitState: {
    type: String,
    default: "Pending",
  },
  branchId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tests: [], //array of string values
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("homeVisit", homeVisitSchema);

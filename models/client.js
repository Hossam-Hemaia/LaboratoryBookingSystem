const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  clientType: {
    type: String,
    default: "Guest",
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("client", clientSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    promoCode: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      required: true,
    },
    discountAmount: {
      type: Number,
    },
    expiryDate: {
      type: Date,
    },
  },
  { autoIndex: false }
);

couponSchema.index({ promoCode: 1 }, { unique: true });

module.exports = mongoose.model("coupon", couponSchema);

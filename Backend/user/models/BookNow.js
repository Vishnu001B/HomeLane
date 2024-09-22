const mongoose = require("mongoose");

const bookNowSchema = mongoose.Schema(
  {
    useName: { type: String },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String },
    productImage: { type: String },
    phoneNumber: { type: String },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true, // Correct option for timestamps
  }
);

module.exports = mongoose.model("BookNow", bookNowSchema);

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String },
  qrCode: { type: String },
});

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number },
  height: { type: Number },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number, required: true },

  brand: { type: String },
  sku: { type: String, required: true },

  dimensions: { type: dimensionsSchema },

  reviews: { type: [reviewSchema] },

  meta: { type: metaSchema, default: () => ({}) },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },

  VendorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorUser",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

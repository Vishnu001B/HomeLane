const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt = require('bcrypt');


// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  addressType: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

// Define the Cart Item schema
const cartItemSchema = new mongoose.Schema({
  VendorUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorUser",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  attributes: {
    size: { type: String },
    color: { type: String },
  },
});

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },

  mobileNumber: {
    type: String,
 
    unique: true,
  },
  name: {
    type: String,
  },
 
  location: {
    type: String,
  },
  addresses: [addressSchema],
  cart: [cartItemSchema], // Array of addresses
  wallet: {
    type: Number,
    default: 0,
  },
  security: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save" , async function(next)
{
  if(!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.generateOtp = function()
{
  this.otp = crypto.randomBytes(3).toString("hex");
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
}

userSchema.pre("validate", function(next)
{
  if(!this.otp ||!this.otpExpires)
  {
    this.generateOtp();
  }
  next();
})

userSchema.methods.comparePassword = async function(password)
{
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function()
{
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;

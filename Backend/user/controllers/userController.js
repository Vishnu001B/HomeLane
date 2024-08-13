require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const crypto = require("crypto");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Registration function
exports.register = async (req, res) => {
  const { name, lastName, phone, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    user = new User({ name, lastName, phone, email, password });
    user.generateOtp();
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP is ${user.otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.toString());
      res.status(200).send("OTP sent to your email");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// OTP verification function
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (user.otp !== otp) return res.status(400).send("Invalid OTP");
    if (user.otpExpires < Date.now())
      return res.status(400).send("OTP expired");

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send("Email verified successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Resend OTP function
exports.resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    user.generateOtp();
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP is ${user.otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.toString());
      res.status(200).send("OTP sent to your email");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Compare the provided password with the stored hashed password
    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(401).json({ success: false, message: "Invalid password" });

    // Generate an authentication token
    const token = user.generateAuthToken();

    // Save user's last login date
    user.lastLogin = new Date();
    await user.save();

    // Exclude the password field in the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Send the token and user data in the response
    res.json({ success: true, token, data: userWithoutPassword });

  } catch (err) {
    // Log the detailed error for debugging
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: `An error occurred during login: ${err.message}` });
  }
};



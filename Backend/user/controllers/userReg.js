// controllers/authController.js
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // This will allow self-signed certificates
  },
});

exports.register = async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;

    // Check if all mandatory fields are present
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but is not verified, regenerate OTP and resend it
      if (!user.isVerified) {
        user.generateOtp(); // Assuming this method regenerates and sets a new OTP
        await user.save();

        // Send verification email with OTP
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Verify your email",
          text: `Your OTP is ${user.otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) return res.status(500).send(error.toString());
          return res.status(200).send("OTP resent to your email");
        });
      } else {
        // If the user is already verified
        return res.status(400).send("User already exists and is verified");
      }
    } else {
      // Create a new user if one doesn't exist
      user = new User({ email, password, name, mobile });

      // Generate OTP for new user
      user.generateOtp();

      // Save the new user to the database
      await user.save();

      // Send verification email with OTP
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify your email",
        text: `Your OTP is ${user.otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        res.status(200).send("OTP sent to your email for verification");
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");
  if (user.otp !== otp) return res.status(400).send("Invalid OTP");
  if (user.otpExpires < Date.now()) return res.status(400).send("OTP expired");

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();
  res.status(200).send("Email verified successfully");
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;
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
    res.status(200).send("OTP resent to your email");
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (!user.isVerified) return res.status(400).send("Email not verified");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid password");

    const token = user.generateAuthToken();
    res.send({ token, user });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

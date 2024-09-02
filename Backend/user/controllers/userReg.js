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
    rejectUnauthorized: false,
  },
});

exports.register = async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        user.generateOtp();
        await user.save();

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Verify your email",
          text: `Your OTP is ${user.otp}`,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) return res.status(500).send(error.toString());
          return res.status(200).send("OTP resent to your email");
        });
      } else {
        return res.status(400).send("User already exists and is verified");
      }
    } else {
      user = new User({ email, password, name, mobile });
      user.generateOtp();
      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify your email",
        text: `Your OTP is ${user.otp}`,
      };

      transporter.sendMail(mailOptions, (error) => {
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

  transporter.sendMail(mailOptions, (error) => {
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

exports.addItemToCart = async (req, res) => {
  const {
    VendorUser,
    userId,
    productId,
    productName,
    quantity,
    price,
    attributes,
    promotionCode,
    discountPercentage,
    Image,
  } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].price += price;
    } else {
      user.cart.push({
        VendorUser,
        productId,
        productName,
        quantity,
        price,
        attributes,
        promotionCode,
        discountPercentage,
        Image,
      });
    }

    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    user = await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { cart: { productId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

exports.addProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      user.cart[productIndex].quantity += 1;
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating product quantity", error });
  }
};

exports.subProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      user.cart[productIndex].quantity -= 1;

      if (user.cart[productIndex].quantity === 0) {
        user.cart.splice(productIndex, 1);
      }
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating product quantity", error });
  }
};

exports.getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, cartItems, promotionCode, totalPrice } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { cart: cartItems, promotionCode, totalPrice },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

exports.getTotalQuantity = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalQuantity = user.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    res.status(200).json({ totalQuantity });
  } catch (error) {
    res.status(500).json({ message: "Error getting total quantity", error });
  }
};

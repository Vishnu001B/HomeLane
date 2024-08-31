const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");

const productRoutes = require("./admin/routes/productRoutes");

// const categoryRoutes = require("./user/routes/categoryRoutes");

const admin = require("./admin/routes/adminRoutes");

const banner = require("./admin/routes/bannerRouters");
const path = require("path");

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Home route for admin routes
app.get("/", (req, res) => {
  res.send("API is running successfully");
});
// Routes

app.use("/api/user", userRoutes);

// Use the product routes

//admin

app.use("/api/admin", admin);

app.use("/api/admin", banner);
app.use("/api/admin", productRoutes);

//deliver boys Users

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

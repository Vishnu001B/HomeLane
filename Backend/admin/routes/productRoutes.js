const express = require("express");
const router = express.Router();

const product = require("../controller/productController");

// Define routes with appropriate middlewares
router.post("/createProduct", product.createProduct);
// Route to get a product by ID
router.get("/products/:id", product.getProductById);
router.get("/products", product.getAllProducts);

// Route to update a product by ID

router.put("/products/:id", product.updateProduct);

// Route to delete a product by ID
router.delete("/product/:id", product.deleteProductById);

module.exports = router;

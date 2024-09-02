const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/BookNowController");

router.post("/book-now", createBooking);

module.exports = router;

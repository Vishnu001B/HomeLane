const BookNow = require("../models/BookNow");

exports.createBooking = async (req, res, next) => {
    try {
        const { userId, useName, productId, productName, phoneNumber } = req.body;
        const bookNow = new BookNow({ userId, useName, productId, productName, phoneNumber });
        await bookNow.save();
        res.status(201).json({ message: "Book Now Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const BookNow = require("../models/BookNow");

exports.createBooking = async (req, res, next) => {
    try {
        const { useName, productId, productName, phoneNumber,productImage } = req.body;
        const bookNow = new BookNow({ useName, productId, productName, phoneNumber,productImage });
        await bookNow.save();
        res.status(201).json({ message: "Book Now Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


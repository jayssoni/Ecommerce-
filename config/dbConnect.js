const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database error");
        throw new Error(error);
    }
};

module.exports = dbConnect;

